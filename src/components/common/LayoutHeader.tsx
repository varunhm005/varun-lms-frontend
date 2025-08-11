import {
  LeftOutlined,
  LogoutOutlined,
  NotificationOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useApolloClient } from '@apollo/client';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Button, Dropdown } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useFirebaseContext } from '../../context/firebase-user-context';
import { useGetUnreadNotificationCountQuery } from '../../graphql/@generated/graphql';
import { useGetProfile } from '../../hooks/auth-hook';
import { useHistoryStack } from '../../hooks/useHistoryStack';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 64,
  paddingInline: 30,
  lineHeight: '64px',
  borderLeft: '1.5px solid #EAEAEA',
};

export default function LayoutHeader() {
  const navigate = useNavigate();

  const client = useApolloClient();

  const { logoutUser } = useFirebaseContext();

  const { data: unreadNotificationData, previousData } = useGetUnreadNotificationCountQuery({
    pollInterval: 1000 * 60 * 5, // 5 minutes
  });

  // CHeck changes in previous data
  useMemo(() => {
    if (
      previousData?.getUnreadNotificationCount?.count !==
      unreadNotificationData?.getUnreadNotificationCount?.count
    ) {
      client.cache.evict({ fieldName: queryKeys.GetNotifications });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    previousData?.getUnreadNotificationCount?.count,
    unreadNotificationData?.getUnreadNotificationCount?.count,
  ]);

  const historyStack = useHistoryStack();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          type="button"
          onClick={() => {
            navigate(route.profile);
          }}
        >
          Profile
        </button>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '2',
      onClick: () => {
        logoutUser();
      },
      label: <button type="button">Logout</button>,
      icon: <LogoutOutlined />,
    },
  ];

  const notificationCount = useMemo(() => {
    let count = '0';

    if (unreadNotificationData?.getUnreadNotificationCount) {
      count = `${unreadNotificationData.getUnreadNotificationCount.count}`;
    }

    // Check if count is greater than 10
    if (Number(count) > 99) {
      count = '99+';
    }

    return count;
  }, [unreadNotificationData]);

  const user = useGetProfile();

  return (
    <Header className="gradient_background" style={headerStyle}>
      <div className="flex justify-between ">
        <div>
          {Boolean(historyStack.length) && (
            <Button
              onClick={() => {
                navigate(-1);
              }}
              type="text"
            >
              <div className="flex items-center justify-center gap-x-1">
                <LeftOutlined /> <span>Back</span>
              </div>
            </Button>
          )}
        </div>
        {/* <h4 className="page-title font-bold text-black">Home</h4> */}
        <div className="flex items-center justify-center gap-5 pt-4">
          <Badge count={notificationCount}>
            <Button
              onClick={() => navigate(`/${route.notifications}`)}
              icon={<NotificationOutlined />}
            />
          </Badge>
          <Dropdown menu={{ items }}>
            <Avatar
              size="large"
              className="border-2 border-white"
              src={user?.imageUrl}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
