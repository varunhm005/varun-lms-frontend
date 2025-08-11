import { Button } from 'antd';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AttendExamQuestion from '../../components/attend-exam/AttendExamQuestion';
import AttendExamScenario from '../../components/attend-exam/AttendExamScenario';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useConfirm } from '../../context/context-hooks';
import {
  AttendExamStatus,
  AttendedExamAnswer,
  useGetAttendedExamDetailsQuery,
  useGetAttendedExamQuery,
  useUpdateAttendedExamMutation,
} from '../../graphql/@generated/graphql';
import { ExamQuestionsWithScenario } from '../../types/ExamQuestionsWithScenario';

function StudentAttendExam() {
  const location = useLocation();

  const { state } = useLocation();
  const readOnly = location.pathname === `/${route.viewExam}`;

  const slug = state?.slug as string;

  const { data: exam, loading } = useGetAttendedExamQuery({
    variables: {
      attendedExamId: slug,
    },
    skip: readOnly,
  });

  const { data: examDetails, loading: examDetailsLoading } = useGetAttendedExamDetailsQuery({
    variables: {
      attendedExamId: slug,
    },
    skip: !readOnly,
  });

  const data = useMemo(() => {
    if (readOnly) {
      return examDetails;
    }
    return exam;
  }, [exam, examDetails, readOnly]);

  const questions = useMemo(() => {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    const _answers = (data?.attendedExam.AttendedExamAnswers ??
      []) as unknown as AttendedExamAnswer[];

    const processed: ExamQuestionsWithScenario[] = [];

    _answers.forEach((answer) => {
      let noScenarioIndex = -1;

      const newAnswer = {
        ...answer,
        questionNumber: ``,
      };

      if (!answer.questionScenarioId) {
        if (noScenarioIndex === -1) {
          noScenarioIndex = processed.length;
          processed.push({
            questions: [newAnswer],
            type: 'normal',
            questionNumber: ``,
          });
        } else {
          processed[noScenarioIndex].questions.push(newAnswer);
        }
      } else {
        const scenarioIndex = processed.findIndex(
          (item) => item.scenarioId === answer.questionScenarioId
        );

        if (scenarioIndex === -1) {
          processed.push({
            scenarioId: answer.questionScenarioId,
            questions: [newAnswer],
            type: 'scenario',
            scenarioText: answer.scenarioText ?? '',
            questionNumber: ``,
          });
        } else {
          processed[scenarioIndex].questions.push(newAnswer);
        }
      }
    });

    // Add Question Number
    let questionNo = 1;
    processed.forEach((scenario) => {
      if (scenario.type === 'scenario') {
        scenario.questions.forEach((scQ, index) => {
          // eslint-disable-next-line no-param-reassign
          scQ.questionNumber = `${index + 1})`;
        });
        // eslint-disable-next-line no-param-reassign
        scenario.questionNumber = `Q${questionNo}:`;
        questionNo += 1;
      } else {
        scenario.questions.forEach((scQ) => {
          // eslint-disable-next-line no-param-reassign
          scQ.questionNumber = `Q${questionNo}:`;
          questionNo += 1;
        });
      }
    });

    return processed;
  }, [data?.attendedExam.AttendedExamAnswers]);

  const { confirm } = useConfirm();

  const [updateExam, { loading: updateExamLoading }] = useUpdateAttendedExamMutation({
    refetchQueries: [queryKeys.GetAttendedExam, queryKeys.GetAttendedExamDetails],
  });

  const updateStatus = (status: AttendExamStatus) => {
    return updateExam({
      variables: {
        updateAttendedExamInput: {
          id: `${Number(data?.attendedExam.id)}`,
          status,
        },
      },
    });
  };

  const finishExam = () => {
    confirm({
      title: 'Are you sure you want to finish the exam?',
      content: 'You will not be able to change your answers after finishing the exam.',
      okText: 'Finish',
      cancelText: 'Cancel',
      onOk: () => {
        return updateStatus(AttendExamStatus.Completed).then(() => {
          window.location.href = '/';
        });
      },
      centered: true,
      okButtonProps: {
        loading: updateExamLoading,
      },
    });
  };

  if (loading || examDetailsLoading) {
    return <FullScreenLoading />;
  }

  return (
    <div>
      <div className="p-6 text-left">
        <div className="grid grid-cols-1 gap-5  ">
          <div className="col-span-1">
            <h5 className=" text-2xl font-bold  text-black">{data?.attendedExam.name || 'Exam'}</h5>
            <p className=" text-sm font-normal text-black">
              Maximum Mark: {data?.attendedExam.totalMark ?? 0}
            </p>

            {questions.map((question) => {
              if (question.type === 'normal') {
                return (
                  <div key={question.scenarioId ?? 'no-scenario'}>
                    {question.questions.map((answer) => (
                      <AttendExamQuestion
                        canEvaluate={false}
                        key={answer.id}
                        data={answer}
                        readonly={readOnly}
                      />
                    ))}
                  </div>
                );
              }
              return (
                <AttendExamScenario
                  canEvaluate={false}
                  key={question.scenarioId ?? 'no-scenario'}
                  data={{ ...question }}
                  readonly={readOnly}
                />
              );
            })}
          </div>
        </div>
        {!readOnly && (
          <Button onClick={finishExam} shape="round" className="ml-16 mt-8" type="primary">
            Finish Exam
          </Button>
        )}
        <div className="h-10" />
      </div>
    </div>
  );
}

export default StudentAttendExam;
