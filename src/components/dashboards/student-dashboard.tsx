import { Calendar, Spin, theme } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import {
  ScheduleStudent,
  ScheduleStudentStatus,
  useGetMyStudentSchedulesQuery,
} from '../../graphql/@generated/graphql';
import ScheduleList from './schedule-list';

export default function StudentDashboard() {
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [date, setDate] = useState<dayjs.Dayjs>();

  const { data: coursesResponse, loading } = useGetMyStudentSchedulesQuery({
    variables: {
      input: {
        startDate: !date ? dayjs().startOf('month').toISOString() : null,
        endDate: !date ? dayjs().endOf('month').toISOString() : null,
        date: date ? date?.toISOString() : undefined,
      },
    },
  });

  const coursesToList = useMemo(() => {
    return coursesResponse?.getMyStudentSchedules.filter((c) =>
      [ScheduleStudentStatus.InProgress, ScheduleStudentStatus.NotStarted].includes(c!.status!)
    );
  }, [coursesResponse]);

  const completedCourses = useMemo(() => {
    return coursesResponse?.getMyStudentSchedules.filter((c) =>
      [ScheduleStudentStatus.Completed].includes(c!.status!)
    );
  }, [coursesResponse]);

  return (
    <Spin spinning={loading}>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="grid grid-cols-2">
            <ScheduleList title="Courses" schedules={(coursesToList ?? []) as ScheduleStudent[]} />
            <div className="col-span-2 h-10" />
            <ScheduleList
              title="Completed Courses"
              schedules={(completedCourses ?? []) as ScheduleStudent[]}
            />
          </div>
          <div className="col-span-1">
            <div style={wrapperStyle}>
              <Calendar fullscreen={false} onChange={(d) => setDate(d)} value={date} />
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}
