import { Button, Table, TablePaginationConfig, Tag } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { configs } from '../../configs/configs';
import { env } from '../../configs/env';
import { route } from '../../constants/routes';
import { urlQueryKeys } from '../../constants/url-query-keys';
import {
  AttendExamStatus,
  AttendedExam,
  useGetAttendedExamsQuery,
} from '../../graphql/@generated/graphql';
import useUrlQueries, { useUrlQueryParam } from '../../hooks/useUrlQueries';
import { formatDate, formatTime } from '../../utils/utils';

function AttendedExams() {
  const query = useUrlQueries<{
    examId: string;
  }>();

  const { queryParams, setQueryParams } = useUrlQueryParam<{
    page: string;
    size: string;
  }>();

  const { loading, data } = useGetAttendedExamsQuery({
    variables: {
      filter: {
        examsId: query.examId ? +query.examId : undefined,
      },
      pagingInput: {
        page: queryParams.page ? +queryParams.page : configs.defaultPage,
        size: queryParams.size ? +queryParams.size : configs.defaultPageSize,
      },
    },
  });

  const navigate = useNavigate();

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _filters: Record<string, FilterValue | null>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _sorter: SorterResult<AttendedExam>
  ) => {
    const { current, pageSize } = _pagination;

    setQueryParams({
      [urlQueryKeys.page]: current,
      [urlQueryKeys.size]: pageSize,
    });
  };

  return (
    <main className="container mx-auto px-6 py-8">
      <Table
        loading={loading}
        bordered
        size="small"
        dataSource={(data?.attendedExams.data || []) as AttendedExam[]}
        rowKey={(record) => record.id}
        onChange={
          handleTableChange as (
            pagination: TablePaginationConfig,
            filters: Record<string, FilterValue | null>,
            sorter: SorterResult<AttendedExam> | SorterResult<AttendedExam>[]
          ) => void
        }
        pagination={{
          pageSize: data?.attendedExams.paging?.size,
          total: data?.attendedExams?.paging?.totalItems,
          current: data?.attendedExams?.paging?.currentPage,
          hideOnSinglePage: !env.isDev,
          showSizeChanger: true,
        }}
        columns={[
          {
            title: 'S.No',
            dataIndex: 'key',
            render: (_, __, i) => <div>{i + 1}</div>,
          },
          {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (_, record) =>
              `${formatDate(record.createdAt)} ${formatTime(record.createdAt)}`,
          },
          {
            title: 'Name',
            dataIndex: 'user',
            render: (_, record) => record.user.name,
          },
          {
            title: 'Exam Status',
            dataIndex: 'status',
            render: (_, record) => {
              if (record.status === AttendExamStatus.Passed) {
                return <Tag color="green">Passed</Tag>;
              }
              if (record.status === AttendExamStatus.Failed) {
                return <Tag color="red">Failed</Tag>;
              }

              return <Tag color="blue">{record.status}</Tag>;
            },
          },
          {
            title: 'Mark',
            dataIndex: 'mark',
            render: (_, record) => record.totalMark,
          },
          {
            title: 'Achieved Mark',
            dataIndex: 'achivedMark',
            render: (_, record) => record.achivedMark,
          },
          {
            title: 'Actions',
            dataIndex: 'achivedMark',
            render: (_, record) => (
              <div className="flex">
                <Button
                  onClick={() => {
                    navigate(`/${route.viewAttendedExam(record.slug)}`);
                  }}
                  size="small"
                >
                  View
                </Button>
              </div>
            ),
          },
        ]}
      />
    </main>
  );
}

export default AttendedExams;
