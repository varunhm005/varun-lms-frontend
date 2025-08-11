import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { route } from '../../constants/routes';
import { Assessment, useGetAssessmentsQuery } from '../../graphql/@generated/graphql';
import useUrlQueries from '../../hooks/useUrlQueries';
import { formatDate, getAssessmentType } from '../../utils/utils';

function Assessments() {
  const query = useUrlQueries<{
    scheduleId: string;
  }>();

  const { data: assessments, loading: assessmentsLoading } = useGetAssessmentsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 100,
      },
      assessmentFilter: {
        courseScheduleStudentsId: query.scheduleId ? +query.scheduleId : undefined,
      },
    },
  });

  const navigate = useNavigate();

  return (
    <main className="p-6 text-left">
      <h1 className="mb-6 text-3xl font-bold">Assessments</h1>
      <Table
        size="small"
        loading={assessmentsLoading}
        dataSource={(assessments?.assessments.data ?? []) as any}
      >
        <Table.Column title="S.No" dataIndex="key" render={(_, __, i) => <div>{i + 1}</div>} />
        <Table.Column title="Id" dataIndex="id" />
        <Table.Column
          title="Date"
          render={(_, record: Assessment) => <div>{formatDate(record.date)}</div>}
        />
        <Table.Column
          title="Name"
          render={(_, record: Assessment) => <div>{record.courseScheduleStudent.user.name}</div>}
        />
        <Table.Column
          title="type"
          render={(_, record: Assessment) => {
            const types = record.type.map((type) => getAssessmentType(type)).join(', ');

            return <div>{types}</div>;
          }}
        />
        <Table.Column
          title="Attitude"
          render={(_, record: Assessment) => <div>{record.attitude}</div>}
        />
        <Table.Column
          title="Result"
          render={(_, record: Assessment) => <div>{record.result}</div>}
        />
        <Table.Column
          title="Skills"
          width="40%"
          render={(_, record: Assessment) => {
            return (
              <ul>
                {record.skillsOfAssessment.map((skill) => (
                  <li key={skill.skill.id}>{skill.skill.name}</li>
                ))}
              </ul>
            );
          }}
        />

        <Table.Column
          title="Actions"
          render={(_, record: Assessment) => {
            return (
              <div>
                <Button
                  onClick={() => {
                    const courseId = record.courseScheduleStudent.courseSchedule.coursesId;
                    navigate(`/${route.editAssessment(record.slug)}?courseId=${courseId}`);
                  }}
                  size="small"
                  type="primary"
                >
                  Edit
                </Button>
              </div>
            );
          }}
        />
      </Table>
    </main>
  );
}

export default Assessments;
