import { Button, Calendar, Card, Table, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { route } from '../../constants/routes';
import {
  CourseSchedule,
  useCourseSchedulesQuery,
  useGetCoursesListQuery,
  useGetExamsQuery,
} from '../../graphql/@generated/graphql';
import { useGetProfile, useGetUserRoleName } from '../../hooks/auth-hook';
import { formatDate, getTimeFromDateStr } from '../../utils/utils';
import Loading from '../common/Loading';

const columns: ColumnsType<CourseSchedule> = [
  {
    title: 'S.No',
    dataIndex: 'key',
    key: 'string',
    render: (_, __, i) => <div>{i + 1}</div>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    render: (date: string) => formatDate(date),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    render: (date: string) => formatDate(date),
  },
  {
    title: 'Time',
    render: (_, data) => (
      <div>
        <div>
          {getTimeFromDateStr(data.startTime)} to {getTimeFromDateStr(data.endTime)}
        </div>
      </div>
    ),
  },
];

export default function AdminDashboard() {
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const profile = useGetProfile();

  const userRole = useGetUserRoleName();

  const courseList = useGetCoursesListQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 4,
      },
      filter: {
        instructorId: userRole === 'Faculty' ? Number(profile!.id) : undefined,
      },
    },
  });

  const { data: exams, loading: examsLoading } = useGetExamsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 4,
      },
      examFilter: {
        instructorId: userRole === 'Faculty' ? Number(profile?.id) : undefined,
      },
    },
  });

  const { data: schedules, loading: scheduleLoading } = useCourseSchedulesQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 4,
      },
      courseScheduleFilter: {},
    },
  });

  const { data: courses, loading: coursesLoading } = courseList;

  if (examsLoading || coursesLoading || scheduleLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-1 text-left">
            <p className="mb-2 text-base">Courses</p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {courses?.courses?.data
                ? courses?.courses?.data.map((course) => (
                    <div className="col-span-1" key={course?.id}>
                      <Link to={`/${route.courseLevels(`${course?.id}`)}`}>
                        <Card
                          className="card-style h-full cursor-pointer"
                          style={{ backgroundColor: '#E7F3FF', width: '100%' }}
                        >
                          <p>Active</p>
                          <h4 className="mb-5 text-xl font-semibold">{course?.name}</h4>
                          {/* <p>Status: {formatText(course?.status ?? '')}</p>
                          <p>
                            Date:{' '}
                            {`${formatDate(course?.courseSchedule.startDate)} - ${formatDate(
                              course?.courseSchedule.endDate
                            )}`}
                          </p> */}
                          {/* <p>Progress:</p> */}
                          {/* <Progress
                            strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }}
                            percent={course?.studentProgress}
                          /> */}
                        </Card>
                      </Link>
                    </div>
                  ))
                : null}
            </div>
            <div className="float-right mr-3 flex">
              <Link to={`/${route.courseList}`}>
                <Button type="link" className="text-right">
                  More
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <div style={wrapperStyle}>
              <Calendar fullscreen={false} />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 text-left md:grid-cols-4">
          <div className="col-span-4 ">
            <p className="text-base">Exam</p>
          </div>
          {exams?.exams?.data?.map((exam) => (
            <div className="col-span-1" key={exam?.id}>
              <Link to={`/${route.editExam(`${exam?.id}`)}`}>
                <Card
                  className="card-style h-full"
                  style={{ backgroundColor: '#E7F3FF', width: '100%' }}
                >
                  <p className="text-lg">{exam?.name}</p>
                  <h4 className="mb-5 text-xl font-semibold">{exam?.cource.name}</h4>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <div className="p-5">
          <Link className="float-right" to={`/${route.exam}`}>
            <p>More</p>
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 text-left ">
          <div className="col-span-1 ">
            <p className="mb-3 text-base">Schedule</p>
            <Table columns={columns} dataSource={(schedules?.courseSchedules.data as any) ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
