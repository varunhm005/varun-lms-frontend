import { Layout, Space } from 'antd';
import { setUserProperties } from 'firebase/analytics';
import React, { PropsWithChildren } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LayoutHeader from '../components/common/LayoutHeader';
import Loading from '../components/common/Loading';
import SideNavBar from '../components/common/SideNavBar';
import FullScreenLoading from '../components/loading/FullScreenLoading';
import { analytics } from '../configs/firebase';
import { route } from '../constants/routes';
import { useFirebaseContext } from '../context/firebase-user-context';
import { useGetUserProfileQuery } from '../graphql/@generated/graphql';
import { useFirebaseRoutesAnalytics } from '../hooks/analytics';
import { useGetRoles } from '../hooks/useGetRoles';
import { useHistoryStack } from '../hooks/useHistoryStack';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: 'rgb(249,250,245)',
  height: 'calc(100vh -  64px)',
  overflow: 'auto',
};

interface Props {}

function AdminLayout(props: PropsWithChildren<Props>) {
  const { children } = props;

  const { user } = useFirebaseContext();
  useFirebaseRoutesAnalytics();

  const navigate = useNavigate();
  useGetRoles();
  useHistoryStack();
  const { loading, error } = useGetUserProfileQuery({
    onCompleted(data) {
      setUserProperties(analytics, {
        role: data?.getUserProfile?.role?.name || '',
        email: data?.getUserProfile?.email || '',
        name: data?.getUserProfile?.name || '',
        roleId: data?.getUserProfile?.role?.id || '',
      });
    },
    onError() {
      if (!user) {
        navigate(route.login, {
          replace: true,
        });
      }
    },
  });

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <FullScreenLoading />;
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <SideNavBar />
        <Layout>
          <LayoutHeader />
          <Content style={contentStyle}>
            {children}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
}

export default AdminLayout;
