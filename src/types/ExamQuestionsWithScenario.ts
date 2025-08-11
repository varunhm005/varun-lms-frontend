import { AttendedExamAnswer } from '../graphql/@generated/graphql';

export type ExamQuestionsWithScenarioQuestion = AttendedExamAnswer & {
  questionNumber: string;
};
export interface ExamQuestionsWithScenario {
  questions: ExamQuestionsWithScenarioQuestion[];
  type: 'scenario' | 'normal';
  scenarioId?: number;
  scenarioText?: string;
  questionNumber: string;
}
