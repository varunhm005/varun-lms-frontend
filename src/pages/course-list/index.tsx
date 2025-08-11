import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Popconfirm, Table } from 'antd';
import {
  FilterValue,
  SortOrder,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { configs } from '../../configs/configs';
import { env } from '../../configs/env';
import { getDefaultcourseFilter } from '../../configs/filters';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { urlQueryKeys } from '../../constants/url-query-keys';
import { useModalContext } from '../../context/conform-context';
import {
  Course,
  CourseCategory,
  CourseMedian,
  CourseType,
  User,
  useGetCoursesListQuery,
  useRemoveCourseMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserRoleName } from '../../hooks/auth-hook';
import { useParsedUrlQuery, useUrlQueryParam } from '../../hooks/useUrlQueries';
import { formatCourseMedian, getFilterDirection, showSuccessMessage } from '../../utils/utils';

export default function CourseList() {
  const roleName = useGetUserRoleName();

  const { page, size, query, type, median, sortDirection, sort } = useParsedUrlQuery<{
    page: string;
    size: string;
    sort: string;
    median: CourseMedian[];
    sortDirection: SortOrder;
    type: CourseType[];
    query: string;
  }>();

  const { data, loading } = useGetCoursesListQuery({
    variables: {
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
        orderBy: getFilterDirection(sortDirection || 'descend'),
        orderField: sort || 'createdAt',
      },
      filter: {
        ...getDefaultcourseFilter(roleName),
        searchQuery: query,
        type,
        median,
      },
    },
  });

  const navigate = useNavigate();

  const { setQueryParams: updateQueryParams } = useUrlQueryParam();

  const modal = useModalContext();

  const [removeCourse] = useRemoveCourseMutation({
    refetchQueries: [queryKeys.GetCoursesList, queryKeys.GeCoursesNamesOnly],
    onCompleted: () => {
      showSuccessMessage('Course deleted successfully');
    },
    onError: modal.showErrorMessage,
  });

  const onSearch = (value: string) => {
    updateQueryParams({
      [urlQueryKeys.query]: value,
    });
  };

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    _sorter: SorterResult<User>
  ) => {
    const { current, pageSize } = _pagination;

    updateQueryParams({
      [urlQueryKeys.page]: current,
      [urlQueryKeys.size]: pageSize,
      [urlQueryKeys.sort]: _sorter.field || null,
      [urlQueryKeys.sortDirection]: _sorter.order ?? null,
      [urlQueryKeys.type]: _filters.type || null,
      [urlQueryKeys.median]: _filters.median || null,
    });
  };

  const deleteItem = async (id: string) => {
    await removeCourse({
      variables: {
        removeCourseId: +id,
      },
    });
  };
  return (
    <main className="p-6 text-left">
      <Card
        loading={loading}
        extra={[
          <Button
            onClick={() => {
              navigate(`/${route.createCourse}`);
            }}
            icon={<PlusOutlined />}
            shape="round"
            type="primary"
            className="btn btn-primary"
            key={1}
          >
            Add Course
          </Button>,
        ]}
        title="Courses"
      >
        <div className="p-2 pb-0">
          <Form.Item>
            <Input.Search defaultValue={query} placeholder="Search" onSearch={onSearch} />
          </Form.Item>
        </div>
        <Table
          className="_table"
          size="small"
          columns={[
            {
              title: 'Code',
              dataIndex: 'code',
              key: 'code',
              sorter: true,
              sortDirections: ['ascend', 'descend'],
              sortOrder: sort === 'code' ? sortDirection : null,
            } as any,
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter: true,
              sortDirections: ['ascend', 'descend'],
              sortOrder: sort === 'name' ? sortDirection : null,
            },
            {
              title: 'Category',
              dataIndex: 'courseCategory',
              render: (value: CourseCategory) => {
                return <span>{value.name}</span>;
              },
            },
            {
              title: 'Mode',
              dataIndex: 'median',
              render: (value: CourseMedian) => {
                return formatCourseMedian(value);
              },
              filters: [
                {
                  text: 'Learning',
                  value: CourseMedian.Online,
                },
                {
                  text: 'Class Room',
                  value: CourseMedian.Offline,
                },
                {
                  text: 'Recorded',
                  value: CourseMedian.Recorded,
                },
              ],
              filteredValue: median,
            },
            {
              title: 'Type',
              dataIndex: 'type',
              filters: [
                {
                  text: 'Emergency',
                  value: CourseType.Emergency,
                },
                {
                  text: 'Initial',
                  value: CourseType.Initial,
                },
                {
                  text: 'Recurrent',
                  value: CourseType.Recurrent,
                },
              ],
              filteredValue: type,
            },
            {
              title: 'Type Of Exam',
              dataIndex: 'mediumOfExam',
              render: (value: string, record: Course) => {
                return <span>{record.examRequired ? value : 'No Exam Req'}</span>;
              },
            },
            {
              title: 'Created At',
              dataIndex: 'createdAt',
              render: (value: string) => {
                return <span>{new Date(value).toLocaleDateString()}</span>;
              },
            },
            // {
            //   title: 'Status',
            //   dataIndex: 'courseStatus',
            //   render: (value: string) => {
            //     return <span>{value}</span>;
            //   },
            // },
            {
              title: 'Actions',
              render: (rec: Course) => {
                return (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        navigate(`/${route.courseLevels(rec.id)}`);
                      }}
                      type="primary"
                      className="ml-2"
                      size="small"
                    >
                      View
                    </Button>
                    <Popconfirm
                      title="Delete the course"
                      description="Are you sure to delete this course?"
                      onConfirm={() => {
                        return deleteItem(rec.id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="small" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                );
              },
            },
          ]}
          rowKey="id"
          dataSource={(data?.courses.data as Array<any>) ?? []}
          loading={loading}
          onChange={(pagination, filter, sorter) => {
            handleTableChange(pagination, filter, sorter as SorterResult<any>);
          }}
          pagination={{
            pageSize: data?.courses?.paging?.size,
            total: data?.courses?.paging?.totalItems,
            current: data?.courses?.paging?.currentPage,
            hideOnSinglePage: !env.isDev,
            showSizeChanger: true,
          }}
          showSorterTooltip
        />
      </Card>
    </main>
  );
}
