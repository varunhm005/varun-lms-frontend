import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { Permissions } from '../../configs/permissions';
import { route } from '../../constants/routes';
import { Chapter, Exam } from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';

interface Props {
  exams: Exam[];
}

function CourseExams(props: Props) {
  const { exams } = props;

  const permissions = useGetUserPermissions();

  const navigate = useNavigate();

  const columns: ColumnsType<Exam> = [
    {
      title: 'Sl No',

      render(_, __, index) {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Actions',
      render(value: Chapter) {
        return (
          <div>
            <div className="flex">
              <div className="mr-4">
                <Button
                  onClick={() => {
                    navigate(`/${route.editExam(value.id)}`);
                  }}
                  shape="round"
                  size="small"
                  type="primary"
                >
                  View
                </Button>
              </div>
              <div className="mr-4">
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
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="my-5">
      <p className="mb-2 mt-4 text-base">Exams:</p>
      <Table pagination={false} columns={columns} rowKey="id" dataSource={exams} />
    </div>
  );
}

export default CourseExams;
