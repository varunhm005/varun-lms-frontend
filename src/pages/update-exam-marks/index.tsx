import { Button, Card, Form, InputNumber, Switch } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/query-keys';
import { useMessage } from '../../context/message-context';
import { AttendedExam, useBulkUpdateAttendedExamMutation } from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

type FormInput = {
  attendedExams: Array<{
    name: string;
    user: string;
    achivedMark?: number;
    passMark: number;
    totalMark?: number;
    courseScheduleStudentsId: number;
    userId: number;
    id: number;
    examAttended: boolean;
  }>;
};

function UpdateExamMark() {
  const { state } = useLocation();
  const [form] = Form.useForm<FormInput>();

  const data = state.data as AttendedExam[];

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      attendedExams: data.map((item) => ({
        name: `${item.name}`,
        user: `${item.user.name}`,
        achivedMark: item.achivedMark as number,
        courseScheduleStudentsId: item.courseScheduleStudentsId!,
        totalMark: item.totalMark!,
        userId: item.userId,
        passMark: item.exam.passMark!,
        id: +item.id,
        examAttended: item.examAttended,
      })),
    });
    setDisabled(true);
  }, [data, form, state]);

  const users = useMemo(() => {
    return data.map((item) => item.user);
  }, [data]);

  const message = useMessage();
  const navigate = useNavigate();

  const [bulkUpdateAttendedExamMutation, { loading: bulkUpdateAttendedExamLoading }] =
    useBulkUpdateAttendedExamMutation({
      onError: showErrorMessage,
      onCompleted() {
        message.success('Updated Successfully');
        navigate(-1);
      },
      refetchQueries: [queryKeys.GetAttendedExams],
    });

  const onFinish = (values: FormInput) => {
    bulkUpdateAttendedExamMutation({
      variables: {
        bulkUpdateAttendedExamInput: values.attendedExams.map((item) => ({
          id: item.id,
          achivedMark: item.achivedMark!,
          passMark: item.passMark,
          examAttended: item.examAttended,
        })),
      },
    });
  };

  return (
    <main className="p-6 text-left">
      <h1 className="text-2xl font-bold">Update Exam Mark</h1>
      <Form onChange={() => setDisabled(false)} onFinish={onFinish} layout="vertical" form={form}>
        <Form.List name="attendedExams">
          {(fields) => (
            <>
              {fields.map((field, index) => {
                return (
                  <Card
                    className="!my-5"
                    size="small"
                    title={`${index + 1}. ${users[index]?.name} - Attended ${data[index]?.name}`}
                    key={field.key}
                  >
                    <div className="grid grid-cols-3 gap-x-3">
                      <div className="flex !w-full gap-x-3">
                        <Form.Item
                          valuePropName="checked"
                          label="Attended"
                          name={[field.name, 'examAttended']}
                        >
                          <Switch
                            onChange={() => {
                              if (disabled) setDisabled(false);
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Achieved Mark"
                          className="w-full"
                          rules={[
                            { required: true, message: 'Pleas input Achieved Mark' },
                            // Check if the value is greater than the total mark
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                // Check exam not attended and mark not = 0
                                if (
                                  !getFieldValue('attendedExams')[index].examAttended &&
                                  value !== 0
                                ) {
                                  return Promise.reject(new Error('Achieved Mark must be 0'));
                                }

                                if (!(value <= getFieldValue('attendedExams')[index].totalMark)) {
                                  return Promise.reject(
                                    new Error('Achieved Mark must be less than Total Mark')
                                  );
                                }

                                if (value >= getFieldValue('attendedExams')[index].passMark) {
                                  return Promise.resolve();
                                }

                                return Promise.resolve();
                              },
                            }),

                            // Check if the value is less than 0
                            () => ({
                              validator(_, value) {
                                if (value >= 0) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error('Achieved Mark must be greater than 0')
                                );
                              },
                            }),
                          ]}
                          name={[field.name, 'achivedMark']}
                        >
                          <InputNumber className="!w-full" />
                        </Form.Item>
                      </div>
                      <Form.Item label="Total Mark" name={[field.name, 'totalMark']}>
                        <InputNumber disabled className="!w-full" />
                      </Form.Item>
                      <Form.Item label="Pass Mark" name={[field.name, 'passMark']}>
                        <InputNumber disabled className="!w-full" />
                      </Form.Item>
                      <Form.Item
                        label="courseScheduleStudentsId"
                        name={[field.name, 'courseScheduleStudentsId']}
                        hidden
                      >
                        <InputNumber className="!w-full" />
                      </Form.Item>
                      <Form.Item label="userId" name={[field.name, 'userId']} hidden>
                        <InputNumber className="!w-full" />
                      </Form.Item>
                      <Form.Item label="id" name={[field.name, 'id']} hidden>
                        <InputNumber className="!w-full" />
                      </Form.Item>
                    </div>
                  </Card>
                );
              })}
            </>
          )}
        </Form.List>
        <div className="flex w-full gap-3">
          <Form.Item className="w-full">
            <Button
              onClick={() => {
                navigate(-1);
              }}
              type="default"
              block
            >
              Back
            </Button>
          </Form.Item>
          <Form.Item className="w-full">
            <Button
              disabled={disabled}
              loading={bulkUpdateAttendedExamLoading}
              htmlType="submit"
              type="primary"
              block
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </main>
  );
}

export default UpdateExamMark;
