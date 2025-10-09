import { Form } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightImg from '../../assets/images/login-three.png';
import Logo from '../../assets/images/newLogo.jpg';
import LoginForm from '../../components/auth/login-form';
import ResetPassword from '../../components/auth/reset-password';
import { auth } from '../../configs/firebase';
import { useFirebaseContext } from '../../context/firebase-user-context';
import { showErrorMessage } from '../../utils/utils';

type FormInput = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormInput>();
  const { user } = useFirebaseContext();
  const [showResetPassword, setShowResetPassword] = useState(false);

  const onFinish = async (input: FormInput) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, input.email, input.password);
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleResetPassword = () => {
    setShowResetPassword(!showResetPassword);
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard', {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="login-page posiition-relativ">
      <div className="login-left grid grid-cols-10">
        <div className="relative col-span-10 text-center md:col-span-3">
          <div className="login-left flex flex-col justify-center p-5 md:min-h-screen">
            <div className="form-field">
              <img className="logo" src={Logo} alt="" />
              {showResetPassword ? (
                <ResetPassword onLoginClick={toggleResetPassword} />
              ) : (
                <LoginForm
                  form={form}
                  loading={loading}
                  onFinish={onFinish}
                  onForgotPasswordClick={toggleResetPassword}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-span-10 md:col-span-7">
          <div className="flex flex-col justify-end md:min-h-screen">
            <img src={RightImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
