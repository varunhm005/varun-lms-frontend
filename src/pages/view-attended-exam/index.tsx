import { Button } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttendExamQuestion from '../../components/attend-exam/AttendExamQuestion';
import AttendExamScenario from '../../components/attend-exam/AttendExamScenario';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import {
  AttendExamStatus,
  AttendedExamAnswer,
  useGetAttendedExamDetailsQuery,
} from '../../graphql/@generated/graphql';
import { ExamQuestionsWithScenario } from '../../types/ExamQuestionsWithScenario';

function StudentAttendExam() {
  const params = useParams();
  const navigation = useNavigate();

  const slug = params?.slug as string;

  const { data, loading } = useGetAttendedExamDetailsQuery({
    variables: {
      attendedExamId: slug,
    },
  });

  const canEvaluate = useMemo(() => {
    if (
      data?.attendedExam.status &&
      [AttendExamStatus.Completed, AttendExamStatus.Failed, AttendExamStatus.Passed].includes(
        data?.attendedExam.status
      )
    ) {
      return true;
    }

    return false;
  }, [data?.attendedExam.status]);

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

  // !  if readonly is true, then the admin is viewing the exam and cannot edit answers
  const readOnly = true;

  if (loading) {
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
                        key={answer.id}
                        data={answer}
                        readonly={readOnly}
                        canEvaluate={canEvaluate}
                      />
                    ))}
                  </div>
                );
              }
              return (
                <AttendExamScenario
                  key={question.scenarioId ?? 'no-scenario'}
                  data={{ ...question }}
                  readonly={readOnly}
                  canEvaluate={canEvaluate}
                />
              );
            })}
          </div>
        </div>

        {canEvaluate && (
          <div className="pl-20">
            <Button
              onClick={() => {
                // navigation(`/${route.exams}`);
                navigation(-1);
              }}
            >
              Finish Exam Evaluation
            </Button>
            <div className="h-10" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAttendExam;
