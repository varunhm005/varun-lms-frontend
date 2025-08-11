import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import TextTruncate from 'react-text-truncate';
import { QuestionScenario, useGetQuestionScenariosQuery } from '../../graphql/@generated/graphql';
import AddScenarioModal from '../create-exam/AddScenarioModal';

interface Props {
  levelId: number;
}

function CourseExamScenarios(props: Props) {
  const { levelId } = props;

  const { data: scenarios, loading: scenarioLoading } = useGetQuestionScenariosQuery({
    variables: {
      filter: {
        levelId,
      },
    },
  });

  const [scenario, setScenario] = useState<QuestionScenario | null>(null);

  const columns: ColumnsType<QuestionScenario> = [
    {
      title: 'Sl No',

      render(_, __, index) {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'name',
    },
    {
      title: 'Scenario',
      dataIndex: 'scenario',
      width: '40%',
      render(value: string) {
        return <TextTruncate line={2} element="span" truncateText="…" text={value} />;
      },
    },

    {
      title: 'Actions',
      render(_, value) {
        return (
          <div>
            <div className="flex">
              <div className="mr-4">
                <Button
                  onClick={() => {
                    setScenario(value);
                  }}
                  size="small"
                  type="primary"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="my-5">
      <p className="mb-2 mt-4 text-base">Scenarios:</p>
      <Table
        loading={scenarioLoading}
        pagination={false}
        columns={columns as any}
        rowKey="id"
        dataSource={(scenarios?.questionScenarios as any) ?? []}
      />
      <AddScenarioModal
        scenario={scenario}
        onClose={() => {
          setScenario(null);
        }}
        visible={Boolean(scenario)}
        level={scenario?.levelId ? String(scenario.levelId) : ''}
      />
    </div>
  );
}

export default CourseExamScenarios;
