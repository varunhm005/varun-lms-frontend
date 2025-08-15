import { Button, Progress, Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { route } from '../../constants/routes';
import {
  ScheduleStudent,
  useGetCourseScheduleQuery,
  useGetScheduleStudentNameQuery,
  useGetUserProfileQuery,
} from '../../graphql/@generated/graphql';

export default function ScheduleStudents() {
  const { scheduleId } = useParams<{
    scheduleId: string;
  }>();

  const { data, loading } = useGetScheduleStudentNameQuery({
    variables: {
      getScheduleStudentInput: {
        courseScheduleId: Number(scheduleId),
      },
    },
  });

  const { data: schedule, loading: scheduleLoading } = useGetCourseScheduleQuery({
    variables: {
      courseScheduleId: Number(scheduleId),
    },
  });

  const { data: profile } = useGetUserProfileQuery();

  const profileData = profile?.getUserProfile;
  const roleName = profileData!.role!.name;

  if (loading || scheduleLoading) {
    return <FullScreenLoading />;
  }

  return (
    <main className="p-6 text-left">
      <h1 className="mb-6 text-3xl font-bold">Schedule Students</h1>

      <Table size="small" pagination={false} dataSource={(data?.scheduleStudents as any) || []}>
        <Table.Column
          title="Sl No."
          render={(_, __, index) => {
            return <span>{index + 1}</span>;
          }}
        />
        <Table.Column
          title="Name"
          render={(_, record: ScheduleStudent) => {
            return record.user?.name;
          }}
        />
        <Table.Column
          title="Employee Id"
          render={(_, record: ScheduleStudent) => {
            return record.user?.idNumber;
          }}
        />
        <Table.Column
          title="Course Progress"
          render={(_, record: ScheduleStudent) => {
            return <Progress percent={record.completionPercentage} showInfo />;
          }}
        />
        <Table.Column
          title="Assessments"
          render={(_, record: ScheduleStudent) => {
            return (
              <div className="flex gap-x-5 pl-5">
                <Link
                  to={`/${route.addAssessment}?scheduleId=${record.id}&courseId=${schedule?.courseSchedule?.coursesId}`}
                >
                  <Button size="small" type="primary">
                    Add
                  </Button>
                </Link>
                <Link to={`/${route.assessments}?scheduleId=${record.id}`}>
                  <Button size="small" type="default">
                    View
                  </Button>
                </Link>
                {(roleName === 'Admin' || roleName === 'Faculty') &&
                  record.completionPercentage !== 100 && (
                    <Link
                      to={`/${route.addAssessment}?scheduleId=${record.id}&courseId=${schedule?.courseSchedule?.coursesId}`}
                    >
                      <Button size="small" type="primary">
                        Mark as Complete
                      </Button>
                    </Link>
                  )}
              </div>
            );
          }}
        />
      </Table>
    </main>
  );
}
