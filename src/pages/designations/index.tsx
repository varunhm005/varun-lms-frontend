import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CreateDesignationModal from '../../components/designations/CreateDesignatioModal';
import { Designation, useGetDesignationsQuery } from '../../graphql/@generated/graphql';

function Designations() {
  const [modalVisible, setModalVisible] = useState(false);
  const [designation, setDesignation] = useState<null | Designation>(null);

  const { data, refetch } = useGetDesignationsQuery({
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
        title="Designations"
        extra={[
          <Button
            icon={<PlusOutlined />}
            shape="round"
            type="primary"
            className="btn btn-primary"
            onClick={() => setModalVisible(true)}
          >
            Add Designation
          </Button>,
        ]}
      >
        <Table
          dataSource={(data?.designations!.data! as Array<any>) || []}
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
                        setDesignation(dep);
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
      <CreateDesignationModal
        visible={modalVisible}
        onCancel={() => {
          setDesignation(null);
          setModalVisible(false);
        }}
        designation={designation as any}
        refetchDepartments={refetch}
      />
    </main>
  );
}

export default Designations;
