/* eslint-disable no-param-reassign */
import { Button, Card, DatePicker, Form, Select } from 'antd';
import dayjs from 'dayjs';
import { useMessage } from '../../context/message-context';
import {
  AttendanceReportFilter,
  AttendanceStatus,
  useGetAttendanceReportLazyQuery,
} from '../../graphql/@generated/graphql';
import { useStudents } from '../../hooks/useGetUsers';

function AttendanceReport() {
  const { data: users, loading: userLoading } = useStudents();
  // const { data: courses, loading: coursesLoading } = useGetUserCourses();

  const [form] = Form.useForm<AttendanceReportFilter>();

  const [getAttendanceReport, { loading: attendanceReportLoading }] =
    useGetAttendanceReportLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted(data) {
        if (data?.attendanceReport?.report) {
          window.open(data?.attendanceReport?.report, '_blank');
        }
      },
    });

  const { error } = useMessage();

  const onFinish = async (values: AttendanceReportFilter) => {
    try {
      values.startDate = (values.startDate as unknown as dayjs.Dayjs)?.toISOString();
      values.endDate = (values.endDate as unknown as dayjs.Dayjs)?.toISOString();

      await getAttendanceReport({
        variables: {
          attendanceReportFilter: values,
        },
      });
    } catch (err) {
      error("Couldn't generate report");
    }
  };

  return (
    <main>
      <div className="p-6 text-left">
        <Card loading={userLoading} title="Attendance Report" className="max-w-5xl">
          <Form onFinish={onFinish} form={form} size="large" layout="vertical">
            <Form.Item
              label="Start Date"
              rules={[{ required: true, message: 'Please select start date' }]}
              name="startDate"
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please select end date' },
                {
                  validator: (_rule, value, callback) => {
                    if (value && value.isBefore(form.getFieldValue('startDate'))) {
                      callback('End date should be after start date');
                    }
                    callback();
                  },
                },
              ]}
              label="End Date"
              name="endDate"
            >
              <DatePicker
                disabledDate={(current) => {
                  const pastDates = current && current < form.getFieldValue('startDate');
                  const futureDates = current && current > dayjs().endOf('day');

                  return pastDates || futureDates;
                }}
                className="w-full"
              />
            </Form.Item>
            <Form.Item label="Student" name="studentId">
              <Select
                placeholder="Select Student"
                className="w-full"
                loading={userLoading}
                options={users?.users?.data?.map((user) => ({
                  label: user?.name,
                  value: user?.id,
                }))}
              />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select
                placeholder="Select Status"
                className="w-full"
                loading={userLoading}
                options={[
                  {
                    label: 'Present',
                    value: AttendanceStatus.Present,
                  },
                  {
                    label: 'Absent',
                    value: AttendanceStatus.Absent,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={attendanceReportLoading}
                block
                shape="round"
                type="primary"
                htmlType="submit"
              >
                Generate Report
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </main>
  );
}

export default AttendanceReport;
