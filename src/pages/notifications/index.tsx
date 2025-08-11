import { BellOutlined } from '@ant-design/icons';
import { Avatar, Card, List } from 'antd';
import { Link } from 'react-router-dom';
import { configs } from '../../configs/configs';
import { queryKeys } from '../../constants/query-keys';
import { urlQueryKeys } from '../../constants/url-query-keys';
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '../../graphql/@generated/graphql';
import { useGetProfile } from '../../hooks/auth-hook';
import { useParsedUrlQuery, useUrlQueryParam } from '../../hooks/useUrlQueries';

function Notifications() {
  const profile = useGetProfile();

  const { page, size } = useParsedUrlQuery<{
    page: string;
    size: string;
  }>();

  const [markAsReadMutation] = useMarkNotificationAsReadMutation({
    refetchQueries: [queryKeys.GetUnreadNotificationCount],
  });

  const notifications = useGetNotificationsQuery({
    variables: {
      filter: {
        receiverId: profile!.id,
      },
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
      },
    },
    fetchPolicy: 'network-only',

    onCompleted() {
      markAsReadMutation();
    },
  });

  const { setQueryParams: updateQueryParams } = useUrlQueryParam();

  return (
    <div className="max-w-3xl p-6 text-left">
      <Card title="Notifications" loading={notifications.loading}>
        <List
          dataSource={notifications.data?.notifications?.data ?? []}
          pagination={{
            pageSize: notifications.data?.notifications?.paging.totalItems,
            total: notifications.data?.notifications?.paging.totalItems,
            current: notifications.data?.notifications?.paging.currentPage,
            onChange: (_page, _size) => {
              updateQueryParams({
                [urlQueryKeys.page]: _page,
                [urlQueryKeys.size]: _size,
              });
            },
          }}
          renderItem={(item) => (
            <List.Item key={item?.title}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className={!item?.read ? '!bg-green-500' : ''}
                    size="large"
                    icon={<BellOutlined />}
                  />
                }
                title={item?.title}
                description={item?.message}
              />
              <div>
                <Link to={`/${item?.path}`}>View</Link>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Notifications;
