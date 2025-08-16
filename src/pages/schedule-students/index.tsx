import { Button, Progress, Table, message, Modal } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { route } from '../../constants/routes';
import {
  ScheduleStudent,
  useGetCourseScheduleQuery,
  useGetScheduleStudentNameQuery,
  useGetUserProfileQuery,
} from '../../graphql/@generated/graphql';
import { useUpdateScheduleStudentForOfflineCourse } from '../../hooks/useUpdateScheduleStudentForOfflineCourse';

export default function ScheduleStudents() {
  const { scheduleId } = useParams<{
    scheduleId: string;
  }>();

  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useGetScheduleStudentNameQuery({
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

  const { markAsComplete, loading: markCompleteLoading } =
    useUpdateScheduleStudentForOfflineCourse();

  const profileData = profile?.getUserProfile;
  const roleName = profileData!.role!.name;

  const handleMarkAsComplete = async (record: ScheduleStudent) => {
    try {
      setRefreshing(true);
      await markAsComplete(record.id!.toString());
      message.success('Course marked as complete successfully!');

      // Refresh the data to show updated completion percentage
      await refetch();
    } catch (error) {
      message.error('Failed to mark course as complete. Please try again.');
      console.error('Error marking course as complete:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const showConfirmModal = (record: ScheduleStudent) => {
    Modal.confirm({
      title: 'Confirmation',
      content: `Are you sure you want to mark this as complete?`,
      okText: 'Yes, Mark as Complete',
      cancelText: 'Cancel',
      okType: 'primary',
      onOk: () => handleMarkAsComplete(record),
      onCancel: () => {
        // Modal automatically closes when Cancel is clicked
        // This callback is optional - Ant Design handles the closing automatically
      },
    });
  };

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
                  record.course?.median === 'Offline' &&
                  record.completionPercentage !== 100 && (
                    <Button
                      size="small"
                      type="primary"
                      disabled={markCompleteLoading || refreshing}
                      onClick={() => showConfirmModal(record)}
                    >
                      Mark as Complete
                    </Button>
                  )}
              </div>
            );
          }}
        />
      </Table>
    </main>
  );
}
