import { DatePicker, Form, Modal } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useCreateAttendanceMutation } from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface AddAttendanceProps {
  open: boolean;
  scheduleId: number;
  onClose: () => void;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

type FormInput = { date: dayjs.Dayjs };

function AddAttendance(props: AddAttendanceProps) {
  const { open, scheduleId, onClose, startDate, endDate } = props;

  const [createAttendanceMutation, { loading: createAttendanceLoading }] =
    useCreateAttendanceMutation({
      onError: showErrorMessage,
      refetchQueries: [queryKeys.GetAttendancesForSchedule],
    });

  const [form] = Form.useForm<FormInput>();

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && (current < startDate || current > endDate);
  };

  const navigate = useNavigate();

  const submit = (values: FormInput) => {
    createAttendanceMutation({
      variables: {
        createAttendanceInput: {
          courseScheduleId: scheduleId,
          date: values.date.startOf('day').toISOString(),
        },
      },
      onCompleted(data) {
        navigate(`/${route.editAttendance(data.createAttendance.slug)}`, {});
      },
    });
  };

  return (
    <Modal
      open={open}
      okButtonProps={{ loading: createAttendanceLoading }}
      onOk={() => {
        form.submit();
      }}
      centered
      title="Attendance"
      onCancel={onClose}
    >
      <Form
        form={form}
        onFinish={(val) => {
          submit(val);
        }}
        layout="vertical"
      >
        <Form.Item
          rules={[{ required: true, message: 'Please select a date!' }]}
          name="date"
          label="Date"
        >
          <DatePicker
            disabledDate={disabledDate}
            className="w-full"
            defaultPickerValue={startDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddAttendance;
