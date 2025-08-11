import { ChapterType } from '../graphql/@generated/graphql';

export interface ChapterFormInput {
  name: string;
  chapterType: ChapterType;
  questions: Question[];
  chapterLink?: string;
  keyLearning?: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
  weighage: string;
  id?: string;
}
