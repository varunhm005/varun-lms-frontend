import { Button, Card, Table, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { configs } from '../../configs/configs';
import { route } from '../../constants/routes';
import { urlQueryKeys } from '../../constants/url-query-keys';
import {
  CourseEvaluation as CourseEvaluationType,
  useCourseEvaluationsListQuery,
  useGeCoursesNamesOnlyQuery,
} from '../../graphql/@generated/graphql';
import { useGetProfile, useGetUserRoleName } from '../../hooks/auth-hook';
import { useParsedUrlQuery, useUrlQueryParam } from '../../hooks/useUrlQueries';

function CourseEvaluation() {
  const role = useGetUserRoleName();

  const profile = useGetProfile();

  const { page, size, courseId } = useParsedUrlQuery<{
    page: string;
    size: string;
    courseId: string[];
  }>();

  const { data: courses, loading: coursesLoading } = useGeCoursesNamesOnlyQuery({
    variables: {
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
      },
      filter: {},
    },
  });

  const { data: courseEvaluations, loading: evaluationLoading } = useCourseEvaluationsListQuery({
    variables: {
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
      },
      filter: {
        coursesId:
          courseId && courseId.length > 0
            ? courseId.map((id) => {
                return +id;
              })
            : undefined,
        studentId: role === 'Students' ? Number(profile?.id) : undefined,
      },
    },
  });

  const { setQueryParams: updateQueryParams } = useUrlQueryParam();

  const navigate = useNavigate();

  const handleTableChange = (
    _pagination: TablePaginationConfig,

    _filters: Record<string, FilterValue | null>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _sorter: SorterResult<CourseEvaluationType>
  ) => {
    const { current, pageSize } = _pagination;

    updateQueryParams({
      [urlQueryKeys.page]: current,
      [urlQueryKeys.size]: pageSize,
      [urlQueryKeys.courseId]: _filters.course,
    });
  };

  if (coursesLoading) {
    return <FullScreenLoading />;
  }

  return (
    <main className="p-6 text-left">
      <Card title="Course Evaluations">
        <Table
          loading={evaluationLoading}
          size="small"
          dataSource={
            (courseEvaluations?.courseEvaluations!.data! as Array<CourseEvaluationType>) || []
          }
          rowKey={(record) => record.id}
          pagination={{
            pageSize: courseEvaluations?.courseEvaluations?.paging?.size,
            total: courseEvaluations?.courseEvaluations?.paging?.totalItems,
            current: courseEvaluations?.courseEvaluations?.paging?.currentPage,
            showSizeChanger: false,
          }}
          onChange={(pagination, filter, sorter) => {
            handleTableChange(pagination, filter, sorter as SorterResult<any>);
          }}
          columns={[
            {
              title: 'Student',
              dataIndex: 'student',
              render(value) {
                return value?.name;
              },
            },
            {
              title: 'Course',
              dataIndex: 'course',
              render(value, record) {
                return `${value?.name} - ${record?.courseLevel?.title}`;
              },
              filters: courses?.courses?.data
                ? courses?.courses?.data?.map((course) => ({
                    text: course!.name,
                    value: `${course!.id}`,
                  }))
                : undefined,
              filterMultiple: true,
              filteredValue: courseId,
            },

            {
              title: 'Created',
              dataIndex: 'createdAt',
              key: 'createdAt',
              render(value) {
                return dayjs(value).format('DD MMM YYYY');
              },
            },
            {
              title: 'Action',
              key: 'action',
              dataIndex: 'slug',
              render(slug) {
                return (
                  <div className="flex items-center">
                    <Button
                      onClick={() => {
                        navigate(`/${route.courseEvaluation(slug)}`);
                      }}
                      type="link"
                    >
                      View
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </Card>
    </main>
  );
}

export default CourseEvaluation;
