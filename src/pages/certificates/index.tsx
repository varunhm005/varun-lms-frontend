import { Button, Card, Input, Table, Breadcrumb } from 'antd';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { configs } from '../../configs/configs';
import { env } from '../../configs/env';
import { RoleNames } from '../../configs/filters';
import { route } from '../../constants/routes';
import { urlQueryKeys } from '../../constants/url-query-keys';
import { Certificate, useGetCertificatesQuery, useGetCertificateYearsByCourseQuery, useDownloadCertificatesLazyQuery } from '../../graphql/@generated/graphql';
import { useGetProfile, useGetUserRoleName } from '../../hooks/auth-hook';
import { useParsedUrlQuery, useUrlQueryParam } from '../../hooks/useUrlQueries';

// Using the generated GraphQL hook for GetCertificateYearsByCourse

export default function Certificates() {
  const role = useGetUserRoleName();
  const profile = useGetProfile();

  // State for managing view and breadcrumb
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showYears, setShowYears] = useState(false);
  const [selectedYear, setSelectedYear] = useState<any>(null);
  const [courseSearch, setCourseSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [certificateSearch, setCertificateSearch] = useState<string>('');
  const [debouncedCertificateSearch, setDebouncedCertificateSearch] = useState<string>('');
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const { page, size, query } = useParsedUrlQuery<{
    page: string;
    size: string;
    query: string;
  }>();

  const filterRoles: RoleNames[] = ['Line Manager', 'Students'];

  // Debounced search effect for courses
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(courseSearch);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [courseSearch]);

  // Debounced search effect for certificates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCertificateSearch(certificateSearch);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [certificateSearch]);

  // Sync certificate search with URL query parameter
  useEffect(() => {
    if (query) {
      setCertificateSearch(query);
    }
  }, [query]);

  const { data, loading } = useGetCertificatesQuery({
    variables: {
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
      },
      certificateFilter: {
        instructorId: role === 'Faculty' ? Number(profile?.id) : undefined,
        userId: filterRoles.includes(role) ? Number(profile?.id) : undefined,
        search: debouncedCertificateSearch || undefined,
        year: selectedYear ? Number(selectedYear?.year) : undefined,
        coursesId: selectedCourse?.id ?? undefined,
      },
    },
  });

  // Call the GetCertificateYearsByCourse query on page load
  // This query fetches all courses with their years immediately when the component mounts
  const { data: certificateYearsData, loading: certificateYearsLoading, error: certificateYearsError } = useGetCertificateYearsByCourseQuery({
    variables: {
      search: debouncedSearch || undefined,
    },
  });

  // Download certificates hook
  const [downloadCertificates, { loading: downloadLoading }] = useDownloadCertificatesLazyQuery();

  const { setQueryParams: updateQueryParams } = useUrlQueryParam();

  // Transform API response (year is an array) into grouped course structure
  const courseList = useMemo(() => {
    if (!certificateYearsData?.certificateYearsByCourse) return [];
    return certificateYearsData.certificateYearsByCourse.map((item: any) => ({
      id: item.coursesId,
      course: item.courseName,
      years: (item.year || []).map((y: number | string) => ({ id: `${item.coursesId}-${y}`, year: y }))
    }));
  }, [certificateYearsData]);

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    _sorter: SorterResult<Certificate>
  ) => {
    const { current, pageSize } = _pagination;

    updateQueryParams({
      [urlQueryKeys.page]: current,
      [urlQueryKeys.size]: pageSize,
      [urlQueryKeys.sort]: _sorter.field || null,
    });
  };

  const navigate = useNavigate();

  // Handle course click to show years
  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setShowYears(true);
    setSelectedYear(null);
  };

  // Handle back to courses view
  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setShowYears(false);
    setSelectedYear(null);
    setSelectedCertificates([]); // Clear selections when going back
  };

  // Handle year click (you can add navigation logic here)
  const handleYearClick = (year: any) => {
    setSelectedYear(year);
  };

  // Handle back to years view
  const handleBackToYears = () => {
    setSelectedYear(null);
    setSelectedCertificates([]); // Clear selections when going back
  };

  // Handle select all certificates
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allCertificateIds = (data?.certificates.data as Array<any>)?.map(cert => cert.id) || [];
      setSelectedCertificates(allCertificateIds);
      setIsAllSelected(true);
    } else {
      setSelectedCertificates([]);
      setIsAllSelected(false);
    }
  };

  // Handle individual certificate selection
  const handleCertificateSelect = (certificateId: string, checked: boolean) => {
    if (checked) {
      setSelectedCertificates(prev => [...prev, certificateId]);
    } else {
      setSelectedCertificates(prev => prev.filter(id => id !== certificateId));
    }
  };

  // Handle bulk download
  const handleBulkDownload = async () => {
    if (selectedCertificates.length === 0) {
      // You can add a notification here
      console.log('No certificates selected for download');
      return;
    }

    try {
      // Convert string IDs to integers for the GraphQL query
      const certificateIds = selectedCertificates.map(id => parseInt(id));
      // Check if all certificates are selected (Select All is checked)
      const isSelectAllChecked = isAllSelected;

      const result = await downloadCertificates({
        variables: {
          ids: certificateIds,
          certificateFilter: {
            instructorId: role === 'Faculty' ? Number(profile?.id) : undefined,
            userId: filterRoles.includes(role) ? Number(profile?.id) : undefined,
            search: debouncedCertificateSearch || undefined,
            year: selectedYear ? Number(selectedYear.year) : undefined,
            coursesId: selectedCourse?.id ?? undefined,
          },
          download: isSelectAllChecked ? 'ALL' : ''
        }
      });

      if (result.data?.downloadCertificates) {
        // Handle the download response
        console.log('Download response:', result.data.downloadCertificates);

        // You can add logic here to:
        // 1. Trigger file download if it's a direct file URL
        // 2. Show success message
        // 3. Handle different response formats

        // Example: If the response is a download URL
        if (result.data.downloadCertificates.startsWith('http') || result.data.downloadCertificates.startsWith('blob:')) {
          const link = document.createElement('a');
          link.href = result.data.downloadCertificates;
          link.download = `certificates-${new Date().toISOString().split('T')[0]}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error('Error downloading certificates:', error);
      // Handle error - show notification, etc.
    }
  };

  return (
    <main className="p-6 text-left">
      <Card
        loading={loading || certificateYearsLoading}
        title={
          <div>
            <Breadcrumb
              items={[
                {
                  title: (
                    <span className="cursor-pointer" onClick={handleBackToCourses}>
                      Certificates
                    </span>
                  ),
                },
                ...(showYears && selectedCourse
                  ? [
                    {
                      title: (
                        <span className="cursor-pointer" onClick={handleBackToYears}>
                          {selectedCourse.course}
                        </span>
                      ),
                    },
                  ]
                  : []),
                ...(selectedYear
                  ? [
                    {
                      title: selectedYear.year,
                    },
                  ]
                  : []),
              ]}
            />
          </div>
        }
      >




        {!showYears ? (
          // Courses view
          <div>
            <Input.Search
              className="mb-5"
              placeholder="Search courses..."
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              onSearch={setCourseSearch}
              allowClear
            />
            {certificateYearsLoading ? (
              <div className="text-center py-8">Loading courses...</div>
            ) : certificateYearsError ? (
              <div className="text-center py-8 text-red-500">
                <div className="mb-2">Error loading courses:</div>
                <div className="text-sm">{certificateYearsError.message}</div>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-2"
                  type="primary"
                >
                  Retry
                </Button>
              </div>
            ) : courseList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No courses found</div>
            ) : (
              <div className='h-[60vh] overflow-y-auto'>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {courseList.map((course: any) => (
                    <div
                      key={course.id}
                      className="bg-file-card border-file-card-border hover:bg-file-card-hover hover:shadow-file-md ease-smooth group cursor-pointer rounded-lg border p-4 transition-all duration-200"
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-foreground truncate text-sm font-medium">
                              {course.course}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !selectedYear ? (
          // Years view
          <div>
            <div className="mb-4">
              <Button onClick={handleBackToCourses} className="mb-4">
                ← Back to Courses
              </Button>
              <h2 className="mb-4 text-xl font-semibold">Years for {selectedCourse?.course}</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {selectedCourse?.years?.map((year: any) => (
                <div
                  key={year.id}
                  className="bg-file-card border-file-card-border hover:bg-file-card-hover hover:shadow-file-md ease-smooth group cursor-pointer rounded-lg border p-4 transition-all duration-200"
                  onClick={() => handleYearClick(year)}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-foreground truncate text-sm font-medium">
                          {year.year}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Year selected - show only table with back button
          <div>
            <Input.Search
              className="mb-5"
              placeholder="Search certificates by Name / Employee No / Certificate No"
              value={certificateSearch}
              onChange={(e) => setCertificateSearch(e.target.value)}
              onSearch={setCertificateSearch}
              allowClear
            />
            <div className="mb-4">
              <Button onClick={handleBackToYears} className="mb-4">
                ← Back to Years
              </Button>
              <h2 className="mb-4 text-xl font-semibold">
                Certificates for {selectedCourse?.course} - {selectedYear?.year}
              </h2>
            </div>
          </div>
        )}

        {/* Show table only when a year is selected */}
        {selectedYear && (
          <>
            {/* Bulk Download Section */}
            {selectedCertificates.length > 0 && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-700 font-medium">
                      {selectedCertificates.length} certificate(s) selected
                    </span>
                  </div>
                  <Button
                    type="primary"
                    onClick={handleBulkDownload}
                    loading={downloadLoading}
                    disabled={downloadLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {downloadLoading ? 'Downloading...' : isAllSelected ? 'Download All' : `Download Selected (${selectedCertificates.length})`}
                  </Button>
                </div>
              </div>
            )}
            <Table
              size="small"
              className="_table"
              columns={[
                {
                  title: (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCertificates.length === data?.certificates.paging?.totalItems}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="mr-2 cursor-pointer"
                      />
                    </div>
                  ),
                  dataIndex: 'select',
                  width: 40,
                  render: (_, record: any) => (
                    <input
                      type="checkbox"
                      checked={selectedCertificates.includes(record.id)}
                      onChange={(e) => handleCertificateSelect(record.id, e.target.checked)}
                      className='cursor-pointer'
                    />
                  ),
                },
                {
                  title: 'SL No',
                  render(_, __, index) {
                    return <div>{index + 1}</div>;
                  },
                },
                {
                  title: 'Name',
                  dataIndex: 'name',
                },
                {
                  title: 'Certificate No',
                  dataIndex: 'batchNumber',
                },
                {
                  title: 'Course',
                  dataIndex: 'courses',
                  render: (value: any) => {
                    return <span>{value.name}</span>;
                  },
                },
                {
                  title: 'Employee',
                  dataIndex: 'owner',
                  render: (value: any) => {
                    return <span>{value.name}</span>;
                  },
                },
                {
                  title: 'Actions',
                  render: (rec: Certificate) => {
                    return (
                      <div className="flex gap-x-2">
                        <Button
                          onClick={() => {
                            navigate(`/${route.getCertificateDetails(rec.id!)}`);
                          }}
                          type="primary"
                          size="small"
                        >
                          View
                        </Button>
                      </div>
                    );
                  },
                },
              ]}
              rowKey="id"
              dataSource={(data?.certificates.data as Array<any>) ?? []}
              onChange={(pagination, filter, sorter) => {
                handleTableChange(pagination, filter, sorter as SorterResult<any>);
              }}
              pagination={{
                pageSize: data?.certificates?.paging?.size,
                total: data?.certificates?.paging?.totalItems,
                current: data?.certificates?.paging?.currentPage,
                hideOnSinglePage: !env.isDev,
                showSizeChanger: true,
              }}
            />
          </>
        )}
      </Card>
    </main>
  );
}
