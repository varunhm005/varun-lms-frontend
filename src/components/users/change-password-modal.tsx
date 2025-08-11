import { Form, Input, Modal } from 'antd';
import { User, useUpdatePasswordMutation } from '../../graphql/@generated/graphql';

interface ChangePasswordModalProps {
  visible: boolean;
  onCancel: () => void;
  user: User | null;
}

export function ChangePasswordModal(props: ChangePasswordModalProps) {
  const { visible, onCancel, user } = props;

  const [updatePasswordMutation, { loading: updatePasswordLoading }] = useUpdatePasswordMutation({
    onCompleted() {
      onCancel();
    },
  });

  const [form] = Form.useForm<{
    password: string;
    confirm: string;
  }>();

  return (
    <Modal
      title={`Change Password for ${user?.name}`}
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{
        loading: updatePasswordLoading,
      }}
      centered
    >
      {Boolean(user) && (
        <div>
          <Form
            onFinish={(values) => {
              updatePasswordMutation({
                variables: {
                  updatePasswordInput: {
                    id: Number(user?.id),
                    password: values.password,
                  },
                },
              });
            }}
            layout="vertical"
            form={form}
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      )}
    </Modal>
  );
}
