import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CreateDepartmentModal from '../../components/departments/CreateDepartmentModal';
import { Department, useGetDepartmentsQuery } from '../../graphql/@generated/graphql';

function Departments() {
  const [modalVisible, setModalVisible] = useState(false);
  const [department, setDepartment] = useState<null | Department>(null);

  const { data, refetch } = useGetDepartmentsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });

  return (
    <main className="p-6 text-left">
      <Card
        title="Departments"
        extra={[
          <Button
            icon={<PlusOutlined />}
            shape="round"
            type="primary"
            className="btn btn-primary"
            onClick={() => setModalVisible(true)}
          >
            Add Department
          </Button>,
        ]}
      >
        <Table
          dataSource={(data?.departments!.data! as Array<any>) || []}
          pagination={false}
          size="small"
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
                return dayjs(value).format('DD MMM YYYY');
              },
            },
            {
              title: 'Action',
              key: 'action',
              render(_, dep) {
                return (
                  <div className="flex items-center">
                    <Button
                      onClick={() => {
                        setDepartment(dep);
                        setModalVisible(true);
                      }}
                      type="link"
                    >
                      Edit
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </Card>
      <CreateDepartmentModal
        visible={modalVisible}
        onCancel={() => {
          setDepartment(null);
          setModalVisible(false);
        }}
        department={department}
        refetchDepartments={refetch}
      />
    </main>
  );
}

export default Departments;
