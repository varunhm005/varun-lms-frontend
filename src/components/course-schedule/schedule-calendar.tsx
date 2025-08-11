import { Button, DatePicker, Form, Table } from 'antd';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { CourseSchedule, useCourseSchedulesLazyQuery } from '../../graphql/@generated/graphql';

type FormValues = {
  month: Dayjs;
};

function ScheduleCalendar() {
  const [form] = Form.useForm<FormValues>();

  const [getCourseSchedule, { data: courseScheduleData, loading: courseScheduleLoading }] =
    useCourseSchedulesLazyQuery({
      fetchPolicy: 'network-only',
    });

  const schedules = useMemo(() => {
    if (courseScheduleData) {
      return courseScheduleData.courseSchedules.data;
    }
    return [];
  }, [courseScheduleData]);

  return (
    <div className="w-full text-left">
      <Form
        form={form}
        onFinish={(d: { month: Dayjs }) => {
          // get start and end date of the month
          const startDate = d.month.startOf('month').toDate();
          const endDate = d.month.endOf('month').toDate();
          getCourseSchedule({
            variables: {
              courseScheduleFilter: {
                endDate: endDate.toISOString(),
                startDate: startDate.toISOString(),
              },
              pagingInput: {
                page: 1,
                size: 1000,
              },
            },
          });
        }}
        layout="vertical"
      >
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            rules={[{ required: true, message: 'Please select a month' }]}
            label="Select Month"
            name="month"
          >
            <DatePicker picker="month" className="w-full" />
          </Form.Item>
          <Form.Item label="&nbsp;">
            <Button loading={courseScheduleLoading} type="primary" htmlType="submit">
              View Schedule
            </Button>
          </Form.Item>
        </div>
      </Form>

      {Boolean(schedules.length) && (
        <div>
          <Table className="rounded-lg" dataSource={schedules as any[]} bordered size="small">
            <Table.Column
              title="Course"
              render={(value: CourseSchedule) => {
                return `${value?.course?.name} ${value?.courseLevel?.title}`;
              }}
            />
            <Table.Column
              title="Start Date"
              dataIndex="startDate"
              key="startDate"
              render={(value) => {
                return new Date(value).toLocaleDateString();
              }}
            />
            <Table.Column
              title="End Date"
              dataIndex="endDate"
              key="endDate"
              render={(value) => {
                return new Date(value).toLocaleDateString();
              }}
            />
          </Table>
        </div>
      )}
    </div>
  );
}

export default ScheduleCalendar;
