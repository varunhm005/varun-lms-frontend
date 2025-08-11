import { UploadFile } from 'antd';
import { CreateQuestionInput } from '../graphql/@generated/graphql';

export interface QuestionInput extends CreateQuestionInput {
  attachment?: UploadFile<any>[];
}

export type CreateExamFormInputs = {
  Questions?: QuestionInput[];
  achivedMark?: number;
  levelId: number;
  maximumMark?: number;
  name: string;
  passMark?: number;
};
