import { Button, Form, FormInstance, Input } from 'antd';

type FormInput = {
  email: string;
  password: string;
};

type LoginFormProps = {
  form: FormInstance<FormInput>;
  loading: boolean;
  onFinish: (values: FormInput) => void;
  onForgotPasswordClick: () => void;
};

function LoginForm({ form, loading, onFinish, onForgotPasswordClick }: LoginFormProps) {
  return (
    <Form form={form} layout="vertical" className="text-center" onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}
      >
        <Input className="rounded-full" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} shape="round" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Button type="link" onClick={onForgotPasswordClick}>
        Forgot Password?
      </Button>
    </Form>
  );
}

export default LoginForm;
