import { Button, Form, Input } from 'antd';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { useConfirm } from '../../context/context-hooks';
import { showErrorMessage } from '../../utils/utils';

function Settings() {
  const { success } = useConfirm();

  const onSubmit = async (data: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const { oldPassword, password } = data;
      const user = auth.currentUser!;
      //   Check current password
      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      await reauthenticateWithCredential(user, credential)
        .then((res) => res)
        .catch(() => {
          throw new Error("The old password that you've entered is incorrect");
        });

      await updatePassword(user, password);
      success({
        title: 'Password changed successfully',
      });
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <main className="p-6 text-left">
      <div className="max-w-lg">
        <h1 className="text-bold mb-5 text-2xl">Change Password</h1>
        <Form onFinish={onSubmit} size="large">
          <Form.Item
            hasFeedback
            rules={[{ required: true, message: 'Please input your old password!' }]}
            name="oldPassword"
          >
            <Input.Password className="!rounded-full" placeholder="Old Password" />
          </Form.Item>
          <Form.Item
            hasFeedback
            rules={[{ required: true, message: 'Please input your old password!' }]}
            name="password"
          >
            <Input.Password className="!rounded-full" placeholder="New Password" />
          </Form.Item>
          <Form.Item
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
            name="confirmPassword"
          >
            <Input.Password className="!rounded-full" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" shape="round" block>
                Submit
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}

export default Settings;
