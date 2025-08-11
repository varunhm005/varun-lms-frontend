import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spin size="large" tip="Loading..." spinning />
    </div>
  );
}
