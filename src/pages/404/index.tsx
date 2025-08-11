import { Button } from 'antd';
import Lottie from 'lottie-react';
import notFound from '../../assets/lottie/not-found.json';
import AdminLayout from '../../layouts/AdminLayout';

export default function NotFound() {
  return (
    <AdminLayout>
      <div className="flex w-full flex-col items-center justify-center p-6 pt-20">
        <Lottie animationData={notFound} loop />
        <Button
          onClick={() => {
            window.location.href = '/';
          }}
          type="primary"
          className="mt-10"
          size="large"
          shape="round"
        >
          Go Home
        </Button>
      </div>
    </AdminLayout>
  );
}
