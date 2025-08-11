import { Card, Table } from 'antd';
import dayJs from 'dayjs';
import { useState } from 'react';
import CreateRoleModal from '../../components/roles/CreateRoleModal';
import { UserRole } from '../../graphql/@generated/graphql';
import { useGetRoles } from '../../hooks/useGetRoles';

export default function Roles() {
  const { data, loading, refetch } = useGetRoles();

  const [role, setRole] = useState<null | UserRole>(null);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <main className="p-6 text-left">
      <Card
        title="Roles"
        // extra={[
        //   <Button
        //     icon={<PlusOutlined />}
        //     shape="round"
        //     size="large"
        //     type="primary"
        //     className="btn btn-primary"
        //     onClick={() => setModalVisible(true)}
        //   >
        //     Add new role
        //   </Button>,
        // ]}
      >
        <Table
          size="small"
          loading={loading}
          dataSource={(data?.userRoles!.data! as Array<any>) || []}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Created',
              dataIndex: 'createdAt',
              key: 'createdAt',
              render(value) {
                return dayJs(value).format('DD MMM YYYY');
              },
            },
            // {
            //   title: 'Actions',
            //   key: 'Actions',
            //   render(value) {
            //     return (
            //       <div className="flex gap-5">
            //         <Button
            //           onClick={() => {
            //             setRole(value);
            //             setModalVisible(true);
            //           }}
            //           type="primary"
            //           className="btn btn-primary"
            //         >
            //           Edit
            //         </Button>
            //         {/* <Popconfirm
            //         title="Are you sure to delete this role?"
            //         onConfirm={() => remove(value.id)}
            //       >
            //         <Button danger className="btn btn-primary">
            //           Delete
            //         </Button>
            //       </Popconfirm> */}
            //       </div>
            //     );
            //   },
            // },
          ]}
        />
      </Card>
      <CreateRoleModal
        role={role}
        visible={modalVisible}
        onCancel={() => {
          setRole(null);
          setModalVisible(false);
        }}
        refetchRoles={refetch}
      />
    </main>
  );
}
