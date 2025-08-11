import { Button, Form, Input } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../configs/firebase';
import { useMessage } from '../../context/message-context';
import { showErrorMessage } from '../../utils/utils';

type ResetPasswordProps = {
  onLoginClick: () => void;
};

type FormInput = {
  email: string;
};

function ResetPassword({ onLoginClick }: ResetPasswordProps) {
  const [form] = Form.useForm<FormInput>();
  const [loading, setLoading] = useState(false);

  const { success } = useMessage();

  const handleForgotPassword = async (email: string) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      form.resetFields();
      success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (values: FormInput) => {
    handleForgotPassword(values.email);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Form form={form} onFinish={handleSubmit} layout="vertical" className="w-full max-w-xs">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter your email" className="!rounded-full " />
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full"
            loading={loading}
            shape="round"
            type="primary"
            htmlType="submit"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={onLoginClick}>
        Back to Login
      </Button>
    </div>
  );
}

export default ResetPassword;
