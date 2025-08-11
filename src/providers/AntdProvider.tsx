import { StyleProvider } from '@ant-design/cssinjs';
import { App, ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

export default function AntdProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ec3724',
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <App>{children}</App>
      </StyleProvider>
    </ConfigProvider>
  );
}
