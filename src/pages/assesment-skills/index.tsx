import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CreateAssessmentsSkillModal from '../../components/assesments/CreateAssesemntSkillModal';
import { AssessmentSkill, useGetAssessmentSkillsQuery } from '../../graphql/@generated/graphql';

function AssessmentSkills() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<null | AssessmentSkill>(null);

  const { data, loading } = useGetAssessmentSkillsQuery({});

  return (
    <main className="p-6 text-left">
      <Card
        title="Assessment Skills"
        extra={[
          <Button
            key="1"
            icon={<PlusOutlined />}
            shape="round"
            type="primary"
            className="btn btn-primary"
            onClick={() => setModalVisible(true)}
          >
            Add Assessment Skills
          </Button>,
        ]}
      >
        <Table
          loading={loading}
          dataSource={(data?.assessmentSkills! as Array<any>) || []}
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
                        setSelected(dep);
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
      <CreateAssessmentsSkillModal
        visible={modalVisible}
        onCancel={() => {
          setSelected(null);
          setModalVisible(false);
        }}
        skill={selected}
      />
    </main>
  );
}

export default AssessmentSkills;
