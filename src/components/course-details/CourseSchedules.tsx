import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Permissions } from '../../configs/permissions';
import { route } from '../../constants/routes';
import {
  Course,
  CourseSchedule,
  ExamMedium,
  useCreteOrUpdateOfflineExamMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import { formatDate, getTimeFromDateStr, showErrorMessage } from '../../utils/utils';
import AddAttendance from '../attendance/add-attendance';

interface Props {
  schedules: CourseSchedule[];
  course: Course;
}

function CourseSchedules(props: Props) {
  const navigate = useNavigate();
  const { schedules: data, course } = props;

  const permissions = useGetUserPermissions();

  const [createOrUpdateOfflineExamMutation, { loading: createOrUpdateOfflineExamLoading }] =
    useCreteOrUpdateOfflineExamMutation({
      onError: showErrorMessage,
      onCompleted(response) {
        navigate(`/${route.updateExamMarks}`, {
          state: {
            data: response.creteOrUpdateOfflineExam,
          },
        });
      },
    });

  const [selectedSchedule, setSelectedSchedule] = useState<null | number>(null);

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
      render: (_, item) => (
        <div>
          <div>
            {getTimeFromDateStr(item.startTime)} to {getTimeFromDateStr(item.endTime)}
          </div>
        </div>
      ),
    },
    {
      title: 'Action',
      render: (_, rec) => (
        <div className="grid grid-cols-3 gap-5">
          {permissions.includes(Permissions.EDIT_SCHEDULE) && (
            <Button
              onClick={() => navigate(`/${route.editSchedule(rec.id)}`)}
              size="small"
              type="primary"
            >
              Edit
            </Button>
          )}
          <Link to={`/${route.scheduleAttendance(rec.id)}`}>
            <Button
              // onClick={() => {
              //   setSelectedSchedule(Number(rec.id));
              // }}
              size="small"
              type="default"
            >
              Attendance
            </Button>
          </Link>
          <Link to={`/${route.scheduleStudents(rec.id)}`}>
            <Button
              size="small"
              className="!border-none !bg-green-500 !text-white hover:bg-green-800"
            >
              Students
            </Button>
          </Link>
          {course.examRequired && course.mediumOfExam === ExamMedium.Offline && (
            <Button
              size="small"
              className="!border-none !bg-teal-500 !text-white hover:bg-green-800"
              loading={createOrUpdateOfflineExamLoading}
              onClick={() => {
                createOrUpdateOfflineExamMutation({
                  variables: {
                    createOfflineExamInput: {
                      courseScheduleId: Number(rec.id),
                    },
                  },
                });
              }}
            >
              Add Exam Marks
            </Button>
          )}
        </div>
      ),
    },
  ];

  const schedule = useMemo(() => {
    return data.find((s) => s.id === `${selectedSchedule}`);
  }, [data, selectedSchedule]);

  return (
    <div>
      <p className="mb-2 ml-1 mt-8 text-lg font-semibold">Schedule</p>
      <Table pagination={false} rowKey="id" columns={columns} dataSource={data} />
      <AddAttendance
        onClose={() => setSelectedSchedule(null)}
        open={!!selectedSchedule}
        scheduleId={Number(selectedSchedule)}
        startDate={schedule ? dayjs(schedule?.startDate!) : dayjs()}
        endDate={schedule ? dayjs(schedule?.endDate!) : dayjs()}
      />
    </div>
  );
}

export default CourseSchedules;
