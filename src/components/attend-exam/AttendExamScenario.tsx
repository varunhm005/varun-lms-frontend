import { ExamQuestionsWithScenario } from '../../types/ExamQuestionsWithScenario';
import AttendExamQuestion from './AttendExamQuestion';

interface Props {
  data: ExamQuestionsWithScenario;
  readonly: boolean;
  canEvaluate: boolean;
}

function AttendExamScenario(props: Props) {
  const { data, readonly, canEvaluate } = props;

  return (
    <div className="mt-4 flex">
      <p className="px-3 text-right text-xl  font-normal text-black">{data.questionNumber}</p>
      <div className="border-l border-r-gray-200 px-4 ">
        <p className=" text-base font-normal leading-snug text-black">{data.scenarioText}</p>
        {data.questions.map((d) => (
          <AttendExamQuestion canEvaluate={canEvaluate} data={d} key={d.id} readonly={readonly} />
        ))}
      </div>
    </div>
  );
}

export default AttendExamScenario;
