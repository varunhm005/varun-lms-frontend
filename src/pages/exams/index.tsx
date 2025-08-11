import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Permissions } from '../../configs/permissions';
import { route } from '../../constants/routes';
import { Exam, useGetExamsQuery } from '../../graphql/@generated/graphql';
import { useGetProfile, useGetUserPermissions, useGetUserRoleName } from '../../hooks/auth-hook';

export default function Exams() {
  const role = useGetUserRoleName();

  const profile = useGetProfile();

  const { data, loading } = useGetExamsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
      examFilter: {
        instructorId: role === 'Faculty' ? Number(profile?.id) : undefined,
      },
    },
  });

  const navigate = useNavigate();

  const permissions = useGetUserPermissions();

  return (
    <main className="p-6 text-left">
      <Card title="Exams">
        <Table
          size="small"
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Course',
              dataIndex: 'cource',
              key: 'cource',
              render: (value: Exam) => {
                return <span>{value?.name}</span>;
              },
            },
            {
              title: 'Maximum Mark',
              dataIndex: 'maximumMark',
              key: 'maximumMark',
            },
            {
              title: 'Pass Mark',
              dataIndex: 'passMark',
              key: 'passMark',
            },
            {
              title: 'Action',
              key: 'action',
              render: (_, value) => {
                return (
                  <div className="flex items-center gap-5">
                    <Button
                      onClick={() => {
                        navigate(`/${route.editExam(value.id)}`);
                      }}
                      shape="round"
                      type="primary"
                      className="btn btn-primary"
                      size="small"
                    >
                      Edit
                    </Button>
                    {permissions.includes(Permissions.MANAGE_ATTENDED_EXAM) && (
                      <Button
                        onClick={() => {
                          navigate(`/${route.attendedExams}?examId=${value.id}`);
                        }}
                        shape="round"
                        type="default"
                        size="small"
                      >
                        Attended Exams
                      </Button>
                    )}
                  </div>
                );
              },
            },
          ]}
          dataSource={(data?.exams.data! as Array<any>) || []}
          loading={loading}
        />
      </Card>
    </main>
  );
}
