import { DatePicker, Form, Input, Modal } from 'antd';
import {
  CourseSchedule,
  CreateCourseScheduleInput,
  useCreateCourseScheduleMutation,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface AddScheduleModalProps {
  open: boolean;
  schedule: CourseSchedule | null;
  courseId: number;
}

export function AddScheduleModal(props: AddScheduleModalProps) {
  const { open, schedule, courseId } = props;

  const [form] = Form.useForm();

  const [createCourseScheduleMutation, { loading: createCourseScheduleLoading }] =
    useCreateCourseScheduleMutation({
      onError: showErrorMessage,
    });

  const onFinish = (values: CreateCourseScheduleInput) => {
    createCourseScheduleMutation({
      variables: {
        createCourseScheduleInput: {
          name: values.name,
          students: [],
          levelId: `${courseId}`,
          days: ['1', '2', '3', '4', '5'],
          endDate: values.endDate.toISOString(),
          startDate: values.startDate.toISOString(),
          endTime: '2021-09-30T15:00:00.000Z',
          startTime: '2021-09-30T14:00:00.000Z',
        },
      },
    });
  };

  return (
    <div>
      <Modal
        onOk={() => {
          form.submit();
        }}
        centered
        open={open}
        title={schedule ? 'Edit Schedule' : 'Add Schedule'}
        okButtonProps={{ loading: createCourseScheduleLoading }}
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            rules={[{ required: true, message: 'Please input a name!' }]}
            label="Name"
            name="name"
          >
            <Input className="!rounded-full" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter a valid date',
              },
            ]}
            name="startDate"
            label="Start Date"
          >
            <DatePicker className="!rounded-full" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            rules={[
              {
                required: true,
                message: 'Please enter a valid date',
              },
              {
                validator: (_, value) => {
                  if (value && value.isBefore(form.getFieldValue('startDate'))) {
                    return Promise.reject(new Error('End date must be after start date'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            label="End Date"
          >
            <DatePicker className="!rounded-full" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
