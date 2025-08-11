import { Button } from 'antd';
import { FallbackProps } from 'react-error-boundary';
import Logo from '../../assets/images/logo.png';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="h-screen w-screen bg-[#c2c2c2]">
      <div className="container mx-auto flex h-screen items-center justify-center">
        <div className="rounded-md bg-white p-10 text-center shadow-lg">
          <div className="mb-5 flex items-center justify-center pl-10">
            <img src={Logo} alt="Logo" className="w-46" />
          </div>
          <div className="my-7">
            <p className="text-center text-2xl font-bold">Something went wrong</p>
            <p className="text-center text-lg font-normal">
              {error.message || 'Please refresh the page or contact the admin'}
            </p>
          </div>
          <Button className="mt-5" onClick={resetErrorBoundary}>
            Try Again
          </Button>
          <br />
          <Button
            onClick={() => {
              window.location.href = '/';
            }}
            type="link"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
