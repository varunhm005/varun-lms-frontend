import { Button, Card, Input, Table } from 'antd';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { configs } from '../../configs/configs';
import { env } from '../../configs/env';
import { RoleNames } from '../../configs/filters';
import { route } from '../../constants/routes';
import { urlQueryKeys } from '../../constants/url-query-keys';
import { Certificate, useGetCertificatesQuery } from '../../graphql/@generated/graphql';
import { useGetProfile, useGetUserRoleName } from '../../hooks/auth-hook';
import { useParsedUrlQuery, useUrlQueryParam } from '../../hooks/useUrlQueries';

export default function Certificates() {
  const role = useGetUserRoleName();

  const profile = useGetProfile();

  const { page, size, query } = useParsedUrlQuery<{
    page: string;
    size: string;
    query: string;
  }>();

  const filterRoles: RoleNames[] = ['Line Manager', 'Students'];

  const { data, loading } = useGetCertificatesQuery({
    variables: {
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
      },
      certificateFilter: {
        instructorId: role === 'Faculty' ? Number(profile?.id) : undefined,
        userId: filterRoles.includes(role) ? Number(profile?.id) : undefined,
        search: query ?? undefined,
      },
    },
  });

  const { setQueryParams: updateQueryParams } = useUrlQueryParam();

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

  const onSearch = (value: string) => {
    updateQueryParams({
      [urlQueryKeys.query]: value,
    });
  };

  const navigate = useNavigate();

  return (
    <main className="p-6 text-left">
      <Card
        loading={loading}
        // extra={
        //   role !== 'Students' && [
        //     <Button
        //       key="1"
        //       onClick={() => {
        //         navigate(`/${route.createCertificate}`);
        //       }}
        //       icon={<PlusOutlined />}
        //       shape="round"
        //       type="primary"
        //       className="btn btn-primary"
        //     >
        //       Add Certificate
        //     </Button>,
        //   ]
        // }
        title="Certificates"
      >
        <Input.Search
          className="mb-5"
          placeholder="Search With Name / Employee No / Certificate No"
          onSearch={onSearch}
          defaultValue={query}
        />

        <Table
          size="small"
          className="_table"
          columns={[
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
                    {/* {role !== 'Students' && (
                      <Button
                        onClick={() => {
                          navigate(`/${route.editCertificate(rec.id!)}`);
                        }}
                        className="ml-2"
                        size="small"
                      >
                        Edit
                      </Button>
                    )} */}
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
      </Card>
    </main>
  );
}
