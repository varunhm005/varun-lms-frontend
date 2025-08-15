// THIS IS A GENERATED FILE, use `npm run graphql:codegen` to regenerate
/* eslint-disable */
/* @ts-ignore */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  JSON: { input: any; output: any };
};

export enum AnswerStatus {
  Answered = 'ANSWERED',
  CorrectAnswer = 'CORRECT_ANSWER',
  NotAnswered = 'NOT_ANSWERED',
  Reviewed = 'REVIEWED',
  WaitingForReview = 'WAITING_FOR_REVIEW',
  WrongAnswer = 'WRONG_ANSWER',
}

export enum AnswerType {
  Descriptive = 'Descriptive',
  Mcq = 'MCQ',
}

export type Assessment = {
  __typename?: 'Assessment';
  assementAction?: Maybe<Scalars['String']['output']>;
  assessValidity?: Maybe<Scalars['Int']['output']>;
  attitude: Scalars['String']['output'];
  courseScheduleStudent: ScheduleStudent;
  courseScheduleStudentsId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nextAssessment?: Maybe<Scalars['Date']['output']>;
  result: Scalars['String']['output'];
  skillsOfAssessment: Array<SkillsOfAssement>;
  slug: Scalars['String']['output'];
  type: Array<AssessmentType>;
  updatedAt: Scalars['Date']['output'];
  validUpTo?: Maybe<Scalars['Date']['output']>;
};

export type AssessmentFilter = {
  courseScheduleStudentsId?: InputMaybe<Scalars['Int']['input']>;
};

export type AssessmentSkill = {
  __typename?: 'AssessmentSkill';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum AssessmentType {
  Certificate = 'CERTIFICATE',
  Hr = 'HR',
  TrainingRecord = 'TRAINING_RECORD',
}

export enum AttendExamStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  NotAttended = 'NOT_ATTENDED',
  NotStarted = 'NOT_STARTED',
  Onprogress = 'ONPROGRESS',
  Passed = 'PASSED',
  RetakeRejected = 'RETAKE_REJECTED',
  RetakeRequested = 'RETAKE_REQUESTED',
  RetakeScheduled = 'RETAKE_SCHEDULED',
  RetakeTaken = 'RETAKE_TAKEN',
}

export type Attendance = Common & {
  __typename?: 'Attendance';
  courseLevelId?: Maybe<Scalars['Int']['output']>;
  courseScheduleId?: Maybe<Scalars['Int']['output']>;
  courseScheduleStudentsId?: Maybe<Scalars['Int']['output']>;
  coursesId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  students?: Maybe<Array<Maybe<AttendanceStudent>>>;
  type: AttendanceType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updaterId?: Maybe<Scalars['Int']['output']>;
};

export type AttendanceReportFilter = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AttendanceStatus>;
  studentId?: InputMaybe<Scalars['Int']['input']>;
};

export type AttendanceSheetResponse = {
  __typename?: 'AttendanceSheetResponse';
  url?: Maybe<Scalars['String']['output']>;
};

export enum AttendanceStatus {
  Absent = 'ABSENT',
  Excused = 'EXCUSED',
  Late = 'LATE',
  NotTaken = 'NOT_TAKEN',
  Present = 'PRESENT',
}

export type AttendanceStudent = {
  __typename?: 'AttendanceStudent';
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  status: AttendanceStatus;
  updatedAt: Scalars['Date']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export enum AttendanceType {
  Absent = 'ABSENT',
  Excused = 'EXCUSED',
  Late = 'LATE',
  NotTaken = 'NOT_TAKEN',
  Present = 'PRESENT',
}

export type AttendedActivity = {
  __typename?: 'AttendedActivity';
  achivedMark?: Maybe<Scalars['Int']['output']>;
  activityAnswers: Array<Maybe<AttendedActivityAnswer>>;
  chaptersId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  maxMark?: Maybe<Scalars['Int']['output']>;
  scheduleProgress: ScheduleProgress;
  scheduleProgressId: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  status: ExamStatus;
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type AttendedActivityAnswer = {
  __typename?: 'AttendedActivityAnswer';
  answer: Scalars['String']['output'];
  answerStatus: AnswerStatus;
  attendedActivity: AttendedActivity;
  attendedActivityId: Scalars['Int']['output'];
  chapter: Chapter;
  chapterId: Scalars['Int']['output'];
  correctAnswer?: Maybe<Scalars['String']['output']>;
  correctAnswerMark?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  question: Question;
  questionId: Scalars['Int']['output'];
  questionText: Scalars['String']['output'];
  selectedAnswerMark?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AttendedExam = {
  __typename?: 'AttendedExam';
  AttendedExamAnswers: Array<AttendedExamAnswer>;
  achivedMark?: Maybe<Scalars['Int']['output']>;
  courseScheduleStudentsId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  exam: Exam;
  examAttended: Scalars['Boolean']['output'];
  examsId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  status: AttendExamStatus;
  totalMark?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Date']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type AttendedExamAnswer = {
  __typename?: 'AttendedExamAnswer';
  answer: Scalars['String']['output'];
  answerStatus: AnswerStatus;
  answerType: AnswerType;
  answersOptions: Array<Scalars['String']['output']>;
  correctAnswer?: Maybe<Scalars['String']['output']>;
  correctAnswerMark?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['Int']['output']>;
  mediaUrl?: Maybe<Scalars['String']['output']>;
  orderNo?: Maybe<Scalars['Int']['output']>;
  questionScenarioId?: Maybe<Scalars['Int']['output']>;
  questionText: Scalars['String']['output'];
  remarks?: Maybe<Scalars['String']['output']>;
  scenarioText?: Maybe<Scalars['String']['output']>;
  selectedAnswerMark?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type BulkUpdateAttendedExamInput = {
  achivedMark: Scalars['Int']['input'];
  examAttended: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  passMark: Scalars['Int']['input'];
};

export type BulkUserInput = {
  department?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  idNumber: Scalars['String']['input'];
  institution?: InputMaybe<Scalars['String']['input']>;
  lineManagerEmplyeeID?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: UserRols;
  type?: InputMaybe<EmployeeType>;
};

export type BulkUserInputResponse = {
  __typename?: 'BulkUserInputResponse';
  department?: Maybe<Scalars['String']['output']>;
  designation?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  idNumber?: Maybe<Scalars['String']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  lineManagerEmplyeeID?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status?: Maybe<BulkUserStatus>;
  type?: Maybe<EmployeeType>;
};

export enum BulkUserStatus {
  Failed = 'FAILED',
  Success = 'SUCCESS',
}

export type Certificate = {
  __typename?: 'Certificate';
  CertificateSignatures?: Maybe<Array<Maybe<CertificateSignature>>>;
  attendedExamId?: Maybe<Scalars['Int']['output']>;
  batchNumber: Scalars['String']['output'];
  certificateType: CertificateType;
  certificateUrl?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  courseSchedule?: Maybe<CourseSchedule>;
  courseScheduleId?: Maybe<Scalars['Int']['output']>;
  courses?: Maybe<Course>;
  coursesId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  sealTitle?: Maybe<Scalars['String']['output']>;
  sealUrl?: Maybe<Scalars['String']['output']>;
  signatures?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  slug: Scalars['String']['output'];
  student?: Maybe<ScheduleStudent>;
  studentId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CertificateFilters = {
  instructorId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CertificateSignature = {
  __typename?: 'CertificateSignature';
  certificate: Certificate;
  certificatesId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  designation: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  signatureUrl: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export enum CertificateType {
  Completed = 'COMPLETED',
  Pass = 'PASS',
}

export type Chapter = {
  __typename?: 'Chapter';
  Media?: Maybe<Array<Maybe<Media>>>;
  Questions?: Maybe<Array<Maybe<Question>>>;
  chapterType?: Maybe<ChapterType>;
  courses?: Maybe<Course>;
  coursesId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  keyLearning?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export enum ChapterType {
  Document = 'DOCUMENT',
  LiveClass = 'LIVE_CLASS',
  Video = 'VIDEO',
}

export enum ColumnType {
  Date = 'date',
  DateString = 'dateString',
  Html = 'html',
  Number = 'number',
  String = 'string',
}

export type Common = {
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']['output']>;
};

export type Company = {
  __typename?: 'Company';
  createdAt: Scalars['Date']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  Chapters?: Maybe<Array<Maybe<Chapter>>>;
  CourseFeedback?: Maybe<Array<Maybe<CourseFeedback>>>;
  Summary?: Maybe<Scalars['String']['output']>;
  caaApprovalNo?: Maybe<Scalars['String']['output']>;
  certificateType: CourseCertificateType;
  classLink?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  courseAssessmentSkills: Array<Maybe<CourseAssessmentSkill>>;
  courseCategory?: Maybe<CourseCategory>;
  courseCategoryId?: Maybe<Scalars['Int']['output']>;
  courseStatus: CourseStatus;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  endDate?: Maybe<Scalars['Date']['output']>;
  examRequired: Scalars['Boolean']['output'];
  exams?: Maybe<Array<Maybe<Exam>>>;
  expireIn?: Maybe<Scalars['Int']['output']>;
  functionName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  instructor?: Maybe<User>;
  instructorId?: Maybe<Scalars['Int']['output']>;
  levels: Array<Maybe<CourseLevel>>;
  maxStudentsAllowed?: Maybe<Scalars['Int']['output']>;
  median: CourseMedian;
  mediumOfExam?: Maybe<ExamMedium>;
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
  resources?: Maybe<Array<Maybe<CourseResource>>>;
  schedules: Array<Maybe<CourseSchedule>>;
  slug: Scalars['String']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  type: CourseType;
  updatedAt: Scalars['String']['output'];
};

export type CourseAssessmentSkill = {
  __typename?: 'CourseAssessmentSkill';
  assessmentSkill: AssessmentSkill;
  assessmentSkillsId: Scalars['Int']['output'];
  course: Course;
  courseId: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CourseCategory = {
  __typename?: 'CourseCategory';
  company: Company;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']['output']>;
  deleted: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  updater?: Maybe<User>;
  updaterId?: Maybe<Scalars['Int']['output']>;
};

export enum CourseCertificateType {
  Dgr = 'DGR',
  Normal = 'Normal',
}

export type CourseEvaluation = {
  __typename?: 'CourseEvaluation';
  course: Course;
  courseLevel: CourseLevel;
  courseLevelId: Scalars['Int']['output'];
  courseScheduleStudentsId: Scalars['Int']['output'];
  coursesId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  language?: Maybe<Language>;
  questions: Array<FormattedCourseEvaluationQuestions>;
  remarks?: Maybe<Scalars['String']['output']>;
  scheduleStudent: ScheduleStudent;
  slug: Scalars['String']['output'];
  student: User;
  updatedAt: Scalars['Date']['output'];
};

export type CourseEvaluationFilter = {
  courseLevelId?: InputMaybe<Array<Scalars['Int']['input']>>;
  coursesId?: InputMaybe<Array<Scalars['Int']['input']>>;
  studentId?: InputMaybe<Scalars['Int']['input']>;
};

export type CourseEvaluationQuestions = {
  __typename?: 'CourseEvaluationQuestions';
  answer?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  questions: Array<MultiLanguageQuestions>;
  slug: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CourseEvaluationUpdateQuestionsInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

export type CourseFeedback = {
  __typename?: 'CourseFeedback';
  course: Course;
  coursesId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  feedback: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  ownerId: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CourseFilter = {
  courseCategoryId?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  instructorId?: InputMaybe<Scalars['Int']['input']>;
  median?: InputMaybe<Array<InputMaybe<CourseMedian>>>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<CourseType>>>;
};

export type CourseLevel = {
  __typename?: 'CourseLevel';
  chapters: Array<Maybe<Chapter>>;
  course?: Maybe<Course>;
  courseSchedule?: Maybe<Array<Maybe<CourseSchedule>>>;
  coursesId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  exams: Array<Maybe<Exam>>;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  resources?: Maybe<Array<Maybe<CourseResource>>>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export enum CourseMedian {
  Offline = 'Offline',
  Online = 'Online',
  Recorded = 'Recorded',
}

export enum CourseProgressStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
}

export type CourseResource = {
  __typename?: 'CourseResource';
  chapters?: Maybe<Chapter>;
  chaptersId?: Maybe<Scalars['Int']['output']>;
  courseLevelId?: Maybe<Scalars['Int']['output']>;
  courses: Course;
  coursesId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  memeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type CourseSchedule = {
  __typename?: 'CourseSchedule';
  attendanceProof?: Maybe<Scalars['String']['output']>;
  attendanceProofCreatedOn?: Maybe<Scalars['Date']['output']>;
  attendanceSheet?: Maybe<Scalars['String']['output']>;
  course?: Maybe<Course>;
  courseLevel?: Maybe<CourseLevel>;
  courseLevelId?: Maybe<Scalars['ID']['output']>;
  coursesId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Date']['output'];
  days: Array<Scalars['String']['output']>;
  deleted: Scalars['Boolean']['output'];
  endDate?: Maybe<Scalars['Date']['output']>;
  endTime?: Maybe<Scalars['Date']['output']>;
  examId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  startTime?: Maybe<Scalars['Date']['output']>;
  students?: Maybe<Array<Maybe<ScheduleStudent>>>;
  updatedAt: Scalars['Date']['output'];
};

export type CourseScheduleFilter = {
  courseId?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type CourseScheduleResponse = {
  __typename?: 'CourseScheduleResponse';
  data: Array<Maybe<CourseSchedule>>;
  paging: PagingData;
};

export enum CourseStatus {
  Completed = 'COMPLETED',
  PartiallyCompleted = 'PARTIALLY_COMPLETED',
  Pending = 'PENDING',
}

export enum CourseType {
  Emergency = 'Emergency',
  Initial = 'Initial',
  Recurrent = 'Recurrent',
}

export type CreateAssessmentInput = {
  assementAction?: InputMaybe<Scalars['String']['input']>;
  attitude: Scalars['String']['input'];
  courseScheduleStudentsId: Scalars['Int']['input'];
  date: Scalars['Date']['input'];
  result: Scalars['String']['input'];
  skillsOfAssement?: InputMaybe<Array<InputMaybe<CreateSkillsOfAssement>>>;
  type: Array<AssessmentType>;
  validUpTo?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateAssessmentSkillInput = {
  name: Scalars['String']['input'];
};

export type CreateAttendanceInput = {
  courseScheduleId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAttendanceStudentInput = {
  exampleField?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateAttendedActivityAnswerInput = {
  answer: Scalars['String']['input'];
  questionId: Scalars['Int']['input'];
};

export type CreateAttendedActivityInput = {
  ActivityAnswers?: InputMaybe<Array<InputMaybe<CreateAttendedActivityAnswerInput>>>;
  achivedMark?: InputMaybe<Scalars['Int']['input']>;
  chapterId: Scalars['Int']['input'];
  maxMark?: InputMaybe<Scalars['Int']['input']>;
  progressId: Scalars['Int']['input'];
};

export type CreateAttendedExamAnswerInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  attendedExamId?: InputMaybe<Scalars['Int']['input']>;
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  correctAnswerMark?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['Int']['input']>;
  selectedAnswerMark?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateAttendedExamInput = {
  scheduleStudentId: Scalars['Int']['input'];
};

export type CreateCertificateInput = {
  CertificateSignatures?: InputMaybe<Array<InputMaybe<CreateCertificateSignatureInput>>>;
  attendedExamId?: InputMaybe<Scalars['Int']['input']>;
  batchNumber: Scalars['String']['input'];
  certificateType: CertificateType;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  courseScheduleId?: InputMaybe<Scalars['Int']['input']>;
  coursesId?: InputMaybe<Scalars['Int']['input']>;
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  sealTitle?: InputMaybe<Scalars['String']['input']>;
  sealUrl?: InputMaybe<Scalars['String']['input']>;
  signatures?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  studentId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCertificateSignatureInput = {
  certificatesId?: InputMaybe<Scalars['Int']['input']>;
  designation: Scalars['String']['input'];
  name: Scalars['String']['input'];
  signatureUrl: Scalars['String']['input'];
};

export type CreateChapterInput = {
  chapterType: ChapterType;
  keyLearning?: InputMaybe<Scalars['String']['input']>;
  levelId?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  questions?: InputMaybe<Array<InputMaybe<CreateQuestionInput>>>;
};

export type CreateCompanyInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCourseCategoryInput = {
  companyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateCourseEvaluationInput = {
  scheduleStudentId: Scalars['Int']['input'];
};

export type CreateCourseFeedbackInput = {
  coursesId: Scalars['Int']['input'];
  feedback: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};

export type CreateCourseInput = {
  Summary?: InputMaybe<Scalars['String']['input']>;
  assessmentSkills?: InputMaybe<Array<Scalars['Int']['input']>>;
  caaApprovalNo?: InputMaybe<Scalars['String']['input']>;
  certificateType?: InputMaybe<CourseCertificateType>;
  classLink?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  companyId: Scalars['Int']['input'];
  courseCategoryId: Scalars['Int']['input'];
  courseStatus: CourseStatus;
  endDate?: InputMaybe<Scalars['String']['input']>;
  examRequired: Scalars['Boolean']['input'];
  expireIn?: InputMaybe<Scalars['Int']['input']>;
  functionName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  instructorId: Scalars['Int']['input'];
  maxStudentsAllowed?: InputMaybe<Scalars['Int']['input']>;
  median: CourseMedian;
  mediumOfExam?: InputMaybe<ExamMedium>;
  name: Scalars['String']['input'];
  price: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
  type: CourseType;
};

export type CreateCourseLevelInput = {
  courseId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type CreateCourseResourceInput = {
  chaptersId?: InputMaybe<Scalars['Int']['input']>;
  courseLevelId?: InputMaybe<Scalars['Int']['input']>;
  coursesId: Scalars['Int']['input'];
  memeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateCourseScheduleInput = {
  days?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  endTime?: InputMaybe<Scalars['Date']['input']>;
  examId?: InputMaybe<Scalars['Int']['input']>;
  isLocked?: InputMaybe<Scalars['Boolean']['input']>;
  levelId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
  startTime?: InputMaybe<Scalars['Date']['input']>;
  students: Array<Scalars['ID']['input']>;
  designationIds?: Array<Scalars['Int']['input']>;
};

export type CreateDepartmentInput = {
  companyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateDesignationInput = {
  companyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateExamInput = {
  Questions?: InputMaybe<Array<InputMaybe<CreateQuestionInput>>>;
  achivedMark?: InputMaybe<Scalars['Int']['input']>;
  levelId: Scalars['Int']['input'];
  maximumMark?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  passMark?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ExamMedium>;
};

export type CreateMediaInput = {
  chaptersId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationInput = {
  chanel?: InputMaybe<NotificationChanel>;
  contextId?: InputMaybe<Scalars['Int']['input']>;
  contextType?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  read: Scalars['Boolean']['input'];
  receiverId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateOfflineExamInput = {
  courseScheduleId: Scalars['Int']['input'];
};

export type CreateOrUpdateCertificateSignatureInput = {
  designation?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  signatureUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrUpdateQuestionInput = {
  FailPromt?: InputMaybe<Scalars['String']['input']>;
  answer?: InputMaybe<Scalars['String']['input']>;
  answerType?: InputMaybe<AnswerType>;
  answersOptions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chaptersId?: InputMaybe<Scalars['Int']['input']>;
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  mark?: InputMaybe<Scalars['Int']['input']>;
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  scenarioId?: InputMaybe<Scalars['Int']['input']>;
  successPromt?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePermissionInput = {
  name: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateQuestionInput = {
  FailPromt?: InputMaybe<Scalars['String']['input']>;
  answer?: InputMaybe<Scalars['String']['input']>;
  answerType?: InputMaybe<AnswerType>;
  answersOptions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chaptersId?: InputMaybe<Scalars['Int']['input']>;
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  mark?: InputMaybe<Scalars['Int']['input']>;
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  orderNo?: InputMaybe<Scalars['Int']['input']>;
  question: Scalars['String']['input'];
  scenarioId?: InputMaybe<Scalars['Int']['input']>;
  successPromt?: InputMaybe<Scalars['String']['input']>;
};

export type CreateQuestionScenarioInput = {
  Questions?: InputMaybe<Array<InputMaybe<CreateQuestionInput>>>;
  levelId: Scalars['Int']['input'];
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  scenario: Scalars['String']['input'];
};

export type CreateRequestInput = {
  context?: InputMaybe<ReqContext>;
  contextId?: InputMaybe<Scalars['Int']['input']>;
  courseId?: InputMaybe<Scalars['Int']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
  type: RequestType;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateRolePermissionInput = {
  permissionsId?: InputMaybe<Scalars['Int']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateScheduleProgressInput = {
  assessmentStatus: CourseProgressStatus;
  courseId: Scalars['Int']['input'];
  courseLevelId: Scalars['Int']['input'];
  scheduleId: Scalars['Int']['input'];
  status: CourseProgressStatus;
  userId: Scalars['Int']['input'];
};

export type CreateScheduleStudentInput = {
  courseScheduleId: Scalars['Int']['input'];
  recommendedBy?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateSkillsOfAssement = {
  applicable: Scalars['Boolean']['input'];
  assessmentSkillsId: Scalars['Int']['input'];
  proLevel?: InputMaybe<Scalars['String']['input']>;
  validUpTo?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateUploadSignedUrlInput = {
  fileName: Scalars['String']['input'];
  fileType: Scalars['String']['input'];
};

export type CreateUserInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  designationId?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  idNumber: Scalars['String']['input'];
  idUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  institution?: InputMaybe<Scalars['String']['input']>;
  lineManagerId?: InputMaybe<Scalars['Int']['input']>;
  managerId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  passportUrl?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  passwordUrl?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
  roleId: Scalars['Int']['input'];
  signature?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<EmployeeType>;
};

export type CreateUserRoleInput = {
  companyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Department = {
  __typename?: 'Department';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Designation = {
  __typename?: 'Designation';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum EmployeeStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Resigned = 'RESIGNED',
  Suspended = 'SUSPENDED',
}

export enum EmployeeType {
  InHouse = 'InHouse',
  OutSource = 'OutSource',
}

export type Exam = {
  __typename?: 'Exam';
  Questions?: Maybe<Array<Maybe<Question>>>;
  achivedMark?: Maybe<Scalars['Int']['output']>;
  cource: Course;
  courseLevelId?: Maybe<Scalars['ID']['output']>;
  coursesId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  maximumMark?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  passMark?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  type?: Maybe<ExamMedium>;
  updatedAt: Scalars['String']['output'];
};

export type ExamFilter = {
  instructorId?: InputMaybe<Scalars['Int']['input']>;
};

export enum ExamMedium {
  Offline = 'OFFLINE',
  Online = 'ONLINE',
}

export enum ExamStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  NotAttended = 'NOT_ATTENDED',
  NotStarted = 'NOT_STARTED',
  Onprogress = 'ONPROGRESS',
  Passed = 'PASSED',
}

export type Filter = {
  __typename?: 'Filter';
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  optionType?: Maybe<OptionType>;
  options: Array<Maybe<FilterSelectOption>>;
  rules?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  type: ReportFilterType;
};

export type FilterSelectOption = {
  __typename?: 'FilterSelectOption';
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type FindAttendanceInput = {
  courseLevelId?: InputMaybe<Scalars['Int']['input']>;
  courseScheduleId?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  studentsIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  type?: InputMaybe<AttendanceType>;
};

export type FindRequestInput = {
  courseId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<RequestStatus>;
  type?: InputMaybe<RequestType>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type FirebaseLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type FirebaseLoginResponse = {
  __typename?: 'FirebaseLoginResponse';
  expiresIn?: Maybe<Scalars['String']['output']>;
  idToken?: Maybe<Scalars['String']['output']>;
  localId?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type FormattedCourseEvaluationQuestions = {
  __typename?: 'FormattedCourseEvaluationQuestions';
  category: Scalars['String']['output'];
  questions: Array<CourseEvaluationQuestions>;
};

export type GetAttendanceSheetInput = {
  id: Scalars['Int']['input'];
};

export type GetAttendedActivityInput = {
  chapterId: Scalars['Int']['input'];
  scheduleProgressId: Scalars['Int']['input'];
};

export type GetAttendedExamFilter = {
  examsId?: InputMaybe<Scalars['Int']['input']>;
  scheduleStudentId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<AttendExamStatus>;
};

export type GetMyStudentSchedulesInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type GetScheduleStudentInput = {
  courseLevelId?: InputMaybe<Scalars['Int']['input']>;
  courseScheduleId?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ScheduleStudentStatus>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export enum Language {
  Ar = 'ar',
  En = 'en',
}

export type MakePublicResponse = {
  __typename?: 'MakePublicResponse';
  url: Scalars['String']['output'];
};

export type Media = {
  __typename?: 'Media';
  chapter: Chapter;
  chaptersId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
};

export type MultiLanguageQuestions = {
  __typename?: 'MultiLanguageQuestions';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  language: Language;
  options: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  questionType: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkInsertUser: Array<BulkUserInputResponse>;
  bulkUpdateAttendedExam?: Maybe<Array<Maybe<AttendedExam>>>;
  createAssessment: Assessment;
  createAssessmentSkill: AssessmentSkill;
  createAttendance: Attendance;
  createAttendanceStudent: AttendanceStudent;
  createAttendedActivity: AttendedActivity;
  createAttendedActivityAnswer: AttendedActivityAnswer;
  createAttendedExam: AttendedExam;
  createCertificate: Certificate;
  createCertificateSignature: CertificateSignature;
  createChapter: Chapter;
  createCompany: Company;
  createCourse: Course;
  createCourseCategory: CourseCategory;
  createCourseEvaluation: CourseEvaluation;
  createCourseFeedback: CourseFeedback;
  createCourseLevel: CourseLevel;
  createCourseResource: CourseResource;
  createCourseSchedule: CourseSchedule;
  createDepartment: Department;
  createDesignation: Designation;
  createExam: Exam;
  createMedia: Media;
  createNotification: Notification;
  createPermission: Permission;
  createQuestion: Question;
  createQuestionScenario: QuestionScenario;
  createRequest: Request;
  createRolePermission: RolePermission;
  createScheduleProgress: ScheduleProgress;
  createScheduleStudent: ScheduleStudent;
  createUploadSignedUrl: UploadSignedUrlResponse;
  createUser: User;
  createUserRole: UserRole;
  creteOrUpdateOfflineExam: Array<Maybe<AttendedExam>>;
  getAttendanceSheet?: Maybe<AttendanceSheetResponse>;
  loginWithEmailAndPassword?: Maybe<FirebaseLoginResponse>;
  makeFilePublic: MakePublicResponse;
  markNotificationAsRead?: Maybe<MessageResponse>;
  removeAssessment?: Maybe<Assessment>;
  removeAssessmentSkill?: Maybe<AssessmentSkill>;
  removeAttendance?: Maybe<Attendance>;
  removeAttendanceStudent?: Maybe<AttendanceStudent>;
  removeAttendedActivityAnswer?: Maybe<AttendedActivityAnswer>;
  removeAttendedExam?: Maybe<AttendedExam>;
  removeCertificate?: Maybe<Certificate>;
  removeCertificateSignature?: Maybe<CertificateSignature>;
  removeChapter: MessageResponse;
  removeCompany?: Maybe<Company>;
  removeCourse?: Maybe<Course>;
  removeCourseCategory?: Maybe<CourseCategory>;
  removeCourseEvaluation?: Maybe<CourseEvaluation>;
  removeCourseFeedback?: Maybe<CourseFeedback>;
  removeCourseLevel?: Maybe<CourseLevel>;
  removeCourseResource?: Maybe<CourseResource>;
  removeCourseSchedule?: Maybe<CourseSchedule>;
  removeDepartment?: Maybe<Department>;
  removeDesignation?: Maybe<Designation>;
  removeExam?: Maybe<Exam>;
  removeMedia?: Maybe<Media>;
  removePermission?: Maybe<Permission>;
  removeQuestion?: Maybe<Question>;
  removeQuestionScenario?: Maybe<QuestionScenario>;
  removeRequest?: Maybe<Request>;
  removeRolePermission?: Maybe<RolePermission>;
  removeScheduleProgress?: Maybe<ScheduleProgress>;
  removeScheduleStudent?: Maybe<ScheduleStudent>;
  removeUser?: Maybe<User>;
  removeUserRole?: Maybe<UserRole>;
  requestCertificate?: Maybe<MessageResponse>;
  sendCertificate?: Maybe<MessageResponse>;
  updateAssessment: Assessment;
  updateAssessmentSkill: AssessmentSkill;
  updateAttendance: Attendance;
  updateAttendanceStudent: AttendanceStudent;
  updateAttendedActivityAnswer: AttendedActivityAnswer;
  updateAttendedExam: AttendedExam;
  updateAttendedExamAnswer: AttendedExamAnswer;
  updateCertificate: Certificate;
  updateCertificateSignature: CertificateSignature;
  updateChapter: Chapter;
  updateCompany: Company;
  updateCourse: Course;
  updateCourseCategory: CourseCategory;
  updateCourseEvaluation: CourseEvaluation;
  updateCourseFeedback: CourseFeedback;
  updateCourseLevel: CourseLevel;
  updateCourseResource: CourseResource;
  updateCourseSchedule: CourseSchedule;
  updateDepartment: Department;
  updateDesignation: Designation;
  updateExam: Exam;
  updateMedia: Media;
  updatePassword: User;
  updatePermission: Permission;
  updateQuestion: Question;
  updateQuestionScenario: QuestionScenario;
  updateRequest: Request;
  updateRolePermission: RolePermission;
  updateScheduleProgress: ScheduleProgress;
  updateScheduleStudent: ScheduleStudent;
  updateUser: User;
  updateUserRole: UserRole;
};

export type MutationBulkInsertUserArgs = {
  bulkUserInput: Array<BulkUserInput>;
};

export type MutationBulkUpdateAttendedExamArgs = {
  bulkUpdateAttendedExamInput: Array<BulkUpdateAttendedExamInput>;
};

export type MutationCreateAssessmentArgs = {
  createAssessmentInput: CreateAssessmentInput;
};

export type MutationCreateAssessmentSkillArgs = {
  createAssessmentSkillInput: CreateAssessmentSkillInput;
};

export type MutationCreateAttendanceArgs = {
  createAttendanceInput: CreateAttendanceInput;
};

export type MutationCreateAttendanceStudentArgs = {
  createAttendanceStudentInput: CreateAttendanceStudentInput;
};

export type MutationCreateAttendedActivityArgs = {
  createAttendedActivityInput: CreateAttendedActivityInput;
};

export type MutationCreateAttendedActivityAnswerArgs = {
  createAttendedActivityAnswerInput: CreateAttendedActivityAnswerInput;
};

export type MutationCreateAttendedExamArgs = {
  createAttendedExamInput: CreateAttendedExamInput;
};

export type MutationCreateCertificateArgs = {
  createCertificateInput: CreateCertificateInput;
};

export type MutationCreateCertificateSignatureArgs = {
  createCertificateSignatureInput: CreateCertificateSignatureInput;
};

export type MutationCreateChapterArgs = {
  createChapterInput: CreateChapterInput;
};

export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput;
};

export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};

export type MutationCreateCourseCategoryArgs = {
  createCourseCategoryInput: CreateCourseCategoryInput;
};

export type MutationCreateCourseEvaluationArgs = {
  createCourseEvaluationInput: CreateCourseEvaluationInput;
};

export type MutationCreateCourseFeedbackArgs = {
  createCourseFeedbackInput: CreateCourseFeedbackInput;
};

export type MutationCreateCourseLevelArgs = {
  createCourseLevelInput: CreateCourseLevelInput;
};

export type MutationCreateCourseResourceArgs = {
  createCourseResourceInput: CreateCourseResourceInput;
};

export type MutationCreateCourseScheduleArgs = {
  createCourseScheduleInput: CreateCourseScheduleInput;
};

export type MutationCreateDepartmentArgs = {
  createDepartmentInput: CreateDepartmentInput;
};

export type MutationCreateDesignationArgs = {
  createDesignationInput: CreateDesignationInput;
};

export type MutationCreateExamArgs = {
  createExamInput: CreateExamInput;
};

export type MutationCreateMediaArgs = {
  createMediaInput: CreateMediaInput;
};

export type MutationCreateNotificationArgs = {
  createNotificationInput: CreateNotificationInput;
};

export type MutationCreatePermissionArgs = {
  createPermissionInput: CreatePermissionInput;
};

export type MutationCreateQuestionArgs = {
  createQuestionInput: CreateQuestionInput;
};

export type MutationCreateQuestionScenarioArgs = {
  createQuestionScenarioInput: CreateQuestionScenarioInput;
};

export type MutationCreateRequestArgs = {
  createRequestInput: CreateRequestInput;
};

export type MutationCreateRolePermissionArgs = {
  createRolePermissionInput: CreateRolePermissionInput;
};

export type MutationCreateScheduleProgressArgs = {
  createScheduleProgressInput: CreateScheduleProgressInput;
};

export type MutationCreateScheduleStudentArgs = {
  createScheduleStudentInput: CreateScheduleStudentInput;
};

export type MutationCreateUploadSignedUrlArgs = {
  createUploadSignedUrlInput: CreateUploadSignedUrlInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationCreateUserRoleArgs = {
  createUserRoleInput: CreateUserRoleInput;
};

export type MutationCreteOrUpdateOfflineExamArgs = {
  createOfflineExamInput: CreateOfflineExamInput;
};

export type MutationGetAttendanceSheetArgs = {
  getAttendanceSheetInput?: InputMaybe<GetAttendanceSheetInput>;
};

export type MutationLoginWithEmailAndPasswordArgs = {
  firebaseLoginInput: FirebaseLoginInput;
};

export type MutationMakeFilePublicArgs = {
  path: Scalars['String']['input'];
};

export type MutationRemoveAssessmentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveAssessmentSkillArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveAttendanceArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveAttendanceStudentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveAttendedActivityAnswerArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveAttendedExamArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCertificateArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCertificateSignatureArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveChapterArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCompanyArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseEvaluationArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseFeedbackArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseLevelArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseResourceArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveCourseScheduleArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveDepartmentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveDesignationArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveExamArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveMediaArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemovePermissionArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveQuestionArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveQuestionScenarioArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveRequestArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveRolePermissionArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveScheduleProgressArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveScheduleStudentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRemoveUserRoleArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRequestCertificateArgs = {
  examId: Scalars['Int']['input'];
};

export type MutationSendCertificateArgs = {
  sendCertificateInput: SendCertificateInput;
};

export type MutationUpdateAssessmentArgs = {
  id: Scalars['Int']['input'];
  updateAssessmentInput: UpdateAssessmentInput;
};

export type MutationUpdateAssessmentSkillArgs = {
  updateAssessmentSkillInput: UpdateAssessmentSkillInput;
};

export type MutationUpdateAttendanceArgs = {
  updateAttendanceInput: UpdateAttendanceInput;
};

export type MutationUpdateAttendanceStudentArgs = {
  updateAttendanceStudentInput: UpdateAttendanceStudentInput;
};

export type MutationUpdateAttendedActivityAnswerArgs = {
  updateAttendedActivityAnswerInput: UpdateAttendedActivityAnswerInput;
};

export type MutationUpdateAttendedExamArgs = {
  updateAttendedExamInput: UpdateAttendedExamInput;
};

export type MutationUpdateAttendedExamAnswerArgs = {
  updateAttendedExamAnswerInput: UpdateAttendedExamAnswerInput;
};

export type MutationUpdateCertificateArgs = {
  updateCertificateInput: UpdateCertificateInput;
};

export type MutationUpdateCertificateSignatureArgs = {
  updateCertificateSignatureInput: UpdateCertificateSignatureInput;
};

export type MutationUpdateChapterArgs = {
  updateChapterInput: UpdateChapterInput;
};

export type MutationUpdateCompanyArgs = {
  updateCompanyInput: UpdateCompanyInput;
};

export type MutationUpdateCourseArgs = {
  updateCourseInput: UpdateCourseInput;
};

export type MutationUpdateCourseCategoryArgs = {
  updateCourseCategoryInput: UpdateCourseCategoryInput;
};

export type MutationUpdateCourseEvaluationArgs = {
  updateCourseEvaluationInput: UpdateCourseEvaluationInput;
};

export type MutationUpdateCourseFeedbackArgs = {
  updateCourseFeedbackInput: UpdateCourseFeedbackInput;
};

export type MutationUpdateCourseLevelArgs = {
  updateCourseLevelInput: UpdateCourseLevelInput;
};

export type MutationUpdateCourseResourceArgs = {
  updateCourseResourceInput: UpdateCourseResourceInput;
};

export type MutationUpdateCourseScheduleArgs = {
  updateCourseScheduleInput: UpdateCourseScheduleInput;
};

export type MutationUpdateDepartmentArgs = {
  updateDepartmentInput: UpdateDepartmentInput;
};

export type MutationUpdateDesignationArgs = {
  updateDesignationInput: UpdateDesignationInput;
};

export type MutationUpdateExamArgs = {
  updateExamInput: UpdateExamInput;
};

export type MutationUpdateMediaArgs = {
  updateMediaInput: UpdateMediaInput;
};

export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};

export type MutationUpdatePermissionArgs = {
  updatePermissionInput: UpdatePermissionInput;
};

export type MutationUpdateQuestionArgs = {
  updateQuestionInput: UpdateQuestionInput;
};

export type MutationUpdateQuestionScenarioArgs = {
  updateQuestionScenarioInput: UpdateQuestionScenarioInput;
};

export type MutationUpdateRequestArgs = {
  updateRequestInput: UpdateRequestInput;
};

export type MutationUpdateRolePermissionArgs = {
  updateRolePermissionInput: UpdateRolePermissionInput;
};

export type MutationUpdateScheduleProgressArgs = {
  updateScheduleProgressInput: UpdateScheduleProgressInput;
};

export type MutationUpdateScheduleStudentArgs = {
  updateScheduleStudentInput: UpdateScheduleStudentInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationUpdateUserRoleArgs = {
  updateUserRoleInput: UpdateUserRoleInput;
};

export type Notification = {
  __typename?: 'Notification';
  chanel: NotificationChanel;
  contextId?: Maybe<Scalars['Int']['output']>;
  contextType?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  path?: Maybe<Scalars['String']['output']>;
  read: Scalars['Boolean']['output'];
  readOn?: Maybe<Scalars['Date']['output']>;
  receiverId: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum NotificationChanel {
  Email = 'EMAIL',
  Push = 'PUSH',
}

export type NotificationFilter = {
  receiverId: Scalars['Int']['input'];
};

export enum OptionType {
  CourseWithSchedule = 'courseWithSchedule',
  Courses = 'courses',
  Students = 'students',
}

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc',
}

export type PaginatedAssessments = {
  __typename?: 'PaginatedAssessments';
  data: Array<Maybe<Assessment>>;
  paging: PagingData;
};

export type PaginatedAttendance = {
  __typename?: 'PaginatedAttendance';
  data: Array<Maybe<Attendance>>;
  paging: PagingData;
};

export type PaginatedAttendedExam = {
  __typename?: 'PaginatedAttendedExam';
  data: Array<Maybe<AttendedExam>>;
  paging: PagingData;
};

export type PaginatedCertificates = {
  __typename?: 'PaginatedCertificates';
  data: Array<Maybe<Certificate>>;
  paging: PagingData;
};

export type PaginatedChapters = {
  __typename?: 'PaginatedChapters';
  data: Array<Maybe<Chapter>>;
  paging: PagingData;
};

export type PaginatedCompanies = {
  __typename?: 'PaginatedCompanies';
  data: Array<Maybe<Company>>;
  paging: PagingData;
};

export type PaginatedCourseCategory = {
  __typename?: 'PaginatedCourseCategory';
  data: Array<Maybe<CourseCategory>>;
  paging: PagingData;
};

export type PaginatedCourseEvaluations = {
  __typename?: 'PaginatedCourseEvaluations';
  data: Array<Maybe<CourseEvaluation>>;
  paging: PagingData;
};

export type PaginatedCourseFeedback = {
  __typename?: 'PaginatedCourseFeedback';
  data: Array<Maybe<CourseFeedback>>;
  paging: PagingData;
};

export type PaginatedCourseResources = {
  __typename?: 'PaginatedCourseResources';
  data: Array<Maybe<CourseResource>>;
  paging: PagingData;
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  data: Array<Maybe<Course>>;
  paging: PagingData;
};

export type PaginatedDepartments = {
  __typename?: 'PaginatedDepartments';
  data: Array<Maybe<Department>>;
  paging: PagingData;
};

export type PaginatedDesignations = {
  __typename?: 'PaginatedDesignations';
  data: Array<Maybe<Designation>>;
  paging: PagingData;
};

export type PaginatedExams = {
  __typename?: 'PaginatedExams';
  data: Array<Maybe<Exam>>;
  paging: PagingData;
};

export type PaginatedMedias = {
  __typename?: 'PaginatedMedias';
  data: Array<Maybe<Media>>;
  paging: PagingData;
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  data: Array<Maybe<Notification>>;
  paging: PagingData;
};

export type PaginatedPermissions = {
  __typename?: 'PaginatedPermissions';
  data: Array<Maybe<Permission>>;
  paging: PagingData;
};

export type PaginatedQuestions = {
  __typename?: 'PaginatedQuestions';
  data: Array<Maybe<Question>>;
  paging: PagingData;
};

export type PaginatedRequests = {
  __typename?: 'PaginatedRequests';
  data: Array<Maybe<Request>>;
  paging: PagingData;
};

export type PaginatedUserRoles = {
  __typename?: 'PaginatedUserRoles';
  data: Array<Maybe<UserRole>>;
  paging: PagingData;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<Maybe<User>>;
  paging: PagingData;
};

export type PagingData = {
  __typename?: 'PagingData';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  orderBy?: Maybe<Scalars['String']['output']>;
  orderField?: Maybe<Scalars['String']['output']>;
  previousPage?: Maybe<Scalars['Int']['output']>;
  size: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PagingInput = {
  orderBy?: InputMaybe<OrderBy>;
  orderField?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type PagingResult = {
  __typename?: 'PagingResult';
  paging: PagingData;
};

export type Permission = {
  __typename?: 'Permission';
  Role?: Maybe<UserRole>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  roleId?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  assessment?: Maybe<Assessment>;
  assessmentSkill?: Maybe<AssessmentSkill>;
  assessmentSkills: Array<Maybe<AssessmentSkill>>;
  assessments: PaginatedAssessments;
  attendance?: Maybe<Attendance>;
  attendanceReport?: Maybe<ReportResponse>;
  attendanceStudent?: Maybe<AttendanceStudent>;
  attendanceStudents: Array<Maybe<AttendanceStudent>>;
  attendances: PaginatedAttendance;
  attendedActivities: Array<Maybe<AttendedActivity>>;
  attendedActivityAnswer?: Maybe<AttendedActivityAnswer>;
  attendedActivityAnswers: Array<Maybe<AttendedActivityAnswer>>;
  attendedActivityByChapterAndSchedule?: Maybe<AttendedActivity>;
  attendedExam: AttendedExam;
  attendedExamAnswer?: Maybe<AttendedExamAnswer>;
  attendedExams: PaginatedAttendedExam;
  certificate?: Maybe<Certificate>;
  certificateSignature?: Maybe<CertificateSignature>;
  certificateSignatures: Array<Maybe<CertificateSignature>>;
  certificates: PaginatedCertificates;
  chapter?: Maybe<Chapter>;
  chapters: PaginatedChapters;
  companies: PaginatedCompanies;
  company?: Maybe<Company>;
  course?: Maybe<Course>;
  courseCategories: PaginatedCourseCategory;
  courseCategory?: Maybe<CourseCategory>;
  courseEvaluation?: Maybe<CourseEvaluation>;
  courseEvaluations: PaginatedCourseEvaluations;
  courseFeedback?: Maybe<CourseFeedback>;
  courseFeedbacks: PaginatedCourseFeedback;
  courseLevel?: Maybe<CourseLevel>;
  courseLevelNotAttendedUser: Array<Maybe<UserBase>>;
  courseLevels: Array<Maybe<CourseLevel>>;
  courseResource?: Maybe<CourseResource>;
  courseResources: PaginatedCourseResources;
  courseSchedule?: Maybe<CourseSchedule>;
  courseSchedules: CourseScheduleResponse;
  courses: PaginatedCourses;
  department?: Maybe<Department>;
  departments: PaginatedDepartments;
  designation?: Maybe<Designation>;
  designations: PaginatedDesignations;
  exam?: Maybe<Exam>;
  exams: PaginatedExams;
  generateReport: ReportResponse;
  getMyStudentSchedules: Array<Maybe<ScheduleStudent>>;
  getStudentsExpiredInCourse: Array<Maybe<UserBase>>;
  getUnreadNotificationCount: UnReadNotificationCountResponse;
  getUserProfile?: Maybe<User>;
  media?: Maybe<Media>;
  medias: PaginatedMedias;
  notification?: Maybe<Notification>;
  notifications: PaginatedNotifications;
  permission?: Maybe<Permission>;
  permissions: PaginatedPermissions;
  question?: Maybe<Question>;
  questionScenario?: Maybe<QuestionScenario>;
  questionScenarios: Array<Maybe<QuestionScenario>>;
  questions: PaginatedQuestions;
  reportList: Array<ReportListItem>;
  reportListItem: ReportListItem;
  request?: Maybe<Request>;
  requests: PaginatedRequests;
  rolePermission?: Maybe<RolePermission>;
  rolePermissions: Array<Maybe<RolePermission>>;
  scheduleProgress?: Maybe<ScheduleProgress>;
  scheduleProgresses: Array<Maybe<ScheduleProgress>>;
  scheduleStudent?: Maybe<ScheduleStudent>;
  scheduleStudents: Array<Maybe<ScheduleStudent>>;
  user?: Maybe<User>;
  userRole?: Maybe<UserRole>;
  userRoles: PaginatedUserRoles;
  users: PaginatedUsers;
};

export type QueryAssessmentArgs = {
  slug: Scalars['String']['input'];
};

export type QueryAssessmentSkillArgs = {
  id: Scalars['Int']['input'];
};

export type QueryAssessmentsArgs = {
  assessmentFilter?: InputMaybe<AssessmentFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryAttendanceArgs = {
  slug: Scalars['String']['input'];
};

export type QueryAttendanceReportArgs = {
  attendanceReportFilter?: InputMaybe<AttendanceReportFilter>;
};

export type QueryAttendanceStudentArgs = {
  id: Scalars['Int']['input'];
};

export type QueryAttendancesArgs = {
  findAttendanceInput: FindAttendanceInput;
  pagingInput: PagingInput;
};

export type QueryAttendedActivityAnswerArgs = {
  id: Scalars['Int']['input'];
};

export type QueryAttendedActivityByChapterAndScheduleArgs = {
  getAttendedActivityInput?: InputMaybe<GetAttendedActivityInput>;
};

export type QueryAttendedExamArgs = {
  slug: Scalars['String']['input'];
};

export type QueryAttendedExamAnswerArgs = {
  id: Scalars['Int']['input'];
};

export type QueryAttendedExamsArgs = {
  filter?: InputMaybe<GetAttendedExamFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCertificateArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCertificateSignatureArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCertificatesArgs = {
  certificateFilter?: InputMaybe<CertificateFilters>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryChapterArgs = {
  id: Scalars['Int']['input'];
};

export type QueryChaptersArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCompaniesArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCompanyArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseCategoriesArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCourseCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseEvaluationArgs = {
  slug: Scalars['String']['input'];
};

export type QueryCourseEvaluationsArgs = {
  filter?: InputMaybe<CourseEvaluationFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCourseFeedbackArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseFeedbacksArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCourseLevelArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseLevelNotAttendedUserArgs = {
  courseLevelId: Scalars['Int']['input'];
};

export type QueryCourseResourceArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseResourcesArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCourseScheduleArgs = {
  id: Scalars['Int']['input'];
};

export type QueryCourseSchedulesArgs = {
  courseScheduleFilter?: InputMaybe<CourseScheduleFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryCoursesArgs = {
  filter?: InputMaybe<CourseFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryDepartmentArgs = {
  id: Scalars['Int']['input'];
};

export type QueryDepartmentsArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryDesignationArgs = {
  id: Scalars['Int']['input'];
};

export type QueryDesignationsArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryExamArgs = {
  id: Scalars['Int']['input'];
};

export type QueryExamsArgs = {
  examFilter?: InputMaybe<ExamFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryGenerateReportArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  slug: Scalars['String']['input'];
};

export type QueryGetMyStudentSchedulesArgs = {
  input?: InputMaybe<GetMyStudentSchedulesInput>;
};

export type QueryGetStudentsExpiredInCourseArgs = {
  courseLevelId: Scalars['Int']['input'];
};

export type QueryMediaArgs = {
  id: Scalars['Int']['input'];
};

export type QueryMediasArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryNotificationArgs = {
  id: Scalars['Int']['input'];
};

export type QueryNotificationsArgs = {
  filter?: InputMaybe<NotificationFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryPermissionArgs = {
  id: Scalars['Int']['input'];
};

export type QueryPermissionsArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryQuestionArgs = {
  id: Scalars['Int']['input'];
};

export type QueryQuestionScenarioArgs = {
  id: Scalars['Int']['input'];
};

export type QueryQuestionScenariosArgs = {
  filter?: InputMaybe<QuestionScenarioFilters>;
};

export type QueryQuestionsArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryReportListItemArgs = {
  slug: Scalars['String']['input'];
};

export type QueryRequestArgs = {
  id: Scalars['Int']['input'];
};

export type QueryRequestsArgs = {
  findRequestInput: FindRequestInput;
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryRolePermissionArgs = {
  id: Scalars['Int']['input'];
};

export type QueryScheduleProgressArgs = {
  id: Scalars['Int']['input'];
};

export type QueryScheduleStudentArgs = {
  slug: Scalars['ID']['input'];
};

export type QueryScheduleStudentsArgs = {
  getScheduleStudentInput?: InputMaybe<GetScheduleStudentInput>;
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUserRoleArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUserRolesArgs = {
  pagingInput?: InputMaybe<PagingInput>;
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  pagingInput?: InputMaybe<PagingInput>;
};

export type Question = {
  __typename?: 'Question';
  FailPromt?: Maybe<Scalars['String']['output']>;
  answer?: Maybe<Scalars['String']['output']>;
  answerType?: Maybe<AnswerType>;
  answersOptions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  chapter: Chapter;
  chaptersId: Scalars['Int']['output'];
  correctAnswer?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  exam?: Maybe<Exam>;
  examsId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mark?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['Int']['output']>;
  orderNo?: Maybe<Scalars['Int']['output']>;
  question: Scalars['String']['output'];
  scenario?: Maybe<QuestionScenario>;
  scenarioId?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  successPromt?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type QuestionScenario = {
  __typename?: 'QuestionScenario';
  Questions?: Maybe<Array<Maybe<Question>>>;
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  level?: Maybe<CourseLevel>;
  levelId: Scalars['Int']['output'];
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  scenario: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type QuestionScenarioFilters = {
  levelId: Scalars['Int']['input'];
};

export enum QuestionType {
  Question = 'QUESTION',
  Scenario = 'SCENARIO',
}

export enum ReportFilterType {
  Custom = 'custom',
  Date = 'date',
  MonthPicker = 'monthPicker',
  Number = 'number',
  Select = 'select',
  Text = 'text',
  YearPicker = 'yearPicker',
}

export type ReportListItem = {
  __typename?: 'ReportListItem';
  columns: Array<TableColumn>;
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  filters?: Maybe<Array<Maybe<Filter>>>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ReportResponse = {
  __typename?: 'ReportResponse';
  columns?: Maybe<Array<TableColumn>>;
  filter: Scalars['JSON']['output'];
  message: Scalars['String']['output'];
  report: Scalars['String']['output'];
  reportData: Array<Scalars['JSON']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum ReqContext {
  AttendedExams = 'attendedExams',
  CourseSchedule = 'courseSchedule',
}

export type Request = {
  __typename?: 'Request';
  approvedOn?: Maybe<Scalars['Date']['output']>;
  attendedExam?: Maybe<AttendedExam>;
  context?: Maybe<ReqContext>;
  contextId?: Maybe<Scalars['Int']['output']>;
  course?: Maybe<Course>;
  coursesId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  creator: User;
  creatorId: Scalars['Int']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  rejectedOn?: Maybe<Scalars['Date']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  requestedOn?: Maybe<Scalars['Date']['output']>;
  slug: Scalars['String']['output'];
  status: RequestStatus;
  type: RequestType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum RequestStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export enum RequestType {
  CourseCertificate = 'COURSE_CERTIFICATE',
  CourseExam = 'COURSE_EXAM',
  CourseNomination = 'COURSE_NOMINATION',
  RetakeExam = 'RETAKE_EXAM',
}

export type RolePermission = {
  __typename?: 'RolePermission';
  Permissions?: Maybe<Permission>;
  id?: Maybe<Scalars['ID']['output']>;
  permissionsId?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<UserRole>;
  roleId?: Maybe<Scalars['Int']['output']>;
};

export type ScheduleProgress = {
  __typename?: 'ScheduleProgress';
  activityStatus: CourseProgressStatus;
  chaptersId: Scalars['Int']['output'];
  courseLevelId: Scalars['Int']['output'];
  courseScheduleStudentId: Scalars['Int']['output'];
  coursesId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lessonStatus: CourseProgressStatus;
  slug: Scalars['String']['output'];
  status: CourseProgressStatus;
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type ScheduleStudent = {
  __typename?: 'ScheduleStudent';
  completionPercentage: Scalars['Float']['output'];
  courseSchedule: CourseSchedule;
  courseScheduleId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  examRequestedOn?: Maybe<Scalars['String']['output']>;
  exams?: Maybe<Array<Maybe<AttendedExam>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  progress?: Maybe<Array<Maybe<ScheduleProgress>>>;
  slug: Scalars['String']['output'];
  startedOn?: Maybe<Scalars['String']['output']>;
  status: ScheduleStudentStatus;
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export enum ScheduleStudentStatus {
  CertificateIssued = 'CERTIFICATE_ISSUED',
  CertificateRequested = 'CERTIFICATE_REQUESTED',
  CertificateRevoked = 'CERTIFICATE_REVOKED',
  Completed = 'COMPLETED',
  ExamFailed = 'EXAM_FAILED',
  ExamPassed = 'EXAM_PASSED',
  ExamRequested = 'EXAM_REQUESTED',
  ExamScheduled = 'EXAM_SCHEDULED',
  ExamTaken = 'EXAM_TAKEN',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED',
}

export type SendCertificateInput = {
  certificateId: Scalars['Int']['input'];
};

export type SkillsOfAssement = {
  __typename?: 'SkillsOfAssement';
  applicable: Scalars['Boolean']['output'];
  assessment?: Maybe<Assessment>;
  assessmentSkillsId: Scalars['Int']['output'];
  assessmentsId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  proLevel: Scalars['String']['output'];
  skill: AssessmentSkill;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type StudentExamQuestions = {
  __typename?: 'StudentExamQuestions';
  questions?: Maybe<Array<Maybe<Question>>>;
  scenario?: Maybe<QuestionScenario>;
  type?: Maybe<QuestionType>;
};

export type StudentExamResponse = {
  __typename?: 'StudentExamResponse';
  exam?: Maybe<Exam>;
  questions?: Maybe<Array<Maybe<StudentExamQuestions>>>;
};

export type TableColumn = {
  __typename?: 'TableColumn';
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  dataIndex: Scalars['String']['output'];
  key: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: ColumnType;
};

export type UnReadNotificationCountResponse = {
  __typename?: 'UnReadNotificationCountResponse';
  count: Scalars['Int']['output'];
};

export type UpdateAssessmentInput = {
  assementAction?: InputMaybe<Scalars['String']['input']>;
  attitude: Scalars['String']['input'];
  date: Scalars['Date']['input'];
  result: Scalars['String']['input'];
  skillsOfAssement?: InputMaybe<Array<InputMaybe<CreateSkillsOfAssement>>>;
  type: Array<AssessmentType>;
  validUpTo?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateAssessmentSkillInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateAttendanceInput = {
  slug: Scalars['String']['input'];
  type: AttendanceType;
};

export type UpdateAttendanceStudentInput = {
  id: Scalars['Int']['input'];
  status: AttendanceStatus;
};

export type UpdateAttendedActivityAnswerInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  answerStatus?: InputMaybe<AnswerStatus>;
  attendedActivityId?: InputMaybe<Scalars['Int']['input']>;
  chapterId?: InputMaybe<Scalars['Int']['input']>;
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  correctAnswerMark?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  questionId?: InputMaybe<Scalars['Int']['input']>;
  selectedAnswerMark?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateAttendedActivityInput = {
  ActivityAnswers?: InputMaybe<Array<InputMaybe<UpdateAttendedActivityAnswerInput>>>;
  achivedMark?: InputMaybe<Scalars['Int']['input']>;
  chapterId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  maxMark?: InputMaybe<Scalars['Int']['input']>;
  progressId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ExamStatus>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateAttendedExamAnswerInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  selectedAnswerMark?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateAttendedExamInput = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<AttendExamStatus>;
};

export type UpdateCertificateInput = {
  CertificateSignatures?: InputMaybe<Array<InputMaybe<CreateOrUpdateCertificateSignatureInput>>>;
  attendedExamId?: InputMaybe<Scalars['Int']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  certificateType?: InputMaybe<CertificateType>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sealTitle?: InputMaybe<Scalars['String']['input']>;
  sealUrl?: InputMaybe<Scalars['String']['input']>;
  signatures?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCertificateSignatureInput = {
  designation?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  signatureUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChapterInput = {
  chapterType: ChapterType;
  id: Scalars['ID']['input'];
  keyLearning?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<CreateOrUpdateQuestionInput>>>;
};

export type UpdateCompanyInput = {
  id: Scalars['ID']['input'];
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseCategoryInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseEvaluationInput = {
  id: Scalars['Int']['input'];
  language: Language;
  questions: Array<CourseEvaluationUpdateQuestionsInput>;
  remarks: Scalars['String']['input'];
};

export type UpdateCourseFeedbackInput = {
  feedback?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCourseInput = {
  Summary?: InputMaybe<Scalars['String']['input']>;
  assessmentSkills?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  classLink?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  courseCategoryId?: InputMaybe<Scalars['Int']['input']>;
  courseStatus?: InputMaybe<CourseStatus>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  examRequired?: InputMaybe<Scalars['Boolean']['input']>;
  expireIn?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  instructorId?: InputMaybe<Scalars['Int']['input']>;
  maxStudentsAllowed?: InputMaybe<Scalars['Int']['input']>;
  median?: InputMaybe<CourseMedian>;
  mediumOfExam?: InputMaybe<ExamMedium>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<CourseType>;
};

export type UpdateCourseLevelInput = {
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseResourceInput = {
  chaptersId?: InputMaybe<Scalars['Int']['input']>;
  coursesId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  memeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseScheduleInput = {
  attendanceProof?: InputMaybe<Scalars['String']['input']>;
  days?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  endTime?: InputMaybe<Scalars['Date']['input']>;
  examId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  isLocked?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  startTime?: InputMaybe<Scalars['Date']['input']>;
  students?: InputMaybe<Array<Scalars['ID']['input']>>;
  designationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateDepartmentInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateDesignationInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateExamInput = {
  Questions?: InputMaybe<Array<InputMaybe<CreateOrUpdateQuestionInput>>>;
  achivedMark?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  maximumMark?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  passMark?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ExamMedium>;
};

export type UpdateMediaInput = {
  chaptersId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotificationInput = {
  id: Scalars['Int']['input'];
  read: Scalars['Boolean']['input'];
  readOn?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdatePasswordInput = {
  id: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};

export type UpdatePermissionInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateQuestionInput = {
  FailPromt?: InputMaybe<Scalars['String']['input']>;
  answer?: InputMaybe<Scalars['String']['input']>;
  answersOptions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chaptersId?: InputMaybe<Scalars['Int']['input']>;
  correctAnswer?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  mark?: InputMaybe<Scalars['Int']['input']>;
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  orderNo?: InputMaybe<Scalars['Int']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  scenarioId?: InputMaybe<Scalars['Int']['input']>;
  successPromt?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionScenarioInput = {
  Questions?: InputMaybe<Array<InputMaybe<UpdateQuestionInput>>>;
  id: Scalars['ID']['input'];
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  scenario?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRequestInput = {
  id: Scalars['ID']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  status: RequestStatus;
};

export type UpdateRolePermissionInput = {
  id: Scalars['Int']['input'];
  permissionsId?: InputMaybe<Scalars['Int']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateScheduleProgressInput = {
  assessmentStatus?: InputMaybe<CourseProgressStatus>;
  id: Scalars['ID']['input'];
  lessonStatus?: InputMaybe<CourseProgressStatus>;
  status?: InputMaybe<CourseProgressStatus>;
};

export type UpdateScheduleStudentInput = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<ScheduleStudentStatus>;
};

export type UpdateUserInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  designationId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  idNumber?: InputMaybe<Scalars['String']['input']>;
  idUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  institution?: InputMaybe<Scalars['String']['input']>;
  lineManagerId?: InputMaybe<Scalars['Int']['input']>;
  managerId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  passportUrl?: InputMaybe<Scalars['String']['input']>;
  passwordUrl?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  signature?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EmployeeStatus>;
  type?: InputMaybe<EmployeeType>;
};

export type UpdateUserRoleInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UploadSignedUrlResponse = {
  __typename?: 'UploadSignedUrlResponse';
  signedUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  Certifactes?: Maybe<Array<Maybe<Certificate>>>;
  Courses?: Maybe<Array<Maybe<Course>>>;
  ScheduleStudent?: Maybe<Array<Maybe<ScheduleStudent>>>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  deleted: Scalars['Boolean']['output'];
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['Int']['output']>;
  designationId?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  firebaseID: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  idNumber: Scalars['String']['output'];
  idUrl?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<User>;
  managerId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  passportUrl?: Maybe<Scalars['String']['output']>;
  passwordUrl?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  qualification?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  roleId?: Maybe<Scalars['Int']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<EmployeeStatus>;
  type?: Maybe<EmployeeType>;
  updatedAt: Scalars['String']['output'];
};

export type UserBase = {
  __typename?: 'UserBase';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type UserFilter = {
  departmentId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  idNumber?: InputMaybe<Scalars['String']['input']>;
  managerFirebaseId?: InputMaybe<Scalars['String']['input']>;
  managerId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<InputMaybe<EmployeeStatus>>>;
  type?: InputMaybe<Array<InputMaybe<EmployeeType>>>;
};

export type UserRole = {
  __typename?: 'UserRole';
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum UserRols {
  Admin = 'Admin',
  Faculty = 'Faculty',
  LineManager = 'LineManager',
  Students = 'Students',
}

export type CreateAssessmentSkillMutationVariables = Exact<{
  createAssessmentSkillInput: CreateAssessmentSkillInput;
}>;

export type CreateAssessmentSkillMutation = {
  __typename?: 'Mutation';
  createAssessmentSkill: {
    __typename?: 'AssessmentSkill';
    name?: string | null;
    id?: number | null;
  };
};

export type UpdateAssessmentSkillMutationVariables = Exact<{
  updateAssessmentSkillInput: UpdateAssessmentSkillInput;
}>;

export type UpdateAssessmentSkillMutation = {
  __typename?: 'Mutation';
  updateAssessmentSkill: {
    __typename?: 'AssessmentSkill';
    id?: number | null;
    name?: string | null;
  };
};

export type GetAssessmentSkillsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAssessmentSkillsQuery = {
  __typename?: 'Query';
  assessmentSkills: Array<{
    __typename?: 'AssessmentSkill';
    name?: string | null;
    id?: number | null;
    slug?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null>;
};

export type GetCourseAssessmentSkillsQueryVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;

export type GetCourseAssessmentSkillsQuery = {
  __typename?: 'Query';
  course?: {
    __typename?: 'Course';
    id: string;
    name: string;
    slug: string;
    courseAssessmentSkills: Array<{
      __typename?: 'CourseAssessmentSkill';
      assessmentSkill: {
        __typename?: 'AssessmentSkill';
        name?: string | null;
        id?: number | null;
        slug?: string | null;
      };
    } | null>;
  } | null;
};

export type GetAssessmentsQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  assessmentFilter?: InputMaybe<AssessmentFilter>;
}>;

export type GetAssessmentsQuery = {
  __typename?: 'Query';
  assessments: {
    __typename?: 'PaginatedAssessments';
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<{
      __typename?: 'Assessment';
      assessValidity?: number | null;
      courseScheduleStudentsId: number;
      createdAt: any;
      date: any;
      id: number;
      name: string;
      nextAssessment?: any | null;
      slug: string;
      updatedAt: any;
      type: Array<AssessmentType>;
      attitude: string;
      assementAction?: string | null;
      result: string;
      skillsOfAssessment: Array<{
        __typename?: 'SkillsOfAssement';
        applicable: boolean;
        skill: { __typename?: 'AssessmentSkill'; name?: string | null; id?: number | null };
      }>;
      courseScheduleStudent: {
        __typename?: 'ScheduleStudent';
        id: string;
        name: string;
        user: { __typename?: 'User'; id: number; name: string; idNumber: string };
        courseSchedule: { __typename?: 'CourseSchedule'; coursesId?: string | null };
      };
    } | null>;
  };
};

export type CreateAssessmentMutationVariables = Exact<{
  createAssessmentInput: CreateAssessmentInput;
}>;

export type CreateAssessmentMutation = {
  __typename?: 'Mutation';
  createAssessment: {
    __typename?: 'Assessment';
    assessValidity?: number | null;
    courseScheduleStudentsId: number;
    createdAt: any;
    date: any;
    id: number;
    name: string;
    nextAssessment?: any | null;
  };
};

export type GetAssessmentQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GetAssessmentQuery = {
  __typename?: 'Query';
  assessment?: {
    __typename?: 'Assessment';
    assessValidity?: number | null;
    courseScheduleStudentsId: number;
    createdAt: any;
    date: any;
    id: number;
    name: string;
    nextAssessment?: any | null;
    slug: string;
    updatedAt: any;
    assementAction?: string | null;
    type: Array<AssessmentType>;
    attitude: string;
    validUpTo?: any | null;
    result: string;
    skillsOfAssessment: Array<{
      __typename?: 'SkillsOfAssement';
      applicable: boolean;
      skill: { __typename?: 'AssessmentSkill'; name?: string | null; id?: number | null };
    }>;
    courseScheduleStudent: {
      __typename?: 'ScheduleStudent';
      id: string;
      name: string;
      user: { __typename?: 'User'; id: number; name: string; idNumber: string };
    };
  } | null;
};

export type UpdateAssessmentMutationVariables = Exact<{
  updateAssessmentInput: UpdateAssessmentInput;
  updateAssessmentId: Scalars['Int']['input'];
}>;

export type UpdateAssessmentMutation = {
  __typename?: 'Mutation';
  updateAssessment: { __typename?: 'Assessment'; id: number; name: string };
};

export type CreateAttendedExamMutationVariables = Exact<{
  createAttendedExamInput: CreateAttendedExamInput;
}>;

export type CreateAttendedExamMutation = {
  __typename?: 'Mutation';
  createAttendedExam: { __typename?: 'AttendedExam'; slug: string };
};

export type GetAttendedExamQueryVariables = Exact<{
  attendedExamId: Scalars['String']['input'];
}>;

export type GetAttendedExamQuery = {
  __typename?: 'Query';
  attendedExam: {
    __typename?: 'AttendedExam';
    userId: number;
    createdAt: any;
    id: string;
    slug: string;
    status: AttendExamStatus;
    totalMark?: number | null;
    courseScheduleStudentsId: number;
    name?: string | null;
    examAttended: boolean;
    AttendedExamAnswers: Array<{
      __typename?: 'AttendedExamAnswer';
      answer: string;
      answerStatus: AnswerStatus;
      createdAt: any;
      id: string;
      slug: string;
      questionText: string;
      mediaUrl?: string | null;
      orderNo?: number | null;
      correctAnswerMark?: number | null;
      answersOptions: Array<string>;
      answerType: AnswerType;
      questionScenarioId?: number | null;
      scenarioText?: string | null;
    }>;
  };
};

export type UpdateAttendedExamAnswerMutationVariables = Exact<{
  updateAttendedExamAnswerInput: UpdateAttendedExamAnswerInput;
}>;

export type UpdateAttendedExamAnswerMutation = {
  __typename?: 'Mutation';
  updateAttendedExamAnswer: { __typename?: 'AttendedExamAnswer'; id: string };
};

export type UpdateAttendedExamMutationVariables = Exact<{
  updateAttendedExamInput: UpdateAttendedExamInput;
}>;

export type UpdateAttendedExamMutation = {
  __typename?: 'Mutation';
  updateAttendedExam: { __typename?: 'AttendedExam'; id: string; status: AttendExamStatus };
};

export type GetAttendedExamsQueryVariables = Exact<{
  filter?: InputMaybe<GetAttendedExamFilter>;
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type GetAttendedExamsQuery = {
  __typename?: 'Query';
  attendedExams: {
    __typename?: 'PaginatedAttendedExam';
    data: Array<{
      __typename?: 'AttendedExam';
      achivedMark?: number | null;
      courseScheduleStudentsId: number;
      createdAt: any;
      deleted: boolean;
      deletedAt?: any | null;
      examsId: number;
      id: string;
      name?: string | null;
      slug: string;
      status: AttendExamStatus;
      totalMark?: number | null;
      updatedAt: any;
      userId: number;
      user: { __typename?: 'User'; id: number; name: string };
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      nextPage?: number | null;
      hasPreviousPage: boolean;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type GetAttendedExamDetailsQueryVariables = Exact<{
  attendedExamId: Scalars['String']['input'];
}>;

export type GetAttendedExamDetailsQuery = {
  __typename?: 'Query';
  attendedExam: {
    __typename?: 'AttendedExam';
    userId: number;
    createdAt: any;
    id: string;
    slug: string;
    status: AttendExamStatus;
    totalMark?: number | null;
    courseScheduleStudentsId: number;
    name?: string | null;
    AttendedExamAnswers: Array<{
      __typename?: 'AttendedExamAnswer';
      answer: string;
      answerStatus: AnswerStatus;
      createdAt: any;
      id: string;
      slug: string;
      questionText: string;
      mediaUrl?: string | null;
      orderNo?: number | null;
      correctAnswerMark?: number | null;
      answersOptions: Array<string>;
      answerType: AnswerType;
      questionScenarioId?: number | null;
      scenarioText?: string | null;
      selectedAnswerMark?: number | null;
      correctAnswer?: string | null;
      remarks?: string | null;
    }>;
  };
};

export type CreteOrUpdateOfflineExamMutationVariables = Exact<{
  createOfflineExamInput: CreateOfflineExamInput;
}>;

export type CreteOrUpdateOfflineExamMutation = {
  __typename?: 'Mutation';
  creteOrUpdateOfflineExam: Array<{
    __typename?: 'AttendedExam';
    id: string;
    slug: string;
    name?: string | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    deleted: boolean;
    userId: number;
    examsId: number;
    totalMark?: number | null;
    achivedMark?: number | null;
    status: AttendExamStatus;
    courseScheduleStudentsId: number;
    examAttended: boolean;
    user: { __typename?: 'User'; name: string; id: number };
    exam: {
      __typename?: 'Exam';
      id: string;
      name?: string | null;
      passMark?: number | null;
      maximumMark?: number | null;
    };
  } | null>;
};

export type BulkUpdateAttendedExamMutationVariables = Exact<{
  bulkUpdateAttendedExamInput: Array<BulkUpdateAttendedExamInput> | BulkUpdateAttendedExamInput;
}>;

export type BulkUpdateAttendedExamMutation = {
  __typename?: 'Mutation';
  bulkUpdateAttendedExam?: Array<{ __typename?: 'AttendedExam'; id: string } | null> | null;
};

export type CreateAttendanceMutationVariables = Exact<{
  createAttendanceInput: CreateAttendanceInput;
}>;

export type CreateAttendanceMutation = {
  __typename?: 'Mutation';
  createAttendance: {
    __typename?: 'Attendance';
    id: string;
    slug: string;
    type: AttendanceType;
    date?: any | null;
  };
};

export type GetAttendanceDetailsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GetAttendanceDetailsQuery = {
  __typename?: 'Query';
  attendance?: {
    __typename?: 'Attendance';
    courseLevelId?: number | null;
    courseScheduleId?: number | null;
    courseScheduleStudentsId?: number | null;
    coursesId: number;
    createdAt?: any | null;
    creatorId?: number | null;
    date?: any | null;
    id: string;
    slug: string;
    type: AttendanceType;
    updatedAt?: string | null;
    updaterId?: number | null;
    students?: Array<{
      __typename?: 'AttendanceStudent';
      id: number;
      userId: number;
      status: AttendanceStatus;
      slug: string;
      updatedAt: any;
      user: { __typename?: 'User'; name: string; id: number };
    } | null> | null;
  } | null;
};

export type UpdateAttendanceStudentMutationVariables = Exact<{
  updateAttendanceStudentInput: UpdateAttendanceStudentInput;
}>;

export type UpdateAttendanceStudentMutation = {
  __typename?: 'Mutation';
  updateAttendanceStudent: { __typename?: 'AttendanceStudent'; id: number; slug: string };
};

export type GetAttendancesForScheduleQueryVariables = Exact<{
  findAttendanceInput: FindAttendanceInput;
  pagingInput: PagingInput;
}>;

export type GetAttendancesForScheduleQuery = {
  __typename?: 'Query';
  attendances: {
    __typename?: 'PaginatedAttendance';
    data: Array<{
      __typename?: 'Attendance';
      slug: string;
      id: string;
      type: AttendanceType;
      creatorId?: number | null;
      date?: any | null;
      creator?: { __typename?: 'User'; id: number; name: string } | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type CreateCertificateMutationVariables = Exact<{
  createCertificateInput: CreateCertificateInput;
}>;

export type CreateCertificateMutation = {
  __typename?: 'Mutation';
  createCertificate: {
    __typename?: 'Certificate';
    batchNumber: string;
    certificateType: CertificateType;
    companyId?: number | null;
    coursesId?: number | null;
    createdAt: any;
    id?: string | null;
    imageUrl: string;
    name: string;
    slug: string;
  };
};

export type GetCertificatesQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  certificateFilter?: InputMaybe<CertificateFilters>;
}>;

export type GetCertificatesQuery = {
  __typename?: 'Query';
  certificates: {
    __typename?: 'PaginatedCertificates';
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<{
      __typename?: 'Certificate';
      certificateType: CertificateType;
      batchNumber: string;
      companyId?: number | null;
      coursesId?: number | null;
      id?: string | null;
      createdAt: any;
      imageUrl: string;
      name: string;
      sealTitle?: string | null;
      sealUrl?: string | null;
      slug: string;
      updatedAt: string;
      userId?: number | null;
      courses?: { __typename?: 'Course'; id: string; name: string } | null;
      owner?: { __typename?: 'User'; id: number; name: string } | null;
    } | null>;
  };
};

export type GetCertificateDetailsQueryVariables = Exact<{
  certificateId: Scalars['Int']['input'];
}>;

export type GetCertificateDetailsQuery = {
  __typename?: 'Query';
  certificate?: {
    __typename?: 'Certificate';
    batchNumber: string;
    certificateType: CertificateType;
    companyId?: number | null;
    coursesId?: number | null;
    createdAt: any;
    deleted: boolean;
    id?: string | null;
    imageUrl: string;
    name: string;
    sealTitle?: string | null;
    sealUrl?: string | null;
    signatures?: Array<string | null> | null;
    slug: string;
    updatedAt: string;
    certificateUrl?: string | null;
    userId?: number | null;
    studentId?: number | null;
    courses?: {
      __typename?: 'Course';
      id: string;
      name: string;
      certificateType: CourseCertificateType;
      functionName?: string | null;
      caaApprovalNo?: string | null;
    } | null;
    CertificateSignatures?: Array<{
      __typename?: 'CertificateSignature';
      certificatesId: number;
      designation: string;
      id: string;
      name: string;
      signatureUrl: string;
      slug: string;
    } | null> | null;
    owner?: { __typename?: 'User'; id: number; name: string; idNumber: string } | null;
    student?: {
      __typename?: 'ScheduleStudent';
      courseSchedule: {
        __typename?: 'CourseSchedule';
        startDate?: any | null;
        endDate?: any | null;
      };
    } | null;
  } | null;
};

export type UpdateCertificateMutationVariables = Exact<{
  updateCertificateInput: UpdateCertificateInput;
}>;

export type UpdateCertificateMutation = {
  __typename?: 'Mutation';
  updateCertificate: {
    __typename?: 'Certificate';
    coursesId?: number | null;
    companyId?: number | null;
    certificateType: CertificateType;
    batchNumber: string;
    id?: string | null;
    name: string;
  };
};

export type RequestCertificateMutationVariables = Exact<{
  examId: Scalars['Int']['input'];
}>;

export type RequestCertificateMutation = {
  __typename?: 'Mutation';
  requestCertificate?: { __typename?: 'MessageResponse'; message: string } | null;
};

export type CreateAttendedActivityMutationVariables = Exact<{
  createAttendedActivityInput: CreateAttendedActivityInput;
}>;

export type CreateAttendedActivityMutation = {
  __typename?: 'Mutation';
  createAttendedActivity: {
    __typename?: 'AttendedActivity';
    achivedMark?: number | null;
    chaptersId: number;
    createdAt: any;
    deleted: boolean;
    deletedAt?: string | null;
    id: string;
    maxMark?: number | null;
    scheduleProgressId: number;
    slug: string;
    status: ExamStatus;
    updatedAt: string;
    userId: number;
  };
};

export type GetAttendedActivityByChapterAndScheduleQueryVariables = Exact<{
  getAttendedActivityInput?: InputMaybe<GetAttendedActivityInput>;
}>;

export type GetAttendedActivityByChapterAndScheduleQuery = {
  __typename?: 'Query';
  attendedActivityByChapterAndSchedule?: {
    __typename?: 'AttendedActivity';
    achivedMark?: number | null;
    chaptersId: number;
    createdAt: any;
    deleted: boolean;
    deletedAt?: string | null;
    id: string;
    maxMark?: number | null;
    scheduleProgressId: number;
    slug: string;
    status: ExamStatus;
    updatedAt: string;
    userId: number;
    activityAnswers: Array<{
      __typename?: 'AttendedActivityAnswer';
      answer: string;
      answerStatus: AnswerStatus;
      correctAnswerMark?: number | null;
      questionId: number;
      questionText: string;
      selectedAnswerMark?: number | null;
      correctAnswer?: string | null;
      id: string;
    } | null>;
  } | null;
};

export type GetCourseCategoryQueryVariables = Exact<{
  PagingInput?: InputMaybe<PagingInput>;
}>;

export type GetCourseCategoryQuery = {
  __typename?: 'Query';
  courseCategories: {
    __typename?: 'PaginatedCourseCategory';
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<{
      __typename?: 'CourseCategory';
      name: string;
      slug: string;
      id?: string | null;
      createdAt: any;
    } | null>;
  };
};

export type CreateCourseCategoryMutationVariables = Exact<{
  createCourseCategoryInput: CreateCourseCategoryInput;
}>;

export type CreateCourseCategoryMutation = {
  __typename?: 'Mutation';
  createCourseCategory: {
    __typename?: 'CourseCategory';
    id?: string | null;
    name: string;
    slug: string;
    createdAt: any;
  };
};

export type UpdateCourseCategoryMutationVariables = Exact<{
  updateCourseCategoryInput: UpdateCourseCategoryInput;
}>;

export type UpdateCourseCategoryMutation = {
  __typename?: 'Mutation';
  updateCourseCategory: {
    __typename?: 'CourseCategory';
    id?: string | null;
    name: string;
    slug: string;
    createdAt: any;
  };
};

export type CreateChapterMutationVariables = Exact<{
  createChapterInput: CreateChapterInput;
}>;

export type CreateChapterMutation = {
  __typename?: 'Mutation';
  createChapter: {
    __typename?: 'Chapter';
    chapterType?: ChapterType | null;
    createdAt: any;
    deleted: boolean;
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
  };
};

export type GetChapterDetailsQueryVariables = Exact<{
  chapterId: Scalars['Int']['input'];
}>;

export type GetChapterDetailsQuery = {
  __typename?: 'Query';
  chapter?: {
    __typename?: 'Chapter';
    keyLearning?: string | null;
    chapterType?: ChapterType | null;
    coursesId?: number | null;
    createdAt: any;
    deleted: boolean;
    id: string;
    link?: string | null;
    name: string;
    slug: string;
    updatedAt: string;
    Questions?: Array<{
      __typename?: 'Question';
      answer?: string | null;
      answersOptions?: Array<string | null> | null;
      correctAnswer?: string | null;
      id?: string | null;
      mark?: number | null;
      question: string;
      slug: string;
    } | null> | null;
    courses?: {
      __typename?: 'Course';
      median: CourseMedian;
      name: string;
      price: string;
      id: string;
      imageUrl?: string | null;
      code: string;
      instructor?: { __typename?: 'User'; name: string; id: number } | null;
    } | null;
  } | null;
};

export type UpdateChapterMutationVariables = Exact<{
  updateChapterInput: UpdateChapterInput;
}>;

export type UpdateChapterMutation = {
  __typename?: 'Mutation';
  updateChapter: {
    __typename?: 'Chapter';
    chapterType?: ChapterType | null;
    coursesId?: number | null;
    createdAt: any;
    id: string;
    keyLearning?: string | null;
    link?: string | null;
    name: string;
    slug: string;
  };
};

export type RemoveChapterMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type RemoveChapterMutation = {
  __typename?: 'Mutation';
  removeChapter: { __typename?: 'MessageResponse'; message: string };
};

export type CreateCourseEvaluationMutationVariables = Exact<{
  createCourseEvaluationInput: CreateCourseEvaluationInput;
}>;

export type CreateCourseEvaluationMutation = {
  __typename?: 'Mutation';
  createCourseEvaluation: { __typename?: 'CourseEvaluation'; id: string; slug: string };
};

export type GetCourseEvaluationQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GetCourseEvaluationQuery = {
  __typename?: 'Query';
  courseEvaluation?: {
    __typename?: 'CourseEvaluation';
    id: string;
    slug: string;
    remarks?: string | null;
    language?: Language | null;
    courseScheduleStudentsId: number;
    createdAt: any;
    course: {
      __typename?: 'Course';
      id: string;
      name: string;
      instructor?: { __typename?: 'User'; id: number; name: string } | null;
    };
    questions: Array<{
      __typename?: 'FormattedCourseEvaluationQuestions';
      category: string;
      questions: Array<{
        __typename?: 'CourseEvaluationQuestions';
        id: number;
        slug: string;
        type: string;
        answer?: string | null;
        questions: Array<{
          __typename?: 'MultiLanguageQuestions';
          id: string;
          language: Language;
          question: string;
          questionType: string;
          options: Array<string>;
        }>;
      }>;
    }>;
  } | null;
};

export type UpdateCourseEvaluationMutationVariables = Exact<{
  updateCourseEvaluationInput: UpdateCourseEvaluationInput;
}>;

export type UpdateCourseEvaluationMutation = {
  __typename?: 'Mutation';
  updateCourseEvaluation: { __typename?: 'CourseEvaluation'; id: string; slug: string };
};

export type CourseEvaluationsListQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  filter?: InputMaybe<CourseEvaluationFilter>;
}>;

export type CourseEvaluationsListQuery = {
  __typename?: 'Query';
  courseEvaluations: {
    __typename?: 'PaginatedCourseEvaluations';
    data: Array<{
      __typename?: 'CourseEvaluation';
      id: string;
      language?: Language | null;
      slug: string;
      createdAt: any;
      course: {
        __typename?: 'Course';
        id: string;
        name: string;
        instructor?: { __typename?: 'User'; id: number; name: string } | null;
      };
      courseLevel: { __typename?: 'CourseLevel'; id: string; title: string };
      student: { __typename?: 'User'; id: number; name: string };
    } | null>;
    paging: {
      __typename?: 'PagingData';
      size: number;
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      orderBy?: string | null;
      orderField?: string | null;
      nextPage?: number | null;
      previousPage?: number | null;
    };
  };
};

export type CreateCourseLevelMutationVariables = Exact<{
  createCourseLevelInput: CreateCourseLevelInput;
}>;

export type CreateCourseLevelMutation = {
  __typename?: 'Mutation';
  createCourseLevel: {
    __typename?: 'CourseLevel';
    coursesId?: number | null;
    id: string;
    level: number;
    title: string;
    slug: string;
  };
};

export type UpdateCourseLevelMutationVariables = Exact<{
  updateCourseLevelInput: UpdateCourseLevelInput;
}>;

export type UpdateCourseLevelMutation = {
  __typename?: 'Mutation';
  updateCourseLevel: {
    __typename?: 'CourseLevel';
    id: string;
    level: number;
    slug: string;
    title: string;
    coursesId?: number | null;
  };
};

export type GetCourseLevelDetailsQueryVariables = Exact<{
  courseLevelId: Scalars['Int']['input'];
}>;

export type GetCourseLevelDetailsQuery = {
  __typename?: 'Query';
  courseLevel?: {
    __typename?: 'CourseLevel';
    coursesId?: number | null;
    id: string;
    slug: string;
    level: number;
    title: string;
    course?: {
      __typename?: 'Course';
      name: string;
      id: string;
      imageUrl?: string | null;
      expireIn?: number | null;
      examRequired: boolean;
      endDate?: any | null;
      deleted: boolean;
      createdAt: any;
      courseStatus: CourseStatus;
      courseCategoryId?: number | null;
      median: CourseMedian;
      code: string;
      mediumOfExam?: ExamMedium | null;
      maxStudentsAllowed?: number | null;
    } | null;
    chapters: Array<{
      __typename?: 'Chapter';
      id: string;
      createdAt: any;
      coursesId?: number | null;
      chapterType?: ChapterType | null;
      keyLearning?: string | null;
      link?: string | null;
      name: string;
      slug: string;
      updatedAt: string;
      Media?: Array<{
        __typename?: 'Media';
        id: string;
        name: string;
        slug: string;
        thumbnail?: string | null;
        chaptersId: number;
        createdAt: any;
      } | null> | null;
    } | null>;
    exams: Array<{
      __typename?: 'Exam';
      achivedMark?: number | null;
      createdAt: any;
      coursesId?: number | null;
      deleted: boolean;
      id: string;
      maximumMark?: number | null;
      name?: string | null;
      passMark?: number | null;
      slug: string;
      updatedAt: string;
    } | null>;
    courseSchedule?: Array<{
      __typename?: 'CourseSchedule';
      coursesId?: string | null;
      days: Array<string>;
      deleted: boolean;
      endDate?: any | null;
      endTime?: any | null;
      id: string;
      courseLevelId?: string | null;
      name: string;
      slug: string;
      startDate?: any | null;
      startTime?: any | null;
      updatedAt: any;
      createdAt: any;
    } | null> | null;
  } | null;
};

export type GetCourseLevelResourcesQueryVariables = Exact<{
  courseLevelId: Scalars['Int']['input'];
}>;

export type GetCourseLevelResourcesQuery = {
  __typename?: 'Query';
  courseLevel?: {
    __typename?: 'CourseLevel';
    resources?: Array<{
      __typename?: 'CourseResource';
      name: string;
      id: string;
      memeType: string;
      slug: string;
      url: string;
    } | null> | null;
  } | null;
};

export type GetCourseDetailsWithLevelIdQueryVariables = Exact<{
  courseLevelId: Scalars['Int']['input'];
}>;

export type GetCourseDetailsWithLevelIdQuery = {
  __typename?: 'Query';
  courseLevel?: {
    __typename?: 'CourseLevel';
    coursesId?: number | null;
    id: string;
    slug: string;
    level: number;
    title: string;
    course?: {
      __typename?: 'Course';
      id: string;
      slug: string;
      name: string;
      examRequired: boolean;
      type: CourseType;
      median: CourseMedian;
      mediumOfExam?: ExamMedium | null;
      courseCategoryId?: number | null;
      startDate?: any | null;
      endDate?: any | null;
      Summary?: string | null;
      imageUrl?: string | null;
      instructorId?: number | null;
      courseStatus: CourseStatus;
      expireIn?: number | null;
      maxStudentsAllowed?: number | null;
    } | null;
  } | null;
};

export type GetCourseLevelNotAttendedUserQueryVariables = Exact<{
  courseLevelId: Scalars['Int']['input'];
  designationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
}>;

export type GetCourseLevelNotAttendedUserQuery = {
  __typename?: 'Query';
  courseLevelNotAttendedUser: Array<{
    __typename?: 'UserBase';
    id: number;
    name: string;
    slug: string;
  } | null>;
};

export type GetStudentsExpiredInCourseQueryVariables = Exact<{
  courseLevelId: Scalars['Int']['input'];
  designationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
}>;

export type GetStudentsExpiredInCourseQuery = {
  __typename?: 'Query';
  getStudentsExpiredInCourse: Array<{
    __typename?: 'UserBase';
    id: number;
    name: string;
    slug: string;
  } | null>;
};

export type GetCourseResourcesQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type GetCourseResourcesQuery = {
  __typename?: 'Query';
  courseCategories: {
    __typename?: 'PaginatedCourseCategory';
    data: Array<{
      __typename?: 'CourseCategory';
      companyId: number;
      name: string;
      id?: string | null;
      createdAt: any;
      slug: string;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type CreateCourseResourceMutationVariables = Exact<{
  createCourseResourceInput: CreateCourseResourceInput;
}>;

export type CreateCourseResourceMutation = {
  __typename?: 'Mutation';
  createCourseResource: {
    __typename?: 'CourseResource';
    coursesId: number;
    memeType: string;
    name: string;
    url: string;
  };
};

export type RemoveCourseResourceMutationVariables = Exact<{
  removeCourseResourceId: Scalars['Int']['input'];
}>;

export type RemoveCourseResourceMutation = {
  __typename?: 'Mutation';
  removeCourseResource?: { __typename?: 'CourseResource'; id: string; name: string } | null;
};

export type CreateCourseScheduleMutationVariables = Exact<{
  createCourseScheduleInput: CreateCourseScheduleInput;
}>;

export type CreateCourseScheduleMutation = {
  __typename?: 'Mutation';
  createCourseSchedule: {
    __typename?: 'CourseSchedule';
    coursesId?: string | null;
    days: Array<string>;
    endDate?: any | null;
    endTime?: any | null;
    id: string;
    name: string;
    slug: string;
    startDate?: any | null;
    startTime?: any | null;
    updatedAt: any;
    isLocked?: boolean | null;
    designationIds?: Array<number> | null;
  };
};

export type UpdateCourseScheduleMutationVariables = Exact<{
  updateCourseScheduleInput: UpdateCourseScheduleInput;
}>;

export type UpdateCourseScheduleMutation = {
  __typename?: 'Mutation';
  updateCourseSchedule: {
    __typename?: 'CourseSchedule';
    id: string;
    name: string;
    coursesId?: string | null;
    courseLevelId?: string | null;
    isLocked?: boolean | null;
    designationIds?: Array<number> | null;
  };
};

export type GetCourseScheduleDetailsQueryVariables = Exact<{
  courseScheduleId: Scalars['Int']['input'];
}>;

export type GetCourseScheduleDetailsQuery = {
  __typename?: 'Query';
  courseSchedule?: {
    designationIds(designationIds: any): unknown;
    __typename?: 'CourseSchedule';
    id: string;
    name: string;
    isLocked?: boolean | null;
    startDate?: any | null;
    slug: string;
    startTime?: any | null;
    days: Array<string>;
    endDate?: any | null;
    endTime?: any | null;
    coursesId?: string | null;
    courseLevelId?: string | null;
    attendanceSheet?: string | null;
    attendanceProof?: string | null;
    attendanceProofCreatedOn?: any | null;
    examId?: number | null;
    students?: Array<{
      __typename?: 'ScheduleStudent';
      id: string;
      userId: number;
      name: string;
    } | null> | null;
    course?: {
      __typename?: 'Course';
      median: CourseMedian;
      maxStudentsAllowed?: number | null;
    } | null;
  } | null;
  designationIds?: Array<number> | null;
};

export type GetCourseScheduleQueryVariables = Exact<{
  courseScheduleId: Scalars['Int']['input'];
}>;

export type GetCourseScheduleQuery = {
  __typename?: 'Query';
  courseSchedule?: {
    __typename?: 'CourseSchedule';
    id: string;
    name: string;
    startDate?: any | null;
    slug: string;
    startTime?: any | null;
    days: Array<string>;
    endDate?: any | null;
    endTime?: any | null;
    coursesId?: string | null;
    courseLevelId?: string | null;
    examId?: number | null;
    isLocked?: boolean | null;
    designationIds?: Array<number> | null;
  } | null;
};

export type GetMyStudentSchedulesQueryVariables = Exact<{
  input?: InputMaybe<GetMyStudentSchedulesInput>;
}>;

export type GetMyStudentSchedulesQuery = {
  __typename?: 'Query';
  getMyStudentSchedules: Array<{
    __typename?: 'ScheduleStudent';
    userId: number;
    name: string;
    status: ScheduleStudentStatus;
    id: string;
    courseScheduleId: number;
    slug: string;
    completionPercentage: number;
    courseSchedule: {
      __typename?: 'CourseSchedule';
      endTime?: any | null;
      endDate?: any | null;
      name: string;
      days: Array<string>;
      startDate?: any | null;
      startTime?: any | null;
      courseLevelId?: string | null;
      coursesId?: string | null;
      course?: { __typename?: 'Course'; name: string; id: string } | null;
      courseLevel?: { __typename?: 'CourseLevel'; id: string; title: string } | null;
    };
    exams?: Array<{
      __typename?: 'AttendedExam';
      id: string;
      name?: string | null;
      status: AttendExamStatus;
      slug: string;
    } | null> | null;
  } | null>;
};

export type CourseSchedulesQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  courseScheduleFilter?: InputMaybe<CourseScheduleFilter>;
}>;

export type CourseSchedulesQuery = {
  __typename?: 'Query';
  courseSchedules: {
    __typename?: 'CourseScheduleResponse';
    data: Array<{
      __typename?: 'CourseSchedule';
      endDate?: any | null;
      endTime?: any | null;
      id: string;
      name: string;
      slug: string;
      startDate?: any | null;
      startTime?: any | null;
      course?: { __typename?: 'Course'; id: string; name: string } | null;
      courseLevel?: { __typename?: 'CourseLevel'; id: string; level: number; title: string } | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      size: number;
      totalItems: number;
      totalPages: number;
      previousPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      nextPage?: number | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      currentPage: number;
    };
  };
};

export type SendCertificateMutationVariables = Exact<{
  sendCertificateInput: SendCertificateInput;
}>;

export type SendCertificateMutation = {
  __typename?: 'Mutation';
  sendCertificate?: { __typename?: 'MessageResponse'; message: string } | null;
};

export type GetAttendanceSheetMutationVariables = Exact<{
  getAttendanceSheetInput?: InputMaybe<GetAttendanceSheetInput>;
}>;

export type GetAttendanceSheetMutation = {
  __typename?: 'Mutation';
  getAttendanceSheet?: { __typename?: 'AttendanceSheetResponse'; url?: string | null } | null;
};

export type GetCourseScheduleOnlyQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  courseScheduleFilter?: InputMaybe<CourseScheduleFilter>;
}>;

export type GetCourseScheduleOnlyQuery = {
  __typename?: 'Query';
  courseSchedules: {
    __typename?: 'CourseScheduleResponse';
    data: Array<{
      __typename?: 'CourseSchedule';
      id: string;
      name: string;
      startDate?: any | null;
      slug: string;
      startTime?: any | null;
      days: Array<string>;
      endDate?: any | null;
      endTime?: any | null;
      coursesId?: string | null;
      courseLevelId?: string | null;
      examId?: number | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      size: number;
      totalItems: number;
      totalPages: number;
      previousPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      nextPage?: number | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      currentPage: number;
    };
  };
};

export type GetCoursesListQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  filter?: InputMaybe<CourseFilter>;
}>;

export type GetCoursesListQuery = {
  __typename?: 'Query';
  courses: {
    __typename?: 'PaginatedCourses';
    data: Array<{
      __typename?: 'Course';
      startDate?: any | null;
      price: string;
      name: string;
      median: CourseMedian;
      mediumOfExam?: ExamMedium | null;
      imageUrl?: string | null;
      id: string;
      examRequired: boolean;
      endDate?: any | null;
      createdAt: any;
      courseStatus: CourseStatus;
      courseCategoryId?: number | null;
      type: CourseType;
      code: string;
      classLink?: string | null;
      courseCategory?: { __typename?: 'CourseCategory'; name: string; id?: string | null } | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
      orderField?: string | null;
    };
  };
};

export type GetCourseDetailsQueryVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;

export type GetCourseDetailsQuery = {
  __typename?: 'Query';
  course?: {
    __typename?: 'Course';
    Summary?: string | null;
    classLink?: string | null;
    code: string;
    courseCategoryId?: number | null;
    courseStatus: CourseStatus;
    createdAt: any;
    endDate?: any | null;
    examRequired: boolean;
    id: string;
    imageUrl?: string | null;
    instructorId?: number | null;
    median: CourseMedian;
    mediumOfExam?: ExamMedium | null;
    name: string;
    price: string;
    slug: string;
    startDate?: any | null;
    type: CourseType;
    updatedAt: string;
    expireIn?: number | null;
    certificateType: CourseCertificateType;
    caaApprovalNo?: string | null;
    functionName?: string | null;
    maxStudentsAllowed?: number | null;
    courseAssessmentSkills: Array<{
      __typename?: 'CourseAssessmentSkill';
      id: number;
      assessmentSkillsId: number;
    } | null>;
    courseCategory?: {
      __typename?: 'CourseCategory';
      id?: string | null;
      name: string;
      slug: string;
    } | null;
    instructor?: {
      __typename?: 'User';
      roleId?: number | null;
      qualification?: string | null;
      profileImageUrl?: string | null;
      phone?: string | null;
      passwordUrl?: string | null;
      passportUrl?: string | null;
      name: string;
      managerId?: number | null;
      imageUrl?: string | null;
      id: number;
    } | null;
    resources?: Array<{
      __typename?: 'CourseResource';
      id: string;
      memeType: string;
      name: string;
      deleted: boolean;
      createdAt: any;
      coursesId: number;
      url: string;
    } | null> | null;
    Chapters?: Array<{
      __typename?: 'Chapter';
      chapterType?: ChapterType | null;
      coursesId?: number | null;
      id: string;
      link?: string | null;
      name: string;
      slug: string;
      Questions?: Array<{
        __typename?: 'Question';
        answersOptions?: Array<string | null> | null;
        chaptersId: number;
        correctAnswer?: string | null;
        createdAt: any;
        id?: string | null;
        mark?: number | null;
        question: string;
        slug: string;
      } | null> | null;
    } | null> | null;
    exams?: Array<{
      __typename?: 'Exam';
      id: string;
      maximumMark?: number | null;
      name?: string | null;
      slug: string;
      passMark?: number | null;
      updatedAt: string;
    } | null> | null;
    schedules: Array<{
      __typename?: 'CourseSchedule';
      createdAt: any;
      days: Array<string>;
      endDate?: any | null;
      endTime?: any | null;
      id: string;
      name: string;
      slug: string;
      startDate?: any | null;
      startTime?: any | null;
      updatedAt: any;
    } | null>;
  } | null;
};

export type CreateCourseMutationVariables = Exact<{
  createCourseInput: CreateCourseInput;
}>;

export type CreateCourseMutation = {
  __typename?: 'Mutation';
  createCourse: { __typename?: 'Course'; id: string; name: string };
};

export type UpdateCourseMutationVariables = Exact<{
  updateCourseInput: UpdateCourseInput;
}>;

export type UpdateCourseMutation = {
  __typename?: 'Mutation';
  updateCourse: { __typename?: 'Course'; id: string; name: string };
};

export type GetCourseLevelsQueryVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;

export type GetCourseLevelsQuery = {
  __typename?: 'Query';
  course?: {
    __typename?: 'Course';
    id: string;
    name: string;
    createdAt: any;
    code: string;
    median: CourseMedian;
    imageUrl?: string | null;
    levels: Array<{
      __typename?: 'CourseLevel';
      id: string;
      level: number;
      title: string;
      slug: string;
      coursesId?: number | null;
    } | null>;
    instructor?: {
      __typename?: 'User';
      roleId?: number | null;
      qualification?: string | null;
      profileImageUrl?: string | null;
      phone?: string | null;
      passwordUrl?: string | null;
      passportUrl?: string | null;
      name: string;
      managerId?: number | null;
      imageUrl?: string | null;
      id: number;
    } | null;
  } | null;
};

export type GeCoursesNamesQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  filter?: InputMaybe<CourseFilter>;
}>;

export type GeCoursesNamesQuery = {
  __typename?: 'Query';
  courses: {
    __typename?: 'PaginatedCourses';
    data: Array<{
      __typename?: 'Course';
      id: string;
      name: string;
      levels: Array<{
        __typename?: 'CourseLevel';
        id: string;
        level: number;
        title: string;
        courseSchedule?: Array<{
          __typename?: 'CourseSchedule';
          name: string;
          id: string;
          endTime?: any | null;
          endDate?: any | null;
          startDate?: any | null;
          startTime?: any | null;
          isLocked?: boolean | null;
        } | null> | null;
      } | null>;
    } | null>;
  };
};

export type GetCourseDataQueryVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;

export type GetCourseDataQuery = {
  __typename?: 'Query';
  course?: {
    __typename?: 'Course';
    id: string;
    slug: string;
    name: string;
    code: string;
    price: string;
    classLink?: string | null;
    examRequired: boolean;
    type: CourseType;
    median: CourseMedian;
    mediumOfExam?: ExamMedium | null;
    courseCategoryId?: number | null;
    startDate?: any | null;
    endDate?: any | null;
    Summary?: string | null;
    imageUrl?: string | null;
    instructorId?: number | null;
    courseStatus: CourseStatus;
  } | null;
};

export type GeCoursesNamesOnlyQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  filter?: InputMaybe<CourseFilter>;
}>;

export type GeCoursesNamesOnlyQuery = {
  __typename?: 'Query';
  courses: {
    __typename?: 'PaginatedCourses';
    data: Array<{ __typename?: 'Course'; id: string; name: string } | null>;
  };
};

export type RemoveCourseMutationVariables = Exact<{
  removeCourseId: Scalars['Int']['input'];
}>;

export type RemoveCourseMutation = {
  __typename?: 'Mutation';
  removeCourse?: { __typename?: 'Course'; id: string } | null;
};

export type GetDepartmentsQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type GetDepartmentsQuery = {
  __typename?: 'Query';
  departments: {
    __typename?: 'PaginatedDepartments';
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderField?: string | null;
      orderBy?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<{
      __typename?: 'Department';
      companyId?: number | null;
      createdAt?: any | null;
      id: string;
      name: string;
      slug: string;
    } | null>;
  };
};

export type CreateDepartmentMutationVariables = Exact<{
  createDepartmentInput: CreateDepartmentInput;
}>;

export type CreateDepartmentMutation = {
  __typename?: 'Mutation';
  createDepartment: {
    __typename?: 'Department';
    createdAt?: any | null;
    id: string;
    name: string;
    slug: string;
  };
};

export type UpdateDepartmentMutationVariables = Exact<{
  updateDepartmentInput: UpdateDepartmentInput;
}>;

export type UpdateDepartmentMutation = {
  __typename?: 'Mutation';
  updateDepartment: {
    __typename?: 'Department';
    createdAt?: any | null;
    id: string;
    name: string;
    slug: string;
  };
};

export type GetDesignationsQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type GetDesignationsQuery = {
  __typename?: 'Query';
  designations: {
    __typename?: 'PaginatedDesignations';
    data: Array<{ __typename?: 'Designation'; id: string; name: string; slug: string } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalPages: number;
      totalItems: number;
    };
  };
};

export type CreateDesignationMutationVariables = Exact<{
  createDesignationInput: CreateDesignationInput;
}>;

export type CreateDesignationMutation = {
  __typename?: 'Mutation';
  createDesignation: { __typename?: 'Designation'; id: string; name: string; slug: string };
};

export type UpdateDesignationMutationVariables = Exact<{
  updateDesignationInput: UpdateDesignationInput;
}>;

export type UpdateDesignationMutation = {
  __typename?: 'Mutation';
  updateDesignation: { __typename?: 'Designation'; id: string; name: string };
};

export type CreateExamMutationVariables = Exact<{
  createExamInput: CreateExamInput;
}>;

export type CreateExamMutation = {
  __typename?: 'Mutation';
  createExam: {
    __typename?: 'Exam';
    achivedMark?: number | null;
    coursesId?: number | null;
    createdAt: any;
    deleted: boolean;
    id: string;
    maximumMark?: number | null;
    name?: string | null;
    passMark?: number | null;
    updatedAt: string;
    slug: string;
  };
};

export type GetExamQueryVariables = Exact<{
  examId: Scalars['Int']['input'];
}>;

export type GetExamQuery = {
  __typename?: 'Query';
  exam?: {
    __typename?: 'Exam';
    slug: string;
    passMark?: number | null;
    name?: string | null;
    id: string;
    maximumMark?: number | null;
    createdAt: any;
    coursesId?: number | null;
    type?: ExamMedium | null;
    courseLevelId?: string | null;
    Questions?: Array<{
      __typename?: 'Question';
      answer?: string | null;
      answerType?: AnswerType | null;
      FailPromt?: string | null;
      answersOptions?: Array<string | null> | null;
      correctAnswer?: string | null;
      examsId?: number | null;
      id?: string | null;
      mark?: number | null;
      question: string;
      slug: string;
      successPromt?: string | null;
      orderNo?: number | null;
      scenarioId?: number | null;
      media?: {
        __typename?: 'Media';
        id: string;
        name: string;
        url?: string | null;
        thumbnail?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type GetExamsQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  examFilter?: InputMaybe<ExamFilter>;
}>;

export type GetExamsQuery = {
  __typename?: 'Query';
  exams: {
    __typename?: 'PaginatedExams';
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
    data: Array<{
      __typename?: 'Exam';
      coursesId?: number | null;
      createdAt: any;
      id: string;
      maximumMark?: number | null;
      name?: string | null;
      passMark?: number | null;
      slug: string;
      updatedAt: string;
      cource: { __typename?: 'Course'; id: string; name: string };
    } | null>;
  };
};

export type UpdateExamMutationVariables = Exact<{
  updateExamInput: UpdateExamInput;
}>;

export type UpdateExamMutation = {
  __typename?: 'Mutation';
  updateExam: {
    __typename?: 'Exam';
    id: string;
    name?: string | null;
    maximumMark?: number | null;
    coursesId?: number | null;
    passMark?: number | null;
    slug: string;
    updatedAt: string;
    courseLevelId?: string | null;
  };
};

export type CreateQuestionScenarioMutationVariables = Exact<{
  createQuestionScenarioInput: CreateQuestionScenarioInput;
}>;

export type CreateQuestionScenarioMutation = {
  __typename?: 'Mutation';
  createQuestionScenario: {
    __typename?: 'QuestionScenario';
    id: string;
    deleted: boolean;
    createdAt: any;
    name: string;
    slug: string;
    updatedAt: string;
  };
};

export type UpdateQuestionScenarioMutationVariables = Exact<{
  updateQuestionScenarioInput: UpdateQuestionScenarioInput;
}>;

export type UpdateQuestionScenarioMutation = {
  __typename?: 'Mutation';
  updateQuestionScenario: {
    __typename?: 'QuestionScenario';
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
    createdAt: any;
  };
};

export type GetQuestionScenariosQueryVariables = Exact<{
  filter?: InputMaybe<QuestionScenarioFilters>;
}>;

export type GetQuestionScenariosQuery = {
  __typename?: 'Query';
  questionScenarios: Array<{
    __typename?: 'QuestionScenario';
    id: string;
    levelId: number;
    name: string;
    scenario: string;
    slug: string;
    media?: {
      __typename?: 'Media';
      id: string;
      name: string;
      url?: string | null;
      thumbnail?: string | null;
    } | null;
  } | null>;
};

export type GetCourseLevelExamsQueryVariables = Exact<{
  courseLevelId: Scalars['Int']['input'];
}>;

export type GetCourseLevelExamsQuery = {
  __typename?: 'Query';
  courseLevel?: {
    __typename?: 'CourseLevel';
    exams: Array<{
      __typename?: 'Exam';
      id: string;
      name?: string | null;
      maximumMark?: number | null;
      passMark?: number | null;
      slug: string;
      type?: ExamMedium | null;
    } | null>;
  } | null;
};

export type MakeFilePublicMutationVariables = Exact<{
  path: Scalars['String']['input'];
}>;

export type MakeFilePublicMutation = {
  __typename?: 'Mutation';
  makeFilePublic: { __typename?: 'MakePublicResponse'; url: string };
};

export type GetAllPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPermissionsQuery = {
  __typename?: 'Query';
  permissions: {
    __typename?: 'PaginatedPermissions';
    data: Array<{
      __typename?: 'Permission';
      id: string;
      deleted?: boolean | null;
      name?: string | null;
      roleId?: number | null;
      slug: string;
      updatedAt?: string | null;
    } | null>;
  };
};

export type CreateUserNewMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type CreateUserNewMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    id: number;
    idNumber: string;
    idUrl?: string | null;
    companyId?: number | null;
  };
};

export type GetNotificationsQueryVariables = Exact<{
  filter?: InputMaybe<NotificationFilter>;
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type GetNotificationsQuery = {
  __typename?: 'Query';
  notifications: {
    __typename?: 'PaginatedNotifications';
    data: Array<{
      __typename?: 'Notification';
      path?: string | null;
      contextId?: number | null;
      contextType?: string | null;
      createdAt: any;
      id: string;
      message: string;
      read: boolean;
      readOn?: any | null;
      slug: string;
      receiverId: number;
      title: string;
      updatedAt?: any | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      nextPage?: number | null;
      hasPreviousPage: boolean;
      orderBy?: string | null;
      orderField?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type MarkNotificationAsReadMutationVariables = Exact<{ [key: string]: never }>;

export type MarkNotificationAsReadMutation = {
  __typename?: 'Mutation';
  markNotificationAsRead?: { __typename?: 'MessageResponse'; message: string } | null;
};

export type GetUnreadNotificationCountQueryVariables = Exact<{ [key: string]: never }>;

export type GetUnreadNotificationCountQuery = {
  __typename?: 'Query';
  getUnreadNotificationCount: { __typename?: 'UnReadNotificationCountResponse'; count: number };
};

export type GetAttendanceReportQueryVariables = Exact<{
  attendanceReportFilter?: InputMaybe<AttendanceReportFilter>;
}>;

export type GetAttendanceReportQuery = {
  __typename?: 'Query';
  attendanceReport?: {
    __typename?: 'ReportResponse';
    filter: any;
    message: string;
    report: string;
    success: boolean;
  } | null;
};

export type GetReportListQueryVariables = Exact<{ [key: string]: never }>;

export type GetReportListQuery = {
  __typename?: 'Query';
  reportList: Array<{
    __typename?: 'ReportListItem';
    title: string;
    description?: string | null;
    slug: string;
  }>;
};

export type GetReportListItemQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type GetReportListItemQuery = {
  __typename?: 'Query';
  reportListItem: {
    __typename?: 'ReportListItem';
    description?: string | null;
    slug: string;
    title: string;
    columns: Array<{
      __typename?: 'TableColumn';
      dataIndex: string;
      key: string;
      title: string;
      type: ColumnType;
      bgColor?: string | null;
      color?: string | null;
    }>;
    filters?: Array<{
      __typename?: 'Filter';
      label: string;
      name: string;
      type: ReportFilterType;
      rules?: Array<any | null> | null;
      options: Array<{ __typename?: 'FilterSelectOption'; label: string; value: string } | null>;
    } | null> | null;
  };
};

export type GenerateReportQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  filter?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type GenerateReportQuery = {
  __typename?: 'Query';
  generateReport: {
    __typename?: 'ReportResponse';
    filter: any;
    message: string;
    report: string;
    reportData: Array<any>;
    success: boolean;
    columns?: Array<{
      __typename?: 'TableColumn';
      dataIndex: string;
      key: string;
      title: string;
      type: ColumnType;
      bgColor?: string | null;
      color?: string | null;
    }> | null;
  };
};

export type CreateRequestMutationVariables = Exact<{
  createRequestInput: CreateRequestInput;
}>;

export type CreateRequestMutation = {
  __typename?: 'Mutation';
  createRequest: {
    __typename?: 'Request';
    id: string;
    rejectedOn?: any | null;
    remarks?: string | null;
    requestedOn?: any | null;
    type: RequestType;
    status: RequestStatus;
    slug: string;
    userId?: number | null;
    approvedOn?: any | null;
  };
};

export type GetRequestsQueryVariables = Exact<{
  findRequestInput: FindRequestInput;
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type GetRequestsQuery = {
  __typename?: 'Query';
  requests: {
    __typename?: 'PaginatedRequests';
    data: Array<{
      __typename?: 'Request';
      approvedOn?: any | null;
      contextId?: number | null;
      context?: ReqContext | null;
      coursesId?: number | null;
      createdAt: any;
      creatorId: number;
      id: string;
      rejectedOn?: any | null;
      remarks?: string | null;
      requestedOn?: any | null;
      slug: string;
      status: RequestStatus;
      type: RequestType;
      updatedAt?: any | null;
      userId?: number | null;
      reason?: string | null;
      user?: { __typename?: 'User'; id: number; name: string } | null;
      attendedExam?: { __typename?: 'AttendedExam'; id: string; slug: string } | null;
    } | null>;
  };
};

export type UpdateRequestMutationVariables = Exact<{
  updateRequestInput: UpdateRequestInput;
}>;

export type UpdateRequestMutation = {
  __typename?: 'Mutation';
  updateRequest: { __typename?: 'Request'; id: string };
};

export type UpdateScheduleProgressMutationVariables = Exact<{
  updateScheduleProgressInput: UpdateScheduleProgressInput;
}>;

export type UpdateScheduleProgressMutation = {
  __typename?: 'Mutation';
  updateScheduleProgress: {
    __typename?: 'ScheduleProgress';
    id: string;
    courseScheduleStudentId: number;
    slug: string;
    status: CourseProgressStatus;
    coursesId: number;
    courseLevelId: number;
    chaptersId: number;
    activityStatus: CourseProgressStatus;
    createdAt: any;
    userId: number;
  };
};

export type CreateUploadSignedUrlMutationVariables = Exact<{
  createUploadSignedUrlInput: CreateUploadSignedUrlInput;
}>;

export type CreateUploadSignedUrlMutation = {
  __typename?: 'Mutation';
  createUploadSignedUrl: { __typename?: 'UploadSignedUrlResponse'; signedUrl: string; url: string };
};

export type GetScheduleStudentQueryVariables = Exact<{
  slug: Scalars['ID']['input'];
}>;

export type GetScheduleStudentQuery = {
  __typename?: 'Query';
  scheduleStudent?: {
    __typename?: 'ScheduleStudent';
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
    courseScheduleId: number;
    completionPercentage: number;
    status: ScheduleStudentStatus;
    courseSchedule: {
      __typename?: 'CourseSchedule';
      id: string;
      endDate?: any | null;
      endTime?: any | null;
      days: Array<string>;
      courseLevelId?: string | null;
      coursesId?: string | null;
      startDate?: any | null;
      startTime?: any | null;
      name: string;
      course?: {
        __typename?: 'Course';
        name: string;
        price: string;
        code: string;
        courseCategoryId?: number | null;
        median: CourseMedian;
        courseStatus: CourseStatus;
        id: string;
        examRequired: boolean;
        imageUrl?: string | null;
        instructorId?: number | null;
        type: CourseType;
        mediumOfExam?: ExamMedium | null;
        courseCategory?: { __typename?: 'CourseCategory'; id?: string | null; name: string } | null;
        instructor?: { __typename?: 'User'; id: number; name: string } | null;
      } | null;
      courseLevel?: { __typename?: 'CourseLevel'; id: string; slug: string; title: string } | null;
    };
    exams?: Array<{
      __typename?: 'AttendedExam';
      id: string;
      name?: string | null;
      status: AttendExamStatus;
      slug: string;
      createdAt: any;
      achivedMark?: number | null;
      totalMark?: number | null;
    } | null> | null;
  } | null;
};

export type UpdateScheduleStudentMutationVariables = Exact<{
  updateScheduleStudentInput: UpdateScheduleStudentInput;
}>;

export type UpdateScheduleStudentMutation = {
  __typename?: 'Mutation';
  updateScheduleStudent: {
    __typename?: 'ScheduleStudent';
    id: string;
    name: string;
    slug: string;
    courseScheduleId: number;
  };
};

export type GetScheduleStudentDetailsQueryVariables = Exact<{
  slug: Scalars['ID']['input'];
}>;

export type GetScheduleStudentDetailsQuery = {
  __typename?: 'Query';
  scheduleStudent?: {
    __typename?: 'ScheduleStudent';
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
    courseScheduleId: number;
    completionPercentage: number;
    status: ScheduleStudentStatus;
    progress?: Array<{
      __typename?: 'ScheduleProgress';
      chaptersId: number;
      activityStatus: CourseProgressStatus;
      coursesId: number;
      courseLevelId: number;
      createdAt: any;
      deleted: boolean;
      deletedAt?: string | null;
      id: string;
      courseScheduleStudentId: number;
      status: CourseProgressStatus;
      lessonStatus: CourseProgressStatus;
    } | null> | null;
    courseSchedule: {
      __typename?: 'CourseSchedule';
      id: string;
      endDate?: any | null;
      endTime?: any | null;
      days: Array<string>;
      courseLevelId?: string | null;
      coursesId?: string | null;
      startDate?: any | null;
      startTime?: any | null;
      name: string;
      course?: {
        __typename?: 'Course';
        name: string;
        price: string;
        code: string;
        courseCategoryId?: number | null;
        median: CourseMedian;
        examRequired: boolean;
        courseStatus: CourseStatus;
        id: string;
        imageUrl?: string | null;
        instructorId?: number | null;
        Summary?: string | null;
        type: CourseType;
        courseCategory?: { __typename?: 'CourseCategory'; id?: string | null; name: string } | null;
        instructor?: { __typename?: 'User'; id: number; name: string } | null;
      } | null;
      courseLevel?: {
        __typename?: 'CourseLevel';
        id: string;
        slug: string;
        title: string;
        chapters: Array<{
          __typename?: 'Chapter';
          name: string;
          slug: string;
          link?: string | null;
          keyLearning?: string | null;
          id: string;
          createdAt: any;
          chapterType?: ChapterType | null;
          Questions?: Array<{
            __typename?: 'Question';
            answersOptions?: Array<string | null> | null;
            id?: string | null;
            question: string;
          } | null> | null;
        } | null>;
      } | null;
    };
    exams?: Array<{
      __typename?: 'AttendedExam';
      id: string;
      name?: string | null;
      status: AttendExamStatus;
      slug: string;
    } | null> | null;
  } | null;
};

export type GetScheduleStudentNameQueryVariables = Exact<{
  getScheduleStudentInput?: InputMaybe<GetScheduleStudentInput>;
}>;

export type GetScheduleStudentNameQuery = {
  __typename?: 'Query';
  scheduleStudents: Array<{
    __typename?: 'ScheduleStudent';
    id: string;
    name: string;
    userId: number;
    status: ScheduleStudentStatus;
    completionPercentage: number;
    slug: string;
    startedOn?: string | null;
    courseScheduleId: number;
    user: { __typename?: 'User'; id: number; name: string; idNumber: string };
  } | null>;
};

export type CreateScheduleStudentMutationVariables = Exact<{
  createScheduleStudentInput: CreateScheduleStudentInput;
}>;

export type CreateScheduleStudentMutation = {
  __typename?: 'Mutation';
  createScheduleStudent: { __typename?: 'ScheduleStudent'; id: string; name: string };
};

export type UserRolesQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
}>;

export type UserRolesQuery = {
  __typename?: 'Query';
  userRoles: {
    __typename?: 'PaginatedUserRoles';
    data: Array<{
      __typename?: 'UserRole';
      createdAt?: any | null;
      deleted?: boolean | null;
      id?: string | null;
      name?: string | null;
      slug?: string | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextPage?: number | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type CreateUserRoleMutationVariables = Exact<{
  createUserRoleInput: CreateUserRoleInput;
}>;

export type CreateUserRoleMutation = {
  __typename?: 'Mutation';
  createUserRole: {
    __typename?: 'UserRole';
    name?: string | null;
    slug?: string | null;
    id?: string | null;
  };
};

export type UpdateUserRoleMutationVariables = Exact<{
  updateUserRoleInput: UpdateUserRoleInput;
}>;

export type UpdateUserRoleMutation = {
  __typename?: 'Mutation';
  updateUserRole: {
    __typename?: 'UserRole';
    companyId?: number | null;
    createdAt?: any | null;
    name?: string | null;
    id?: string | null;
    slug?: string | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    id: number;
    firebaseID: string;
    email: string;
    departmentId?: number | null;
    dateOfBirth?: any | null;
    idNumber: string;
    idUrl?: string | null;
    imageUrl?: string | null;
    managerId?: number | null;
    name: string;
    passportUrl?: string | null;
    passwordUrl?: string | null;
    phone?: string | null;
    profileImageUrl?: string | null;
    qualification?: string | null;
    roleId?: number | null;
    slug?: string | null;
  };
};

export type GetUsersQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  filter?: InputMaybe<UserFilter>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'PaginatedUsers';
    data: Array<{
      __typename?: 'User';
      createdAt: any;
      dateOfBirth?: any | null;
      deleted: boolean;
      email: string;
      firebaseID: string;
      id: number;
      idNumber: string;
      idUrl?: string | null;
      imageUrl?: string | null;
      name: string;
      phone?: string | null;
      profileImageUrl?: string | null;
      qualification?: string | null;
      slug?: string | null;
      updatedAt: string;
      status?: EmployeeStatus | null;
      department?: { __typename?: 'Department'; id: string; name: string } | null;
      manager?: { __typename?: 'User'; id: number; name: string } | null;
      role?: { __typename?: 'UserRole'; id?: string | null; name?: string | null } | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
      orderField?: string | null;
    };
  };
};

export type GetUsersOnlyQueryVariables = Exact<{
  pagingInput?: InputMaybe<PagingInput>;
  filter?: InputMaybe<UserFilter>;
}>;

export type GetUsersOnlyQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'PaginatedUsers';
    data: Array<{
      __typename?: 'User';
      id: number;
      name: string;
      idNumber: string;
      status?: EmployeeStatus | null;
    } | null>;
    paging: {
      __typename?: 'PagingData';
      currentPage: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      nextPage?: number | null;
      orderBy?: string | null;
      previousPage?: number | null;
      size: number;
      totalItems: number;
      totalPages: number;
      orderField?: string | null;
    };
  };
};

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserProfileQuery = {
  __typename?: 'Query';
  getUserProfile?: {
    __typename?: 'User';
    companyId?: number | null;
    createdAt: any;
    dateOfBirth?: any | null;
    departmentId?: number | null;
    email: string;
    firebaseID: string;
    id: number;
    idUrl?: string | null;
    idNumber: string;
    imageUrl?: string | null;
    managerId?: number | null;
    name: string;
    passportUrl?: string | null;
    passwordUrl?: string | null;
    phone?: string | null;
    profileImageUrl?: string | null;
    qualification?: string | null;
    roleId?: number | null;
    updatedAt: string;
    slug?: string | null;
    role?: { __typename?: 'UserRole'; id?: string | null; name?: string | null } | null;
  } | null;
};

export type UpdateUserProfileMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;

export type UpdateUserProfileMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    companyId?: number | null;
    createdAt: any;
    dateOfBirth?: any | null;
    departmentId?: number | null;
    email: string;
    firebaseID: string;
    id: number;
    idUrl?: string | null;
    idNumber: string;
    imageUrl?: string | null;
    managerId?: number | null;
    name: string;
    passportUrl?: string | null;
    passwordUrl?: string | null;
    phone?: string | null;
    profileImageUrl?: string | null;
    qualification?: string | null;
    roleId?: number | null;
    updatedAt: string;
    slug?: string | null;
  };
};

export type GetUserDetailsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type GetUserDetailsQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    companyId?: number | null;
    createdAt: any;
    dateOfBirth?: any | null;
    departmentId?: number | null;
    email: string;
    firebaseID: string;
    id: number;
    idNumber: string;
    idUrl?: string | null;
    imageUrl?: string | null;
    managerId?: number | null;
    name: string;
    passportUrl?: string | null;
    passwordUrl?: string | null;
    phone?: string | null;
    profileImageUrl?: string | null;
    qualification?: string | null;
    roleId?: number | null;
    slug?: string | null;
    type?: EmployeeType | null;
    updatedAt: string;
    institution?: string | null;
    status?: EmployeeStatus | null;
    signature?: string | null;
    designationId?: number | null;
  } | null;
};

export type UpdatePasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;

export type UpdatePasswordMutation = {
  __typename?: 'Mutation';
  updatePassword: { __typename?: 'User'; id: number };
};

export type BulkInsertUserMutationVariables = Exact<{
  bulkUserInput: Array<BulkUserInput> | BulkUserInput;
}>;

export type BulkInsertUserMutation = {
  __typename?: 'Mutation';
  bulkInsertUser: Array<{
    __typename?: 'BulkUserInputResponse';
    email?: string | null;
    idNumber?: string | null;
    name?: string | null;
    password?: string | null;
    status?: BulkUserStatus | null;
    errorMessage?: string | null;
    role?: string | null;
    lineManagerEmplyeeID?: string | null;
    department?: string | null;
    designation?: string | null;
    type?: EmployeeType | null;
    institution?: string | null;
  }>;
};

export const CreateAssessmentSkillDocument = gql`
  mutation CreateAssessmentSkill($createAssessmentSkillInput: CreateAssessmentSkillInput!) {
    createAssessmentSkill(createAssessmentSkillInput: $createAssessmentSkillInput) {
      name
      id
    }
  }
`;
export type CreateAssessmentSkillMutationFn = Apollo.MutationFunction<
  CreateAssessmentSkillMutation,
  CreateAssessmentSkillMutationVariables
>;

/**
 * __useCreateAssessmentSkillMutation__
 *
 * To run a mutation, you first call `useCreateAssessmentSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssessmentSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssessmentSkillMutation, { data, loading, error }] = useCreateAssessmentSkillMutation({
 *   variables: {
 *      createAssessmentSkillInput: // value for 'createAssessmentSkillInput'
 *   },
 * });
 */
export function useCreateAssessmentSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssessmentSkillMutation,
    CreateAssessmentSkillMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAssessmentSkillMutation, CreateAssessmentSkillMutationVariables>(
    CreateAssessmentSkillDocument,
    options
  );
}
export type CreateAssessmentSkillMutationHookResult = ReturnType<
  typeof useCreateAssessmentSkillMutation
>;
export type CreateAssessmentSkillMutationResult =
  Apollo.MutationResult<CreateAssessmentSkillMutation>;
export type CreateAssessmentSkillMutationOptions = Apollo.BaseMutationOptions<
  CreateAssessmentSkillMutation,
  CreateAssessmentSkillMutationVariables
>;
export const UpdateAssessmentSkillDocument = gql`
  mutation UpdateAssessmentSkill($updateAssessmentSkillInput: UpdateAssessmentSkillInput!) {
    updateAssessmentSkill(updateAssessmentSkillInput: $updateAssessmentSkillInput) {
      id
      name
    }
  }
`;
export type UpdateAssessmentSkillMutationFn = Apollo.MutationFunction<
  UpdateAssessmentSkillMutation,
  UpdateAssessmentSkillMutationVariables
>;

/**
 * __useUpdateAssessmentSkillMutation__
 *
 * To run a mutation, you first call `useUpdateAssessmentSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssessmentSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssessmentSkillMutation, { data, loading, error }] = useUpdateAssessmentSkillMutation({
 *   variables: {
 *      updateAssessmentSkillInput: // value for 'updateAssessmentSkillInput'
 *   },
 * });
 */
export function useUpdateAssessmentSkillMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAssessmentSkillMutation,
    UpdateAssessmentSkillMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAssessmentSkillMutation, UpdateAssessmentSkillMutationVariables>(
    UpdateAssessmentSkillDocument,
    options
  );
}
export type UpdateAssessmentSkillMutationHookResult = ReturnType<
  typeof useUpdateAssessmentSkillMutation
>;
export type UpdateAssessmentSkillMutationResult =
  Apollo.MutationResult<UpdateAssessmentSkillMutation>;
export type UpdateAssessmentSkillMutationOptions = Apollo.BaseMutationOptions<
  UpdateAssessmentSkillMutation,
  UpdateAssessmentSkillMutationVariables
>;
export const GetAssessmentSkillsDocument = gql`
  query GetAssessmentSkills {
    assessmentSkills {
      name
      id
      slug
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetAssessmentSkillsQuery__
 *
 * To run a query within a React component, call `useGetAssessmentSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssessmentSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssessmentSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAssessmentSkillsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAssessmentSkillsQuery, GetAssessmentSkillsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAssessmentSkillsQuery, GetAssessmentSkillsQueryVariables>(
    GetAssessmentSkillsDocument,
    options
  );
}
export function useGetAssessmentSkillsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAssessmentSkillsQuery,
    GetAssessmentSkillsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAssessmentSkillsQuery, GetAssessmentSkillsQueryVariables>(
    GetAssessmentSkillsDocument,
    options
  );
}
export type GetAssessmentSkillsQueryHookResult = ReturnType<typeof useGetAssessmentSkillsQuery>;
export type GetAssessmentSkillsLazyQueryHookResult = ReturnType<
  typeof useGetAssessmentSkillsLazyQuery
>;
export type GetAssessmentSkillsQueryResult = Apollo.QueryResult<
  GetAssessmentSkillsQuery,
  GetAssessmentSkillsQueryVariables
>;
export const GetCourseAssessmentSkillsDocument = gql`
  query GetCourseAssessmentSkills($courseId: Int!) {
    course(id: $courseId) {
      id
      name
      slug
      courseAssessmentSkills {
        assessmentSkill {
          name
          id
          slug
        }
      }
    }
  }
`;

/**
 * __useGetCourseAssessmentSkillsQuery__
 *
 * To run a query within a React component, call `useGetCourseAssessmentSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseAssessmentSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseAssessmentSkillsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetCourseAssessmentSkillsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCourseAssessmentSkillsQuery,
    GetCourseAssessmentSkillsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseAssessmentSkillsQuery, GetCourseAssessmentSkillsQueryVariables>(
    GetCourseAssessmentSkillsDocument,
    options
  );
}
export function useGetCourseAssessmentSkillsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseAssessmentSkillsQuery,
    GetCourseAssessmentSkillsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCourseAssessmentSkillsQuery,
    GetCourseAssessmentSkillsQueryVariables
  >(GetCourseAssessmentSkillsDocument, options);
}
export type GetCourseAssessmentSkillsQueryHookResult = ReturnType<
  typeof useGetCourseAssessmentSkillsQuery
>;
export type GetCourseAssessmentSkillsLazyQueryHookResult = ReturnType<
  typeof useGetCourseAssessmentSkillsLazyQuery
>;
export type GetCourseAssessmentSkillsQueryResult = Apollo.QueryResult<
  GetCourseAssessmentSkillsQuery,
  GetCourseAssessmentSkillsQueryVariables
>;
export const GetAssessmentsDocument = gql`
  query GetAssessments($pagingInput: PagingInput, $assessmentFilter: AssessmentFilter) {
    assessments(pagingInput: $pagingInput, assessmentFilter: $assessmentFilter) {
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
      data {
        assessValidity
        courseScheduleStudentsId
        createdAt
        date
        id
        name
        nextAssessment
        slug
        updatedAt
        type
        attitude
        assementAction
        result
        skillsOfAssessment {
          applicable
          skill {
            name
            id
          }
        }
        courseScheduleStudent {
          id
          name
          user {
            id
            name
            idNumber
          }
          courseSchedule {
            coursesId
          }
        }
      }
    }
  }
`;

/**
 * __useGetAssessmentsQuery__
 *
 * To run a query within a React component, call `useGetAssessmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssessmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssessmentsQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      assessmentFilter: // value for 'assessmentFilter'
 *   },
 * });
 */
export function useGetAssessmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAssessmentsQuery, GetAssessmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAssessmentsQuery, GetAssessmentsQueryVariables>(
    GetAssessmentsDocument,
    options
  );
}
export function useGetAssessmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAssessmentsQuery, GetAssessmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAssessmentsQuery, GetAssessmentsQueryVariables>(
    GetAssessmentsDocument,
    options
  );
}
export type GetAssessmentsQueryHookResult = ReturnType<typeof useGetAssessmentsQuery>;
export type GetAssessmentsLazyQueryHookResult = ReturnType<typeof useGetAssessmentsLazyQuery>;
export type GetAssessmentsQueryResult = Apollo.QueryResult<
  GetAssessmentsQuery,
  GetAssessmentsQueryVariables
>;
export const CreateAssessmentDocument = gql`
  mutation CreateAssessment($createAssessmentInput: CreateAssessmentInput!) {
    createAssessment(createAssessmentInput: $createAssessmentInput) {
      assessValidity
      courseScheduleStudentsId
      createdAt
      date
      id
      name
      nextAssessment
    }
  }
`;
export type CreateAssessmentMutationFn = Apollo.MutationFunction<
  CreateAssessmentMutation,
  CreateAssessmentMutationVariables
>;

/**
 * __useCreateAssessmentMutation__
 *
 * To run a mutation, you first call `useCreateAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssessmentMutation, { data, loading, error }] = useCreateAssessmentMutation({
 *   variables: {
 *      createAssessmentInput: // value for 'createAssessmentInput'
 *   },
 * });
 */
export function useCreateAssessmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssessmentMutation,
    CreateAssessmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAssessmentMutation, CreateAssessmentMutationVariables>(
    CreateAssessmentDocument,
    options
  );
}
export type CreateAssessmentMutationHookResult = ReturnType<typeof useCreateAssessmentMutation>;
export type CreateAssessmentMutationResult = Apollo.MutationResult<CreateAssessmentMutation>;
export type CreateAssessmentMutationOptions = Apollo.BaseMutationOptions<
  CreateAssessmentMutation,
  CreateAssessmentMutationVariables
>;
export const GetAssessmentDocument = gql`
  query GetAssessment($slug: String!) {
    assessment(slug: $slug) {
      assessValidity
      courseScheduleStudentsId
      createdAt
      date
      id
      name
      nextAssessment
      slug
      updatedAt
      assementAction
      type
      attitude
      validUpTo
      result
      skillsOfAssessment {
        applicable
        skill {
          name
          id
        }
      }
      courseScheduleStudent {
        id
        name
        user {
          id
          name
          idNumber
        }
      }
    }
  }
`;

/**
 * __useGetAssessmentQuery__
 *
 * To run a query within a React component, call `useGetAssessmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssessmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssessmentQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetAssessmentQuery(
  baseOptions: Apollo.QueryHookOptions<GetAssessmentQuery, GetAssessmentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAssessmentQuery, GetAssessmentQueryVariables>(
    GetAssessmentDocument,
    options
  );
}
export function useGetAssessmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAssessmentQuery, GetAssessmentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAssessmentQuery, GetAssessmentQueryVariables>(
    GetAssessmentDocument,
    options
  );
}
export type GetAssessmentQueryHookResult = ReturnType<typeof useGetAssessmentQuery>;
export type GetAssessmentLazyQueryHookResult = ReturnType<typeof useGetAssessmentLazyQuery>;
export type GetAssessmentQueryResult = Apollo.QueryResult<
  GetAssessmentQuery,
  GetAssessmentQueryVariables
>;
export const UpdateAssessmentDocument = gql`
  mutation UpdateAssessment(
    $updateAssessmentInput: UpdateAssessmentInput!
    $updateAssessmentId: Int!
  ) {
    updateAssessment(updateAssessmentInput: $updateAssessmentInput, id: $updateAssessmentId) {
      id
      name
    }
  }
`;
export type UpdateAssessmentMutationFn = Apollo.MutationFunction<
  UpdateAssessmentMutation,
  UpdateAssessmentMutationVariables
>;

/**
 * __useUpdateAssessmentMutation__
 *
 * To run a mutation, you first call `useUpdateAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssessmentMutation, { data, loading, error }] = useUpdateAssessmentMutation({
 *   variables: {
 *      updateAssessmentInput: // value for 'updateAssessmentInput'
 *      updateAssessmentId: // value for 'updateAssessmentId'
 *   },
 * });
 */
export function useUpdateAssessmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAssessmentMutation,
    UpdateAssessmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAssessmentMutation, UpdateAssessmentMutationVariables>(
    UpdateAssessmentDocument,
    options
  );
}
export type UpdateAssessmentMutationHookResult = ReturnType<typeof useUpdateAssessmentMutation>;
export type UpdateAssessmentMutationResult = Apollo.MutationResult<UpdateAssessmentMutation>;
export type UpdateAssessmentMutationOptions = Apollo.BaseMutationOptions<
  UpdateAssessmentMutation,
  UpdateAssessmentMutationVariables
>;
export const CreateAttendedExamDocument = gql`
  mutation CreateAttendedExam($createAttendedExamInput: CreateAttendedExamInput!) {
    createAttendedExam(createAttendedExamInput: $createAttendedExamInput) {
      slug
    }
  }
`;
export type CreateAttendedExamMutationFn = Apollo.MutationFunction<
  CreateAttendedExamMutation,
  CreateAttendedExamMutationVariables
>;

/**
 * __useCreateAttendedExamMutation__
 *
 * To run a mutation, you first call `useCreateAttendedExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttendedExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttendedExamMutation, { data, loading, error }] = useCreateAttendedExamMutation({
 *   variables: {
 *      createAttendedExamInput: // value for 'createAttendedExamInput'
 *   },
 * });
 */
export function useCreateAttendedExamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAttendedExamMutation,
    CreateAttendedExamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAttendedExamMutation, CreateAttendedExamMutationVariables>(
    CreateAttendedExamDocument,
    options
  );
}
export type CreateAttendedExamMutationHookResult = ReturnType<typeof useCreateAttendedExamMutation>;
export type CreateAttendedExamMutationResult = Apollo.MutationResult<CreateAttendedExamMutation>;
export type CreateAttendedExamMutationOptions = Apollo.BaseMutationOptions<
  CreateAttendedExamMutation,
  CreateAttendedExamMutationVariables
>;
export const GetAttendedExamDocument = gql`
  query GetAttendedExam($attendedExamId: String!) {
    attendedExam(slug: $attendedExamId) {
      userId
      createdAt
      id
      slug
      status
      totalMark
      courseScheduleStudentsId
      name
      examAttended
      AttendedExamAnswers {
        answer
        answerStatus
        createdAt
        id
        slug
        questionText
        mediaUrl
        orderNo
        correctAnswerMark
        answersOptions
        answerType
        questionScenarioId
        scenarioText
      }
    }
  }
`;

/**
 * __useGetAttendedExamQuery__
 *
 * To run a query within a React component, call `useGetAttendedExamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendedExamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendedExamQuery({
 *   variables: {
 *      attendedExamId: // value for 'attendedExamId'
 *   },
 * });
 */
export function useGetAttendedExamQuery(
  baseOptions: Apollo.QueryHookOptions<GetAttendedExamQuery, GetAttendedExamQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAttendedExamQuery, GetAttendedExamQueryVariables>(
    GetAttendedExamDocument,
    options
  );
}
export function useGetAttendedExamLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAttendedExamQuery, GetAttendedExamQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAttendedExamQuery, GetAttendedExamQueryVariables>(
    GetAttendedExamDocument,
    options
  );
}
export type GetAttendedExamQueryHookResult = ReturnType<typeof useGetAttendedExamQuery>;
export type GetAttendedExamLazyQueryHookResult = ReturnType<typeof useGetAttendedExamLazyQuery>;
export type GetAttendedExamQueryResult = Apollo.QueryResult<
  GetAttendedExamQuery,
  GetAttendedExamQueryVariables
>;
export const UpdateAttendedExamAnswerDocument = gql`
  mutation UpdateAttendedExamAnswer(
    $updateAttendedExamAnswerInput: UpdateAttendedExamAnswerInput!
  ) {
    updateAttendedExamAnswer(updateAttendedExamAnswerInput: $updateAttendedExamAnswerInput) {
      id
    }
  }
`;
export type UpdateAttendedExamAnswerMutationFn = Apollo.MutationFunction<
  UpdateAttendedExamAnswerMutation,
  UpdateAttendedExamAnswerMutationVariables
>;

/**
 * __useUpdateAttendedExamAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateAttendedExamAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttendedExamAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttendedExamAnswerMutation, { data, loading, error }] = useUpdateAttendedExamAnswerMutation({
 *   variables: {
 *      updateAttendedExamAnswerInput: // value for 'updateAttendedExamAnswerInput'
 *   },
 * });
 */
export function useUpdateAttendedExamAnswerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAttendedExamAnswerMutation,
    UpdateAttendedExamAnswerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAttendedExamAnswerMutation,
    UpdateAttendedExamAnswerMutationVariables
  >(UpdateAttendedExamAnswerDocument, options);
}
export type UpdateAttendedExamAnswerMutationHookResult = ReturnType<
  typeof useUpdateAttendedExamAnswerMutation
>;
export type UpdateAttendedExamAnswerMutationResult =
  Apollo.MutationResult<UpdateAttendedExamAnswerMutation>;
export type UpdateAttendedExamAnswerMutationOptions = Apollo.BaseMutationOptions<
  UpdateAttendedExamAnswerMutation,
  UpdateAttendedExamAnswerMutationVariables
>;
export const UpdateAttendedExamDocument = gql`
  mutation UpdateAttendedExam($updateAttendedExamInput: UpdateAttendedExamInput!) {
    updateAttendedExam(updateAttendedExamInput: $updateAttendedExamInput) {
      id
      status
    }
  }
`;
export type UpdateAttendedExamMutationFn = Apollo.MutationFunction<
  UpdateAttendedExamMutation,
  UpdateAttendedExamMutationVariables
>;

/**
 * __useUpdateAttendedExamMutation__
 *
 * To run a mutation, you first call `useUpdateAttendedExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttendedExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttendedExamMutation, { data, loading, error }] = useUpdateAttendedExamMutation({
 *   variables: {
 *      updateAttendedExamInput: // value for 'updateAttendedExamInput'
 *   },
 * });
 */
export function useUpdateAttendedExamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAttendedExamMutation,
    UpdateAttendedExamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAttendedExamMutation, UpdateAttendedExamMutationVariables>(
    UpdateAttendedExamDocument,
    options
  );
}
export type UpdateAttendedExamMutationHookResult = ReturnType<typeof useUpdateAttendedExamMutation>;
export type UpdateAttendedExamMutationResult = Apollo.MutationResult<UpdateAttendedExamMutation>;
export type UpdateAttendedExamMutationOptions = Apollo.BaseMutationOptions<
  UpdateAttendedExamMutation,
  UpdateAttendedExamMutationVariables
>;
export const GetAttendedExamsDocument = gql`
  query GetAttendedExams($filter: GetAttendedExamFilter, $pagingInput: PagingInput) {
    attendedExams(filter: $filter, pagingInput: $pagingInput) {
      data {
        achivedMark
        courseScheduleStudentsId
        createdAt
        deleted
        deletedAt
        examsId
        id
        name
        slug
        status
        totalMark
        updatedAt
        userId
        user {
          id
          name
        }
      }
      paging {
        currentPage
        hasNextPage
        nextPage
        hasPreviousPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
    }
  }
`;

/**
 * __useGetAttendedExamsQuery__
 *
 * To run a query within a React component, call `useGetAttendedExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendedExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendedExamsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetAttendedExamsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAttendedExamsQuery, GetAttendedExamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAttendedExamsQuery, GetAttendedExamsQueryVariables>(
    GetAttendedExamsDocument,
    options
  );
}
export function useGetAttendedExamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAttendedExamsQuery, GetAttendedExamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAttendedExamsQuery, GetAttendedExamsQueryVariables>(
    GetAttendedExamsDocument,
    options
  );
}
export type GetAttendedExamsQueryHookResult = ReturnType<typeof useGetAttendedExamsQuery>;
export type GetAttendedExamsLazyQueryHookResult = ReturnType<typeof useGetAttendedExamsLazyQuery>;
export type GetAttendedExamsQueryResult = Apollo.QueryResult<
  GetAttendedExamsQuery,
  GetAttendedExamsQueryVariables
>;
export const GetAttendedExamDetailsDocument = gql`
  query GetAttendedExamDetails($attendedExamId: String!) {
    attendedExam(slug: $attendedExamId) {
      userId
      createdAt
      id
      slug
      status
      totalMark
      courseScheduleStudentsId
      name
      AttendedExamAnswers {
        answer
        answerStatus
        createdAt
        id
        slug
        questionText
        mediaUrl
        orderNo
        correctAnswerMark
        answersOptions
        answerType
        questionScenarioId
        scenarioText
        selectedAnswerMark
        correctAnswer
        remarks
      }
    }
  }
`;

/**
 * __useGetAttendedExamDetailsQuery__
 *
 * To run a query within a React component, call `useGetAttendedExamDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendedExamDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendedExamDetailsQuery({
 *   variables: {
 *      attendedExamId: // value for 'attendedExamId'
 *   },
 * });
 */
export function useGetAttendedExamDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAttendedExamDetailsQuery,
    GetAttendedExamDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAttendedExamDetailsQuery, GetAttendedExamDetailsQueryVariables>(
    GetAttendedExamDetailsDocument,
    options
  );
}
export function useGetAttendedExamDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAttendedExamDetailsQuery,
    GetAttendedExamDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAttendedExamDetailsQuery, GetAttendedExamDetailsQueryVariables>(
    GetAttendedExamDetailsDocument,
    options
  );
}
export type GetAttendedExamDetailsQueryHookResult = ReturnType<
  typeof useGetAttendedExamDetailsQuery
>;
export type GetAttendedExamDetailsLazyQueryHookResult = ReturnType<
  typeof useGetAttendedExamDetailsLazyQuery
>;
export type GetAttendedExamDetailsQueryResult = Apollo.QueryResult<
  GetAttendedExamDetailsQuery,
  GetAttendedExamDetailsQueryVariables
>;
export const CreteOrUpdateOfflineExamDocument = gql`
  mutation CreteOrUpdateOfflineExam($createOfflineExamInput: CreateOfflineExamInput!) {
    creteOrUpdateOfflineExam(createOfflineExamInput: $createOfflineExamInput) {
      id
      slug
      name
      createdAt
      updatedAt
      deletedAt
      deleted
      user {
        name
        id
      }
      userId
      exam {
        id
        name
        passMark
        maximumMark
      }
      examsId
      totalMark
      achivedMark
      status
      courseScheduleStudentsId
      examAttended
    }
  }
`;
export type CreteOrUpdateOfflineExamMutationFn = Apollo.MutationFunction<
  CreteOrUpdateOfflineExamMutation,
  CreteOrUpdateOfflineExamMutationVariables
>;

/**
 * __useCreteOrUpdateOfflineExamMutation__
 *
 * To run a mutation, you first call `useCreteOrUpdateOfflineExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreteOrUpdateOfflineExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [creteOrUpdateOfflineExamMutation, { data, loading, error }] = useCreteOrUpdateOfflineExamMutation({
 *   variables: {
 *      createOfflineExamInput: // value for 'createOfflineExamInput'
 *   },
 * });
 */
export function useCreteOrUpdateOfflineExamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreteOrUpdateOfflineExamMutation,
    CreteOrUpdateOfflineExamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreteOrUpdateOfflineExamMutation,
    CreteOrUpdateOfflineExamMutationVariables
  >(CreteOrUpdateOfflineExamDocument, options);
}
export type CreteOrUpdateOfflineExamMutationHookResult = ReturnType<
  typeof useCreteOrUpdateOfflineExamMutation
>;
export type CreteOrUpdateOfflineExamMutationResult =
  Apollo.MutationResult<CreteOrUpdateOfflineExamMutation>;
export type CreteOrUpdateOfflineExamMutationOptions = Apollo.BaseMutationOptions<
  CreteOrUpdateOfflineExamMutation,
  CreteOrUpdateOfflineExamMutationVariables
>;
export const BulkUpdateAttendedExamDocument = gql`
  mutation BulkUpdateAttendedExam($bulkUpdateAttendedExamInput: [BulkUpdateAttendedExamInput!]!) {
    bulkUpdateAttendedExam(bulkUpdateAttendedExamInput: $bulkUpdateAttendedExamInput) {
      id
    }
  }
`;
export type BulkUpdateAttendedExamMutationFn = Apollo.MutationFunction<
  BulkUpdateAttendedExamMutation,
  BulkUpdateAttendedExamMutationVariables
>;

/**
 * __useBulkUpdateAttendedExamMutation__
 *
 * To run a mutation, you first call `useBulkUpdateAttendedExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkUpdateAttendedExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkUpdateAttendedExamMutation, { data, loading, error }] = useBulkUpdateAttendedExamMutation({
 *   variables: {
 *      bulkUpdateAttendedExamInput: // value for 'bulkUpdateAttendedExamInput'
 *   },
 * });
 */
export function useBulkUpdateAttendedExamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    BulkUpdateAttendedExamMutation,
    BulkUpdateAttendedExamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    BulkUpdateAttendedExamMutation,
    BulkUpdateAttendedExamMutationVariables
  >(BulkUpdateAttendedExamDocument, options);
}
export type BulkUpdateAttendedExamMutationHookResult = ReturnType<
  typeof useBulkUpdateAttendedExamMutation
>;
export type BulkUpdateAttendedExamMutationResult =
  Apollo.MutationResult<BulkUpdateAttendedExamMutation>;
export type BulkUpdateAttendedExamMutationOptions = Apollo.BaseMutationOptions<
  BulkUpdateAttendedExamMutation,
  BulkUpdateAttendedExamMutationVariables
>;
export const CreateAttendanceDocument = gql`
  mutation CreateAttendance($createAttendanceInput: CreateAttendanceInput!) {
    createAttendance(createAttendanceInput: $createAttendanceInput) {
      id
      slug
      type
      date
    }
  }
`;
export type CreateAttendanceMutationFn = Apollo.MutationFunction<
  CreateAttendanceMutation,
  CreateAttendanceMutationVariables
>;

/**
 * __useCreateAttendanceMutation__
 *
 * To run a mutation, you first call `useCreateAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttendanceMutation, { data, loading, error }] = useCreateAttendanceMutation({
 *   variables: {
 *      createAttendanceInput: // value for 'createAttendanceInput'
 *   },
 * });
 */
export function useCreateAttendanceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAttendanceMutation,
    CreateAttendanceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAttendanceMutation, CreateAttendanceMutationVariables>(
    CreateAttendanceDocument,
    options
  );
}
export type CreateAttendanceMutationHookResult = ReturnType<typeof useCreateAttendanceMutation>;
export type CreateAttendanceMutationResult = Apollo.MutationResult<CreateAttendanceMutation>;
export type CreateAttendanceMutationOptions = Apollo.BaseMutationOptions<
  CreateAttendanceMutation,
  CreateAttendanceMutationVariables
>;
export const GetAttendanceDetailsDocument = gql`
  query GetAttendanceDetails($slug: String!) {
    attendance(slug: $slug) {
      courseLevelId
      courseScheduleId
      courseScheduleStudentsId
      coursesId
      createdAt
      creatorId
      date
      id
      slug
      students {
        id
        userId
        status
        slug
        updatedAt
        user {
          name
          id
        }
      }
      type
      updatedAt
      updaterId
    }
  }
`;

/**
 * __useGetAttendanceDetailsQuery__
 *
 * To run a query within a React component, call `useGetAttendanceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendanceDetailsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetAttendanceDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAttendanceDetailsQuery,
    GetAttendanceDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAttendanceDetailsQuery, GetAttendanceDetailsQueryVariables>(
    GetAttendanceDetailsDocument,
    options
  );
}
export function useGetAttendanceDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAttendanceDetailsQuery,
    GetAttendanceDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAttendanceDetailsQuery, GetAttendanceDetailsQueryVariables>(
    GetAttendanceDetailsDocument,
    options
  );
}
export type GetAttendanceDetailsQueryHookResult = ReturnType<typeof useGetAttendanceDetailsQuery>;
export type GetAttendanceDetailsLazyQueryHookResult = ReturnType<
  typeof useGetAttendanceDetailsLazyQuery
>;
export type GetAttendanceDetailsQueryResult = Apollo.QueryResult<
  GetAttendanceDetailsQuery,
  GetAttendanceDetailsQueryVariables
>;
export const UpdateAttendanceStudentDocument = gql`
  mutation UpdateAttendanceStudent($updateAttendanceStudentInput: UpdateAttendanceStudentInput!) {
    updateAttendanceStudent(updateAttendanceStudentInput: $updateAttendanceStudentInput) {
      id
      slug
    }
  }
`;
export type UpdateAttendanceStudentMutationFn = Apollo.MutationFunction<
  UpdateAttendanceStudentMutation,
  UpdateAttendanceStudentMutationVariables
>;

/**
 * __useUpdateAttendanceStudentMutation__
 *
 * To run a mutation, you first call `useUpdateAttendanceStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttendanceStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttendanceStudentMutation, { data, loading, error }] = useUpdateAttendanceStudentMutation({
 *   variables: {
 *      updateAttendanceStudentInput: // value for 'updateAttendanceStudentInput'
 *   },
 * });
 */
export function useUpdateAttendanceStudentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAttendanceStudentMutation,
    UpdateAttendanceStudentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAttendanceStudentMutation,
    UpdateAttendanceStudentMutationVariables
  >(UpdateAttendanceStudentDocument, options);
}
export type UpdateAttendanceStudentMutationHookResult = ReturnType<
  typeof useUpdateAttendanceStudentMutation
>;
export type UpdateAttendanceStudentMutationResult =
  Apollo.MutationResult<UpdateAttendanceStudentMutation>;
export type UpdateAttendanceStudentMutationOptions = Apollo.BaseMutationOptions<
  UpdateAttendanceStudentMutation,
  UpdateAttendanceStudentMutationVariables
>;
export const GetAttendancesForScheduleDocument = gql`
  query GetAttendancesForSchedule(
    $findAttendanceInput: FindAttendanceInput!
    $pagingInput: PagingInput!
  ) {
    attendances(findAttendanceInput: $findAttendanceInput, pagingInput: $pagingInput) {
      data {
        slug
        id
        type
        creatorId
        date
        creator {
          id
          name
        }
      }
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
    }
  }
`;

/**
 * __useGetAttendancesForScheduleQuery__
 *
 * To run a query within a React component, call `useGetAttendancesForScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendancesForScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendancesForScheduleQuery({
 *   variables: {
 *      findAttendanceInput: // value for 'findAttendanceInput'
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetAttendancesForScheduleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAttendancesForScheduleQuery,
    GetAttendancesForScheduleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAttendancesForScheduleQuery, GetAttendancesForScheduleQueryVariables>(
    GetAttendancesForScheduleDocument,
    options
  );
}
export function useGetAttendancesForScheduleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAttendancesForScheduleQuery,
    GetAttendancesForScheduleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAttendancesForScheduleQuery,
    GetAttendancesForScheduleQueryVariables
  >(GetAttendancesForScheduleDocument, options);
}
export type GetAttendancesForScheduleQueryHookResult = ReturnType<
  typeof useGetAttendancesForScheduleQuery
>;
export type GetAttendancesForScheduleLazyQueryHookResult = ReturnType<
  typeof useGetAttendancesForScheduleLazyQuery
>;
export type GetAttendancesForScheduleQueryResult = Apollo.QueryResult<
  GetAttendancesForScheduleQuery,
  GetAttendancesForScheduleQueryVariables
>;
export const CreateCertificateDocument = gql`
  mutation CreateCertificate($createCertificateInput: CreateCertificateInput!) {
    createCertificate(createCertificateInput: $createCertificateInput) {
      batchNumber
      certificateType
      companyId
      coursesId
      createdAt
      id
      imageUrl
      name
      slug
    }
  }
`;
export type CreateCertificateMutationFn = Apollo.MutationFunction<
  CreateCertificateMutation,
  CreateCertificateMutationVariables
>;

/**
 * __useCreateCertificateMutation__
 *
 * To run a mutation, you first call `useCreateCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCertificateMutation, { data, loading, error }] = useCreateCertificateMutation({
 *   variables: {
 *      createCertificateInput: // value for 'createCertificateInput'
 *   },
 * });
 */
export function useCreateCertificateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCertificateMutation,
    CreateCertificateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCertificateMutation, CreateCertificateMutationVariables>(
    CreateCertificateDocument,
    options
  );
}
export type CreateCertificateMutationHookResult = ReturnType<typeof useCreateCertificateMutation>;
export type CreateCertificateMutationResult = Apollo.MutationResult<CreateCertificateMutation>;
export type CreateCertificateMutationOptions = Apollo.BaseMutationOptions<
  CreateCertificateMutation,
  CreateCertificateMutationVariables
>;
export const GetCertificatesDocument = gql`
  query GetCertificates($pagingInput: PagingInput, $certificateFilter: CertificateFilters) {
    certificates(pagingInput: $pagingInput, certificateFilter: $certificateFilter) {
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
      data {
        certificateType
        batchNumber
        companyId
        coursesId
        courses {
          id
          name
        }
        id
        createdAt
        imageUrl
        name
        sealTitle
        sealUrl
        slug
        updatedAt
        userId
        owner {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useGetCertificatesQuery__
 *
 * To run a query within a React component, call `useGetCertificatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCertificatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCertificatesQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      certificateFilter: // value for 'certificateFilter'
 *   },
 * });
 */
export function useGetCertificatesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCertificatesQuery, GetCertificatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCertificatesQuery, GetCertificatesQueryVariables>(
    GetCertificatesDocument,
    options
  );
}
export function useGetCertificatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCertificatesQuery, GetCertificatesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCertificatesQuery, GetCertificatesQueryVariables>(
    GetCertificatesDocument,
    options
  );
}
export type GetCertificatesQueryHookResult = ReturnType<typeof useGetCertificatesQuery>;
export type GetCertificatesLazyQueryHookResult = ReturnType<typeof useGetCertificatesLazyQuery>;
export type GetCertificatesQueryResult = Apollo.QueryResult<
  GetCertificatesQuery,
  GetCertificatesQueryVariables
>;
export const GetCertificateDetailsDocument = gql`
  query GetCertificateDetails($certificateId: Int!) {
    certificate(id: $certificateId) {
      batchNumber
      certificateType
      companyId
      coursesId
      createdAt
      deleted
      id
      imageUrl
      name
      sealTitle
      sealUrl
      signatures
      slug
      updatedAt
      certificateUrl
      userId
      courses {
        id
        name
        certificateType
        functionName
        caaApprovalNo
      }
      CertificateSignatures {
        certificatesId
        designation
        id
        name
        signatureUrl
        slug
      }
      owner {
        id
        name
        idNumber
      }
      studentId
      student {
        courseSchedule {
          startDate
          endDate
        }
      }
    }
  }
`;

/**
 * __useGetCertificateDetailsQuery__
 *
 * To run a query within a React component, call `useGetCertificateDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCertificateDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCertificateDetailsQuery({
 *   variables: {
 *      certificateId: // value for 'certificateId'
 *   },
 * });
 */
export function useGetCertificateDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCertificateDetailsQuery,
    GetCertificateDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCertificateDetailsQuery, GetCertificateDetailsQueryVariables>(
    GetCertificateDetailsDocument,
    options
  );
}
export function useGetCertificateDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCertificateDetailsQuery,
    GetCertificateDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCertificateDetailsQuery, GetCertificateDetailsQueryVariables>(
    GetCertificateDetailsDocument,
    options
  );
}
export type GetCertificateDetailsQueryHookResult = ReturnType<typeof useGetCertificateDetailsQuery>;
export type GetCertificateDetailsLazyQueryHookResult = ReturnType<
  typeof useGetCertificateDetailsLazyQuery
>;
export type GetCertificateDetailsQueryResult = Apollo.QueryResult<
  GetCertificateDetailsQuery,
  GetCertificateDetailsQueryVariables
>;
export const UpdateCertificateDocument = gql`
  mutation UpdateCertificate($updateCertificateInput: UpdateCertificateInput!) {
    updateCertificate(updateCertificateInput: $updateCertificateInput) {
      coursesId
      companyId
      certificateType
      batchNumber
      id
      name
    }
  }
`;
export type UpdateCertificateMutationFn = Apollo.MutationFunction<
  UpdateCertificateMutation,
  UpdateCertificateMutationVariables
>;

/**
 * __useUpdateCertificateMutation__
 *
 * To run a mutation, you first call `useUpdateCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCertificateMutation, { data, loading, error }] = useUpdateCertificateMutation({
 *   variables: {
 *      updateCertificateInput: // value for 'updateCertificateInput'
 *   },
 * });
 */
export function useUpdateCertificateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCertificateMutation,
    UpdateCertificateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCertificateMutation, UpdateCertificateMutationVariables>(
    UpdateCertificateDocument,
    options
  );
}
export type UpdateCertificateMutationHookResult = ReturnType<typeof useUpdateCertificateMutation>;
export type UpdateCertificateMutationResult = Apollo.MutationResult<UpdateCertificateMutation>;
export type UpdateCertificateMutationOptions = Apollo.BaseMutationOptions<
  UpdateCertificateMutation,
  UpdateCertificateMutationVariables
>;
export const RequestCertificateDocument = gql`
  mutation RequestCertificate($examId: Int!) {
    requestCertificate(examId: $examId) {
      message
    }
  }
`;
export type RequestCertificateMutationFn = Apollo.MutationFunction<
  RequestCertificateMutation,
  RequestCertificateMutationVariables
>;

/**
 * __useRequestCertificateMutation__
 *
 * To run a mutation, you first call `useRequestCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestCertificateMutation, { data, loading, error }] = useRequestCertificateMutation({
 *   variables: {
 *      examId: // value for 'examId'
 *   },
 * });
 */
export function useRequestCertificateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestCertificateMutation,
    RequestCertificateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RequestCertificateMutation, RequestCertificateMutationVariables>(
    RequestCertificateDocument,
    options
  );
}
export type RequestCertificateMutationHookResult = ReturnType<typeof useRequestCertificateMutation>;
export type RequestCertificateMutationResult = Apollo.MutationResult<RequestCertificateMutation>;
export type RequestCertificateMutationOptions = Apollo.BaseMutationOptions<
  RequestCertificateMutation,
  RequestCertificateMutationVariables
>;
export const CreateAttendedActivityDocument = gql`
  mutation CreateAttendedActivity($createAttendedActivityInput: CreateAttendedActivityInput!) {
    createAttendedActivity(createAttendedActivityInput: $createAttendedActivityInput) {
      achivedMark
      chaptersId
      createdAt
      deleted
      deletedAt
      id
      maxMark
      scheduleProgressId
      slug
      status
      updatedAt
      userId
    }
  }
`;
export type CreateAttendedActivityMutationFn = Apollo.MutationFunction<
  CreateAttendedActivityMutation,
  CreateAttendedActivityMutationVariables
>;

/**
 * __useCreateAttendedActivityMutation__
 *
 * To run a mutation, you first call `useCreateAttendedActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttendedActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttendedActivityMutation, { data, loading, error }] = useCreateAttendedActivityMutation({
 *   variables: {
 *      createAttendedActivityInput: // value for 'createAttendedActivityInput'
 *   },
 * });
 */
export function useCreateAttendedActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAttendedActivityMutation,
    CreateAttendedActivityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAttendedActivityMutation,
    CreateAttendedActivityMutationVariables
  >(CreateAttendedActivityDocument, options);
}
export type CreateAttendedActivityMutationHookResult = ReturnType<
  typeof useCreateAttendedActivityMutation
>;
export type CreateAttendedActivityMutationResult =
  Apollo.MutationResult<CreateAttendedActivityMutation>;
export type CreateAttendedActivityMutationOptions = Apollo.BaseMutationOptions<
  CreateAttendedActivityMutation,
  CreateAttendedActivityMutationVariables
>;
export const GetAttendedActivityByChapterAndScheduleDocument = gql`
  query GetAttendedActivityByChapterAndSchedule(
    $getAttendedActivityInput: GetAttendedActivityInput
  ) {
    attendedActivityByChapterAndSchedule(getAttendedActivityInput: $getAttendedActivityInput) {
      achivedMark
      chaptersId
      createdAt
      deleted
      deletedAt
      id
      maxMark
      scheduleProgressId
      slug
      status
      updatedAt
      userId
      activityAnswers {
        answer
        answerStatus
        correctAnswerMark
        questionId
        questionText
        selectedAnswerMark
        correctAnswer
        id
      }
    }
  }
`;

/**
 * __useGetAttendedActivityByChapterAndScheduleQuery__
 *
 * To run a query within a React component, call `useGetAttendedActivityByChapterAndScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendedActivityByChapterAndScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendedActivityByChapterAndScheduleQuery({
 *   variables: {
 *      getAttendedActivityInput: // value for 'getAttendedActivityInput'
 *   },
 * });
 */
export function useGetAttendedActivityByChapterAndScheduleQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAttendedActivityByChapterAndScheduleQuery,
    GetAttendedActivityByChapterAndScheduleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAttendedActivityByChapterAndScheduleQuery,
    GetAttendedActivityByChapterAndScheduleQueryVariables
  >(GetAttendedActivityByChapterAndScheduleDocument, options);
}
export function useGetAttendedActivityByChapterAndScheduleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAttendedActivityByChapterAndScheduleQuery,
    GetAttendedActivityByChapterAndScheduleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAttendedActivityByChapterAndScheduleQuery,
    GetAttendedActivityByChapterAndScheduleQueryVariables
  >(GetAttendedActivityByChapterAndScheduleDocument, options);
}
export type GetAttendedActivityByChapterAndScheduleQueryHookResult = ReturnType<
  typeof useGetAttendedActivityByChapterAndScheduleQuery
>;
export type GetAttendedActivityByChapterAndScheduleLazyQueryHookResult = ReturnType<
  typeof useGetAttendedActivityByChapterAndScheduleLazyQuery
>;
export type GetAttendedActivityByChapterAndScheduleQueryResult = Apollo.QueryResult<
  GetAttendedActivityByChapterAndScheduleQuery,
  GetAttendedActivityByChapterAndScheduleQueryVariables
>;
export const GetCourseCategoryDocument = gql`
  query GetCourseCategory($PagingInput: PagingInput) {
    courseCategories(pagingInput: $PagingInput) {
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
      data {
        name
        slug
        id
        createdAt
      }
    }
  }
`;

/**
 * __useGetCourseCategoryQuery__
 *
 * To run a query within a React component, call `useGetCourseCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseCategoryQuery({
 *   variables: {
 *      PagingInput: // value for 'PagingInput'
 *   },
 * });
 */
export function useGetCourseCategoryQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCourseCategoryQuery, GetCourseCategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseCategoryQuery, GetCourseCategoryQueryVariables>(
    GetCourseCategoryDocument,
    options
  );
}
export function useGetCourseCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCourseCategoryQuery, GetCourseCategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseCategoryQuery, GetCourseCategoryQueryVariables>(
    GetCourseCategoryDocument,
    options
  );
}
export type GetCourseCategoryQueryHookResult = ReturnType<typeof useGetCourseCategoryQuery>;
export type GetCourseCategoryLazyQueryHookResult = ReturnType<typeof useGetCourseCategoryLazyQuery>;
export type GetCourseCategoryQueryResult = Apollo.QueryResult<
  GetCourseCategoryQuery,
  GetCourseCategoryQueryVariables
>;
export const CreateCourseCategoryDocument = gql`
  mutation createCourseCategory($createCourseCategoryInput: CreateCourseCategoryInput!) {
    createCourseCategory(createCourseCategoryInput: $createCourseCategoryInput) {
      id
      name
      slug
      createdAt
    }
  }
`;
export type CreateCourseCategoryMutationFn = Apollo.MutationFunction<
  CreateCourseCategoryMutation,
  CreateCourseCategoryMutationVariables
>;

/**
 * __useCreateCourseCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCourseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseCategoryMutation, { data, loading, error }] = useCreateCourseCategoryMutation({
 *   variables: {
 *      createCourseCategoryInput: // value for 'createCourseCategoryInput'
 *   },
 * });
 */
export function useCreateCourseCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseCategoryMutation,
    CreateCourseCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCourseCategoryMutation, CreateCourseCategoryMutationVariables>(
    CreateCourseCategoryDocument,
    options
  );
}
export type CreateCourseCategoryMutationHookResult = ReturnType<
  typeof useCreateCourseCategoryMutation
>;
export type CreateCourseCategoryMutationResult =
  Apollo.MutationResult<CreateCourseCategoryMutation>;
export type CreateCourseCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseCategoryMutation,
  CreateCourseCategoryMutationVariables
>;
export const UpdateCourseCategoryDocument = gql`
  mutation updateCourseCategory($updateCourseCategoryInput: UpdateCourseCategoryInput!) {
    updateCourseCategory(updateCourseCategoryInput: $updateCourseCategoryInput) {
      id
      name
      slug
      createdAt
    }
  }
`;
export type UpdateCourseCategoryMutationFn = Apollo.MutationFunction<
  UpdateCourseCategoryMutation,
  UpdateCourseCategoryMutationVariables
>;

/**
 * __useUpdateCourseCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCourseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseCategoryMutation, { data, loading, error }] = useUpdateCourseCategoryMutation({
 *   variables: {
 *      updateCourseCategoryInput: // value for 'updateCourseCategoryInput'
 *   },
 * });
 */
export function useUpdateCourseCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCourseCategoryMutation,
    UpdateCourseCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCourseCategoryMutation, UpdateCourseCategoryMutationVariables>(
    UpdateCourseCategoryDocument,
    options
  );
}
export type UpdateCourseCategoryMutationHookResult = ReturnType<
  typeof useUpdateCourseCategoryMutation
>;
export type UpdateCourseCategoryMutationResult =
  Apollo.MutationResult<UpdateCourseCategoryMutation>;
export type UpdateCourseCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCourseCategoryMutation,
  UpdateCourseCategoryMutationVariables
>;
export const CreateChapterDocument = gql`
  mutation CreateChapter($createChapterInput: CreateChapterInput!) {
    createChapter(createChapterInput: $createChapterInput) {
      chapterType
      createdAt
      deleted
      id
      name
      slug
      updatedAt
    }
  }
`;
export type CreateChapterMutationFn = Apollo.MutationFunction<
  CreateChapterMutation,
  CreateChapterMutationVariables
>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      createChapterInput: // value for 'createChapterInput'
 *   },
 * });
 */
export function useCreateChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateChapterMutation, CreateChapterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateChapterMutation, CreateChapterMutationVariables>(
    CreateChapterDocument,
    options
  );
}
export type CreateChapterMutationHookResult = ReturnType<typeof useCreateChapterMutation>;
export type CreateChapterMutationResult = Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<
  CreateChapterMutation,
  CreateChapterMutationVariables
>;
export const GetChapterDetailsDocument = gql`
  query GetChapterDetails($chapterId: Int!) {
    chapter(id: $chapterId) {
      keyLearning
      Questions {
        answer
        answersOptions
        correctAnswer
        id
        mark
        question
        slug
      }
      chapterType
      coursesId
      createdAt
      deleted
      id
      link
      name
      slug
      updatedAt
      courses {
        median
        name
        price
        id
        imageUrl
        code
        instructor {
          name
          id
        }
      }
    }
  }
`;

/**
 * __useGetChapterDetailsQuery__
 *
 * To run a query within a React component, call `useGetChapterDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChapterDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChapterDetailsQuery({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useGetChapterDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetChapterDetailsQuery, GetChapterDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChapterDetailsQuery, GetChapterDetailsQueryVariables>(
    GetChapterDetailsDocument,
    options
  );
}
export function useGetChapterDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChapterDetailsQuery, GetChapterDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChapterDetailsQuery, GetChapterDetailsQueryVariables>(
    GetChapterDetailsDocument,
    options
  );
}
export type GetChapterDetailsQueryHookResult = ReturnType<typeof useGetChapterDetailsQuery>;
export type GetChapterDetailsLazyQueryHookResult = ReturnType<typeof useGetChapterDetailsLazyQuery>;
export type GetChapterDetailsQueryResult = Apollo.QueryResult<
  GetChapterDetailsQuery,
  GetChapterDetailsQueryVariables
>;
export const UpdateChapterDocument = gql`
  mutation UpdateChapter($updateChapterInput: UpdateChapterInput!) {
    updateChapter(updateChapterInput: $updateChapterInput) {
      chapterType
      coursesId
      createdAt
      id
      keyLearning
      link
      name
      slug
    }
  }
`;
export type UpdateChapterMutationFn = Apollo.MutationFunction<
  UpdateChapterMutation,
  UpdateChapterMutationVariables
>;

/**
 * __useUpdateChapterMutation__
 *
 * To run a mutation, you first call `useUpdateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChapterMutation, { data, loading, error }] = useUpdateChapterMutation({
 *   variables: {
 *      updateChapterInput: // value for 'updateChapterInput'
 *   },
 * });
 */
export function useUpdateChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateChapterMutation, UpdateChapterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateChapterMutation, UpdateChapterMutationVariables>(
    UpdateChapterDocument,
    options
  );
}
export type UpdateChapterMutationHookResult = ReturnType<typeof useUpdateChapterMutation>;
export type UpdateChapterMutationResult = Apollo.MutationResult<UpdateChapterMutation>;
export type UpdateChapterMutationOptions = Apollo.BaseMutationOptions<
  UpdateChapterMutation,
  UpdateChapterMutationVariables
>;
export const RemoveChapterDocument = gql`
  mutation RemoveChapter($id: Int!) {
    removeChapter(id: $id) {
      message
    }
  }
`;
export type RemoveChapterMutationFn = Apollo.MutationFunction<
  RemoveChapterMutation,
  RemoveChapterMutationVariables
>;

/**
 * __useRemoveChapterMutation__
 *
 * To run a mutation, you first call `useRemoveChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChapterMutation, { data, loading, error }] = useRemoveChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveChapterMutation, RemoveChapterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveChapterMutation, RemoveChapterMutationVariables>(
    RemoveChapterDocument,
    options
  );
}
export type RemoveChapterMutationHookResult = ReturnType<typeof useRemoveChapterMutation>;
export type RemoveChapterMutationResult = Apollo.MutationResult<RemoveChapterMutation>;
export type RemoveChapterMutationOptions = Apollo.BaseMutationOptions<
  RemoveChapterMutation,
  RemoveChapterMutationVariables
>;
export const CreateCourseEvaluationDocument = gql`
  mutation CreateCourseEvaluation($createCourseEvaluationInput: CreateCourseEvaluationInput!) {
    createCourseEvaluation(createCourseEvaluationInput: $createCourseEvaluationInput) {
      id
      slug
    }
  }
`;
export type CreateCourseEvaluationMutationFn = Apollo.MutationFunction<
  CreateCourseEvaluationMutation,
  CreateCourseEvaluationMutationVariables
>;

/**
 * __useCreateCourseEvaluationMutation__
 *
 * To run a mutation, you first call `useCreateCourseEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseEvaluationMutation, { data, loading, error }] = useCreateCourseEvaluationMutation({
 *   variables: {
 *      createCourseEvaluationInput: // value for 'createCourseEvaluationInput'
 *   },
 * });
 */
export function useCreateCourseEvaluationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseEvaluationMutation,
    CreateCourseEvaluationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCourseEvaluationMutation,
    CreateCourseEvaluationMutationVariables
  >(CreateCourseEvaluationDocument, options);
}
export type CreateCourseEvaluationMutationHookResult = ReturnType<
  typeof useCreateCourseEvaluationMutation
>;
export type CreateCourseEvaluationMutationResult =
  Apollo.MutationResult<CreateCourseEvaluationMutation>;
export type CreateCourseEvaluationMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseEvaluationMutation,
  CreateCourseEvaluationMutationVariables
>;
export const GetCourseEvaluationDocument = gql`
  query GetCourseEvaluation($slug: String!) {
    courseEvaluation(slug: $slug) {
      id
      slug
      remarks
      language
      courseScheduleStudentsId
      createdAt
      course {
        id
        name
        instructor {
          id
          name
        }
      }
      questions {
        category
        questions {
          id
          slug
          type
          answer
          questions {
            id
            language
            question
            questionType
            options
          }
        }
      }
    }
  }
`;

/**
 * __useGetCourseEvaluationQuery__
 *
 * To run a query within a React component, call `useGetCourseEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseEvaluationQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCourseEvaluationQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseEvaluationQuery, GetCourseEvaluationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseEvaluationQuery, GetCourseEvaluationQueryVariables>(
    GetCourseEvaluationDocument,
    options
  );
}
export function useGetCourseEvaluationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseEvaluationQuery,
    GetCourseEvaluationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseEvaluationQuery, GetCourseEvaluationQueryVariables>(
    GetCourseEvaluationDocument,
    options
  );
}
export type GetCourseEvaluationQueryHookResult = ReturnType<typeof useGetCourseEvaluationQuery>;
export type GetCourseEvaluationLazyQueryHookResult = ReturnType<
  typeof useGetCourseEvaluationLazyQuery
>;
export type GetCourseEvaluationQueryResult = Apollo.QueryResult<
  GetCourseEvaluationQuery,
  GetCourseEvaluationQueryVariables
>;
export const UpdateCourseEvaluationDocument = gql`
  mutation UpdateCourseEvaluation($updateCourseEvaluationInput: UpdateCourseEvaluationInput!) {
    updateCourseEvaluation(updateCourseEvaluationInput: $updateCourseEvaluationInput) {
      id
      slug
    }
  }
`;
export type UpdateCourseEvaluationMutationFn = Apollo.MutationFunction<
  UpdateCourseEvaluationMutation,
  UpdateCourseEvaluationMutationVariables
>;

/**
 * __useUpdateCourseEvaluationMutation__
 *
 * To run a mutation, you first call `useUpdateCourseEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseEvaluationMutation, { data, loading, error }] = useUpdateCourseEvaluationMutation({
 *   variables: {
 *      updateCourseEvaluationInput: // value for 'updateCourseEvaluationInput'
 *   },
 * });
 */
export function useUpdateCourseEvaluationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCourseEvaluationMutation,
    UpdateCourseEvaluationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCourseEvaluationMutation,
    UpdateCourseEvaluationMutationVariables
  >(UpdateCourseEvaluationDocument, options);
}
export type UpdateCourseEvaluationMutationHookResult = ReturnType<
  typeof useUpdateCourseEvaluationMutation
>;
export type UpdateCourseEvaluationMutationResult =
  Apollo.MutationResult<UpdateCourseEvaluationMutation>;
export type UpdateCourseEvaluationMutationOptions = Apollo.BaseMutationOptions<
  UpdateCourseEvaluationMutation,
  UpdateCourseEvaluationMutationVariables
>;
export const CourseEvaluationsListDocument = gql`
  query CourseEvaluationsList($pagingInput: PagingInput, $filter: CourseEvaluationFilter) {
    courseEvaluations(pagingInput: $pagingInput, filter: $filter) {
      data {
        course {
          id
          name
          instructor {
            id
            name
          }
        }
        courseLevel {
          id
          title
        }
        id
        language
        slug
        createdAt
        student {
          id
          name
        }
      }
      paging {
        size
        currentPage
        totalPages
        totalItems
        hasPreviousPage
        hasNextPage
        orderBy
        orderField
        nextPage
        previousPage
      }
    }
  }
`;

/**
 * __useCourseEvaluationsListQuery__
 *
 * To run a query within a React component, call `useCourseEvaluationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseEvaluationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseEvaluationsListQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCourseEvaluationsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CourseEvaluationsListQuery,
    CourseEvaluationsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CourseEvaluationsListQuery, CourseEvaluationsListQueryVariables>(
    CourseEvaluationsListDocument,
    options
  );
}
export function useCourseEvaluationsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CourseEvaluationsListQuery,
    CourseEvaluationsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CourseEvaluationsListQuery, CourseEvaluationsListQueryVariables>(
    CourseEvaluationsListDocument,
    options
  );
}
export type CourseEvaluationsListQueryHookResult = ReturnType<typeof useCourseEvaluationsListQuery>;
export type CourseEvaluationsListLazyQueryHookResult = ReturnType<
  typeof useCourseEvaluationsListLazyQuery
>;
export type CourseEvaluationsListQueryResult = Apollo.QueryResult<
  CourseEvaluationsListQuery,
  CourseEvaluationsListQueryVariables
>;
export const CreateCourseLevelDocument = gql`
  mutation CreateCourseLevel($createCourseLevelInput: CreateCourseLevelInput!) {
    createCourseLevel(createCourseLevelInput: $createCourseLevelInput) {
      coursesId
      id
      level
      title
      slug
    }
  }
`;
export type CreateCourseLevelMutationFn = Apollo.MutationFunction<
  CreateCourseLevelMutation,
  CreateCourseLevelMutationVariables
>;

/**
 * __useCreateCourseLevelMutation__
 *
 * To run a mutation, you first call `useCreateCourseLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseLevelMutation, { data, loading, error }] = useCreateCourseLevelMutation({
 *   variables: {
 *      createCourseLevelInput: // value for 'createCourseLevelInput'
 *   },
 * });
 */
export function useCreateCourseLevelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseLevelMutation,
    CreateCourseLevelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCourseLevelMutation, CreateCourseLevelMutationVariables>(
    CreateCourseLevelDocument,
    options
  );
}
export type CreateCourseLevelMutationHookResult = ReturnType<typeof useCreateCourseLevelMutation>;
export type CreateCourseLevelMutationResult = Apollo.MutationResult<CreateCourseLevelMutation>;
export type CreateCourseLevelMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseLevelMutation,
  CreateCourseLevelMutationVariables
>;
export const UpdateCourseLevelDocument = gql`
  mutation UpdateCourseLevel($updateCourseLevelInput: UpdateCourseLevelInput!) {
    updateCourseLevel(updateCourseLevelInput: $updateCourseLevelInput) {
      id
      level
      slug
      title
      coursesId
    }
  }
`;
export type UpdateCourseLevelMutationFn = Apollo.MutationFunction<
  UpdateCourseLevelMutation,
  UpdateCourseLevelMutationVariables
>;

/**
 * __useUpdateCourseLevelMutation__
 *
 * To run a mutation, you first call `useUpdateCourseLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseLevelMutation, { data, loading, error }] = useUpdateCourseLevelMutation({
 *   variables: {
 *      updateCourseLevelInput: // value for 'updateCourseLevelInput'
 *   },
 * });
 */
export function useUpdateCourseLevelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCourseLevelMutation,
    UpdateCourseLevelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCourseLevelMutation, UpdateCourseLevelMutationVariables>(
    UpdateCourseLevelDocument,
    options
  );
}
export type UpdateCourseLevelMutationHookResult = ReturnType<typeof useUpdateCourseLevelMutation>;
export type UpdateCourseLevelMutationResult = Apollo.MutationResult<UpdateCourseLevelMutation>;
export type UpdateCourseLevelMutationOptions = Apollo.BaseMutationOptions<
  UpdateCourseLevelMutation,
  UpdateCourseLevelMutationVariables
>;
export const GetCourseLevelDetailsDocument = gql`
  query GetCourseLevelDetails($courseLevelId: Int!) {
    courseLevel(id: $courseLevelId) {
      coursesId
      id
      slug
      level
      title
      course {
        name
        id
        imageUrl
        expireIn
        examRequired
        endDate
        deleted
        createdAt
        courseStatus
        courseCategoryId
        median
        code
        mediumOfExam
        maxStudentsAllowed
      }
      chapters {
        Media {
          id
          name
          slug
          thumbnail
          chaptersId
          createdAt
        }
        id
        createdAt
        coursesId
        chapterType
        keyLearning
        link
        name
        slug
        updatedAt
      }
      exams {
        achivedMark
        createdAt
        coursesId
        deleted
        id
        maximumMark
        name
        passMark
        slug
        updatedAt
      }
      courseSchedule {
        coursesId
        days
        deleted
        endDate
        endTime
        id
        courseLevelId
        name
        slug
        startDate
        startTime
        updatedAt
        createdAt
      }
    }
  }
`;

/**
 * __useGetCourseLevelDetailsQuery__
 *
 * To run a query within a React component, call `useGetCourseLevelDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseLevelDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseLevelDetailsQuery({
 *   variables: {
 *      courseLevelId: // value for 'courseLevelId'
 *   },
 * });
 */
export function useGetCourseLevelDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCourseLevelDetailsQuery,
    GetCourseLevelDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseLevelDetailsQuery, GetCourseLevelDetailsQueryVariables>(
    GetCourseLevelDetailsDocument,
    options
  );
}
export function useGetCourseLevelDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseLevelDetailsQuery,
    GetCourseLevelDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseLevelDetailsQuery, GetCourseLevelDetailsQueryVariables>(
    GetCourseLevelDetailsDocument,
    options
  );
}
export type GetCourseLevelDetailsQueryHookResult = ReturnType<typeof useGetCourseLevelDetailsQuery>;
export type GetCourseLevelDetailsLazyQueryHookResult = ReturnType<
  typeof useGetCourseLevelDetailsLazyQuery
>;
export type GetCourseLevelDetailsQueryResult = Apollo.QueryResult<
  GetCourseLevelDetailsQuery,
  GetCourseLevelDetailsQueryVariables
>;
export const GetCourseLevelResourcesDocument = gql`
  query GetCourseLevelResources($courseLevelId: Int!) {
    courseLevel(id: $courseLevelId) {
      resources {
        name
        id
        memeType
        slug
        url
      }
    }
  }
`;

/**
 * __useGetCourseLevelResourcesQuery__
 *
 * To run a query within a React component, call `useGetCourseLevelResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseLevelResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseLevelResourcesQuery({
 *   variables: {
 *      courseLevelId: // value for 'courseLevelId'
 *   },
 * });
 */
export function useGetCourseLevelResourcesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCourseLevelResourcesQuery,
    GetCourseLevelResourcesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseLevelResourcesQuery, GetCourseLevelResourcesQueryVariables>(
    GetCourseLevelResourcesDocument,
    options
  );
}
export function useGetCourseLevelResourcesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseLevelResourcesQuery,
    GetCourseLevelResourcesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseLevelResourcesQuery, GetCourseLevelResourcesQueryVariables>(
    GetCourseLevelResourcesDocument,
    options
  );
}
export type GetCourseLevelResourcesQueryHookResult = ReturnType<
  typeof useGetCourseLevelResourcesQuery
>;
export type GetCourseLevelResourcesLazyQueryHookResult = ReturnType<
  typeof useGetCourseLevelResourcesLazyQuery
>;
export type GetCourseLevelResourcesQueryResult = Apollo.QueryResult<
  GetCourseLevelResourcesQuery,
  GetCourseLevelResourcesQueryVariables
>;
export const GetCourseDetailsWithLevelIdDocument = gql`
  query GetCourseDetailsWithLevelId($courseLevelId: Int!) {
    courseLevel(id: $courseLevelId) {
      coursesId
      id
      slug
      level
      title
      course {
        id
        slug
        name
        examRequired
        type
        median
        mediumOfExam
        courseCategoryId
        startDate
        endDate
        Summary
        imageUrl
        instructorId
        courseStatus
        expireIn
        maxStudentsAllowed
      }
    }
  }
`;

/**
 * __useGetCourseDetailsWithLevelIdQuery__
 *
 * To run a query within a React component, call `useGetCourseDetailsWithLevelIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseDetailsWithLevelIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseDetailsWithLevelIdQuery({
 *   variables: {
 *      courseLevelId: // value for 'courseLevelId'
 *   },
 * });
 */
export function useGetCourseDetailsWithLevelIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCourseDetailsWithLevelIdQuery,
    GetCourseDetailsWithLevelIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCourseDetailsWithLevelIdQuery,
    GetCourseDetailsWithLevelIdQueryVariables
  >(GetCourseDetailsWithLevelIdDocument, options);
}
export function useGetCourseDetailsWithLevelIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseDetailsWithLevelIdQuery,
    GetCourseDetailsWithLevelIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCourseDetailsWithLevelIdQuery,
    GetCourseDetailsWithLevelIdQueryVariables
  >(GetCourseDetailsWithLevelIdDocument, options);
}
export type GetCourseDetailsWithLevelIdQueryHookResult = ReturnType<
  typeof useGetCourseDetailsWithLevelIdQuery
>;
export type GetCourseDetailsWithLevelIdLazyQueryHookResult = ReturnType<
  typeof useGetCourseDetailsWithLevelIdLazyQuery
>;
export type GetCourseDetailsWithLevelIdQueryResult = Apollo.QueryResult<
  GetCourseDetailsWithLevelIdQuery,
  GetCourseDetailsWithLevelIdQueryVariables
>;
export const GetCourseLevelNotAttendedUserDocument = gql`
  query GetCourseLevelNotAttendedUser($courseLevelId: Int!, $designationIds: [Int!]) {
    courseLevelNotAttendedUser(courseLevelId: $courseLevelId, designationIds: $designationIds) {
      id
      name
      slug
    }
  }
`;

/**
 * __useGetCourseLevelNotAttendedUserQuery__
 *
 * To run a query within a React component, call `useGetCourseLevelNotAttendedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseLevelNotAttendedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseLevelNotAttendedUserQuery({
 *   variables: {
 *      courseLevelId: // value for 'courseLevelId'
 *   },
 * });
 */
export function useGetCourseLevelNotAttendedUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCourseLevelNotAttendedUserQuery,
    GetCourseLevelNotAttendedUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCourseLevelNotAttendedUserQuery,
    GetCourseLevelNotAttendedUserQueryVariables
  >(GetCourseLevelNotAttendedUserDocument, options);
}
export function useGetCourseLevelNotAttendedUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseLevelNotAttendedUserQuery,
    GetCourseLevelNotAttendedUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCourseLevelNotAttendedUserQuery,
    GetCourseLevelNotAttendedUserQueryVariables
  >(GetCourseLevelNotAttendedUserDocument, options);
}
export type GetCourseLevelNotAttendedUserQueryHookResult = ReturnType<
  typeof useGetCourseLevelNotAttendedUserQuery
>;
export type GetCourseLevelNotAttendedUserLazyQueryHookResult = ReturnType<
  typeof useGetCourseLevelNotAttendedUserLazyQuery
>;
export type GetCourseLevelNotAttendedUserQueryResult = Apollo.QueryResult<
  GetCourseLevelNotAttendedUserQuery,
  GetCourseLevelNotAttendedUserQueryVariables
>;
export const GetStudentsExpiredInCourseDocument = gql`
  query GetStudentsExpiredInCourse($courseLevelId: Int!, $designationIds: [Int!]) {
    getStudentsExpiredInCourse(courseLevelId: $courseLevelId, designationIds: $designationIds) {
      id
      name
      slug
    }
  }
`;

/**
 * __useGetStudentsExpiredInCourseQuery__
 *
 * To run a query within a React component, call `useGetStudentsExpiredInCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentsExpiredInCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentsExpiredInCourseQuery({
 *   variables: {
 *      courseLevelId: // value for 'courseLevelId'
 *   },
 * });
 */
export function useGetStudentsExpiredInCourseQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetStudentsExpiredInCourseQuery,
    GetStudentsExpiredInCourseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStudentsExpiredInCourseQuery, GetStudentsExpiredInCourseQueryVariables>(
    GetStudentsExpiredInCourseDocument,
    options
  );
}
export function useGetStudentsExpiredInCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStudentsExpiredInCourseQuery,
    GetStudentsExpiredInCourseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetStudentsExpiredInCourseQuery,
    GetStudentsExpiredInCourseQueryVariables
  >(GetStudentsExpiredInCourseDocument, options);
}
export type GetStudentsExpiredInCourseQueryHookResult = ReturnType<
  typeof useGetStudentsExpiredInCourseQuery
>;
export type GetStudentsExpiredInCourseLazyQueryHookResult = ReturnType<
  typeof useGetStudentsExpiredInCourseLazyQuery
>;
export type GetStudentsExpiredInCourseQueryResult = Apollo.QueryResult<
  GetStudentsExpiredInCourseQuery,
  GetStudentsExpiredInCourseQueryVariables
>;
export const GetCourseResourcesDocument = gql`
  query GetCourseResources($pagingInput: PagingInput) {
    courseCategories(pagingInput: $pagingInput) {
      data {
        companyId
        name
        id
        createdAt
        slug
      }
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
    }
  }
`;

/**
 * __useGetCourseResourcesQuery__
 *
 * To run a query within a React component, call `useGetCourseResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseResourcesQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetCourseResourcesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCourseResourcesQuery, GetCourseResourcesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseResourcesQuery, GetCourseResourcesQueryVariables>(
    GetCourseResourcesDocument,
    options
  );
}
export function useGetCourseResourcesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseResourcesQuery,
    GetCourseResourcesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseResourcesQuery, GetCourseResourcesQueryVariables>(
    GetCourseResourcesDocument,
    options
  );
}
export type GetCourseResourcesQueryHookResult = ReturnType<typeof useGetCourseResourcesQuery>;
export type GetCourseResourcesLazyQueryHookResult = ReturnType<
  typeof useGetCourseResourcesLazyQuery
>;
export type GetCourseResourcesQueryResult = Apollo.QueryResult<
  GetCourseResourcesQuery,
  GetCourseResourcesQueryVariables
>;
export const CreateCourseResourceDocument = gql`
  mutation createCourseResource($createCourseResourceInput: CreateCourseResourceInput!) {
    createCourseResource(createCourseResourceInput: $createCourseResourceInput) {
      coursesId
      memeType
      name
      url
    }
  }
`;
export type CreateCourseResourceMutationFn = Apollo.MutationFunction<
  CreateCourseResourceMutation,
  CreateCourseResourceMutationVariables
>;

/**
 * __useCreateCourseResourceMutation__
 *
 * To run a mutation, you first call `useCreateCourseResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseResourceMutation, { data, loading, error }] = useCreateCourseResourceMutation({
 *   variables: {
 *      createCourseResourceInput: // value for 'createCourseResourceInput'
 *   },
 * });
 */
export function useCreateCourseResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseResourceMutation,
    CreateCourseResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCourseResourceMutation, CreateCourseResourceMutationVariables>(
    CreateCourseResourceDocument,
    options
  );
}
export type CreateCourseResourceMutationHookResult = ReturnType<
  typeof useCreateCourseResourceMutation
>;
export type CreateCourseResourceMutationResult =
  Apollo.MutationResult<CreateCourseResourceMutation>;
export type CreateCourseResourceMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseResourceMutation,
  CreateCourseResourceMutationVariables
>;
export const RemoveCourseResourceDocument = gql`
  mutation RemoveCourseResource($removeCourseResourceId: Int!) {
    removeCourseResource(id: $removeCourseResourceId) {
      id
      name
    }
  }
`;
export type RemoveCourseResourceMutationFn = Apollo.MutationFunction<
  RemoveCourseResourceMutation,
  RemoveCourseResourceMutationVariables
>;

/**
 * __useRemoveCourseResourceMutation__
 *
 * To run a mutation, you first call `useRemoveCourseResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseResourceMutation, { data, loading, error }] = useRemoveCourseResourceMutation({
 *   variables: {
 *      removeCourseResourceId: // value for 'removeCourseResourceId'
 *   },
 * });
 */
export function useRemoveCourseResourceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCourseResourceMutation,
    RemoveCourseResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveCourseResourceMutation, RemoveCourseResourceMutationVariables>(
    RemoveCourseResourceDocument,
    options
  );
}
export type RemoveCourseResourceMutationHookResult = ReturnType<
  typeof useRemoveCourseResourceMutation
>;
export type RemoveCourseResourceMutationResult =
  Apollo.MutationResult<RemoveCourseResourceMutation>;
export type RemoveCourseResourceMutationOptions = Apollo.BaseMutationOptions<
  RemoveCourseResourceMutation,
  RemoveCourseResourceMutationVariables
>;
export const CreateCourseScheduleDocument = gql`
  mutation CreateCourseSchedule($createCourseScheduleInput: CreateCourseScheduleInput!) {
    createCourseSchedule(createCourseScheduleInput: $createCourseScheduleInput) {
      coursesId
      days
      endDate
      endTime
      id
      name
      slug
      startDate
      startTime
      updatedAt
      isLocked
    }
  }
`;
export type CreateCourseScheduleMutationFn = Apollo.MutationFunction<
  CreateCourseScheduleMutation,
  CreateCourseScheduleMutationVariables
>;

/**
 * __useCreateCourseScheduleMutation__
 *
 * To run a mutation, you first call `useCreateCourseScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseScheduleMutation, { data, loading, error }] = useCreateCourseScheduleMutation({
 *   variables: {
 *      createCourseScheduleInput: // value for 'createCourseScheduleInput'
 *   },
 * });
 */
export function useCreateCourseScheduleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseScheduleMutation,
    CreateCourseScheduleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCourseScheduleMutation, CreateCourseScheduleMutationVariables>(
    CreateCourseScheduleDocument,
    options
  );
}
export type CreateCourseScheduleMutationHookResult = ReturnType<
  typeof useCreateCourseScheduleMutation
>;
export type CreateCourseScheduleMutationResult =
  Apollo.MutationResult<CreateCourseScheduleMutation>;
export type CreateCourseScheduleMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseScheduleMutation,
  CreateCourseScheduleMutationVariables
>;
export const UpdateCourseScheduleDocument = gql`
  mutation UpdateCourseSchedule($updateCourseScheduleInput: UpdateCourseScheduleInput!) {
    updateCourseSchedule(updateCourseScheduleInput: $updateCourseScheduleInput) {
      id
      name
      coursesId
      courseLevelId
      isLocked
    }
  }
`;
export type UpdateCourseScheduleMutationFn = Apollo.MutationFunction<
  UpdateCourseScheduleMutation,
  UpdateCourseScheduleMutationVariables
>;

/**
 * __useUpdateCourseScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateCourseScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseScheduleMutation, { data, loading, error }] = useUpdateCourseScheduleMutation({
 *   variables: {
 *      updateCourseScheduleInput: // value for 'updateCourseScheduleInput'
 *   },
 * });
 */
export function useUpdateCourseScheduleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCourseScheduleMutation,
    UpdateCourseScheduleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCourseScheduleMutation, UpdateCourseScheduleMutationVariables>(
    UpdateCourseScheduleDocument,
    options
  );
}
export type UpdateCourseScheduleMutationHookResult = ReturnType<
  typeof useUpdateCourseScheduleMutation
>;
export type UpdateCourseScheduleMutationResult =
  Apollo.MutationResult<UpdateCourseScheduleMutation>;
export type UpdateCourseScheduleMutationOptions = Apollo.BaseMutationOptions<
  UpdateCourseScheduleMutation,
  UpdateCourseScheduleMutationVariables
>;
export const GetCourseScheduleDetailsDocument = gql`
  query GetCourseScheduleDetails($courseScheduleId: Int!) {
    courseSchedule(id: $courseScheduleId) {
      id
      name
      isLocked
      startDate
      slug
      startTime
      students {
        id
        userId
        name
      }
      days
      endDate
      endTime
      coursesId
      courseLevelId
      attendanceSheet
      attendanceProof
      attendanceProofCreatedOn
      examId
      designationIds
      course {
        median
        maxStudentsAllowed
      }
    }
  }
`;

/**
 * __useGetCourseScheduleDetailsQuery__
 *
 * To run a query within a React component, call `useGetCourseScheduleDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseScheduleDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseScheduleDetailsQuery({
 *   variables: {
 *      courseScheduleId: // value for 'courseScheduleId'
 *   },
 * });
 */
export function useGetCourseScheduleDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCourseScheduleDetailsQuery,
    GetCourseScheduleDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseScheduleDetailsQuery, GetCourseScheduleDetailsQueryVariables>(
    GetCourseScheduleDetailsDocument,
    options
  );
}
export function useGetCourseScheduleDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseScheduleDetailsQuery,
    GetCourseScheduleDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseScheduleDetailsQuery, GetCourseScheduleDetailsQueryVariables>(
    GetCourseScheduleDetailsDocument,
    options
  );
}
export type GetCourseScheduleDetailsQueryHookResult = ReturnType<
  typeof useGetCourseScheduleDetailsQuery
>;
export type GetCourseScheduleDetailsLazyQueryHookResult = ReturnType<
  typeof useGetCourseScheduleDetailsLazyQuery
>;
export type GetCourseScheduleDetailsQueryResult = Apollo.QueryResult<
  GetCourseScheduleDetailsQuery,
  GetCourseScheduleDetailsQueryVariables
>;
export const GetCourseScheduleDocument = gql`
  query GetCourseSchedule($courseScheduleId: Int!) {
    courseSchedule(id: $courseScheduleId) {
      id
      name
      startDate
      slug
      startTime
      days
      endDate
      endTime
      coursesId
      courseLevelId
      examId
      isLocked
    }
  }
`;

/**
 * __useGetCourseScheduleQuery__
 *
 * To run a query within a React component, call `useGetCourseScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseScheduleQuery({
 *   variables: {
 *      courseScheduleId: // value for 'courseScheduleId'
 *   },
 * });
 */
export function useGetCourseScheduleQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseScheduleQuery, GetCourseScheduleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseScheduleQuery, GetCourseScheduleQueryVariables>(
    GetCourseScheduleDocument,
    options
  );
}
export function useGetCourseScheduleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCourseScheduleQuery, GetCourseScheduleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseScheduleQuery, GetCourseScheduleQueryVariables>(
    GetCourseScheduleDocument,
    options
  );
}
export type GetCourseScheduleQueryHookResult = ReturnType<typeof useGetCourseScheduleQuery>;
export type GetCourseScheduleLazyQueryHookResult = ReturnType<typeof useGetCourseScheduleLazyQuery>;
export type GetCourseScheduleQueryResult = Apollo.QueryResult<
  GetCourseScheduleQuery,
  GetCourseScheduleQueryVariables
>;
export const GetMyStudentSchedulesDocument = gql`
  query GetMyStudentSchedules($input: GetMyStudentSchedulesInput) {
    getMyStudentSchedules(input: $input) {
      userId
      name
      status
      id
      courseScheduleId
      slug
      courseSchedule {
        endTime
        endDate
        name
        days
        startDate
        startTime
        courseLevelId
        coursesId
        course {
          name
          id
        }
        courseLevel {
          id
          title
        }
      }
      exams {
        id
        name
        status
        slug
      }
      completionPercentage
    }
  }
`;

/**
 * __useGetMyStudentSchedulesQuery__
 *
 * To run a query within a React component, call `useGetMyStudentSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyStudentSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyStudentSchedulesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyStudentSchedulesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyStudentSchedulesQuery,
    GetMyStudentSchedulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyStudentSchedulesQuery, GetMyStudentSchedulesQueryVariables>(
    GetMyStudentSchedulesDocument,
    options
  );
}
export function useGetMyStudentSchedulesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyStudentSchedulesQuery,
    GetMyStudentSchedulesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyStudentSchedulesQuery, GetMyStudentSchedulesQueryVariables>(
    GetMyStudentSchedulesDocument,
    options
  );
}
export type GetMyStudentSchedulesQueryHookResult = ReturnType<typeof useGetMyStudentSchedulesQuery>;
export type GetMyStudentSchedulesLazyQueryHookResult = ReturnType<
  typeof useGetMyStudentSchedulesLazyQuery
>;
export type GetMyStudentSchedulesQueryResult = Apollo.QueryResult<
  GetMyStudentSchedulesQuery,
  GetMyStudentSchedulesQueryVariables
>;
export const CourseSchedulesDocument = gql`
  query CourseSchedules($pagingInput: PagingInput, $courseScheduleFilter: CourseScheduleFilter) {
    courseSchedules(pagingInput: $pagingInput, courseScheduleFilter: $courseScheduleFilter) {
      data {
        course {
          id
          name
        }
        courseLevel {
          id
          level
          title
        }
        endDate
        endTime
        id
        name
        slug
        startDate
        startTime
      }
      paging {
        size
        totalItems
        totalPages
        previousPage
        orderBy
        orderField
        nextPage
        hasPreviousPage
        hasNextPage
        currentPage
      }
    }
  }
`;

/**
 * __useCourseSchedulesQuery__
 *
 * To run a query within a React component, call `useCourseSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseSchedulesQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      courseScheduleFilter: // value for 'courseScheduleFilter'
 *   },
 * });
 */
export function useCourseSchedulesQuery(
  baseOptions?: Apollo.QueryHookOptions<CourseSchedulesQuery, CourseSchedulesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CourseSchedulesQuery, CourseSchedulesQueryVariables>(
    CourseSchedulesDocument,
    options
  );
}
export function useCourseSchedulesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CourseSchedulesQuery, CourseSchedulesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CourseSchedulesQuery, CourseSchedulesQueryVariables>(
    CourseSchedulesDocument,
    options
  );
}
export type CourseSchedulesQueryHookResult = ReturnType<typeof useCourseSchedulesQuery>;
export type CourseSchedulesLazyQueryHookResult = ReturnType<typeof useCourseSchedulesLazyQuery>;
export type CourseSchedulesQueryResult = Apollo.QueryResult<
  CourseSchedulesQuery,
  CourseSchedulesQueryVariables
>;
export const SendCertificateDocument = gql`
  mutation SendCertificate($sendCertificateInput: SendCertificateInput!) {
    sendCertificate(sendCertificateInput: $sendCertificateInput) {
      message
    }
  }
`;
export type SendCertificateMutationFn = Apollo.MutationFunction<
  SendCertificateMutation,
  SendCertificateMutationVariables
>;

/**
 * __useSendCertificateMutation__
 *
 * To run a mutation, you first call `useSendCertificateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCertificateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCertificateMutation, { data, loading, error }] = useSendCertificateMutation({
 *   variables: {
 *      sendCertificateInput: // value for 'sendCertificateInput'
 *   },
 * });
 */
export function useSendCertificateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendCertificateMutation,
    SendCertificateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendCertificateMutation, SendCertificateMutationVariables>(
    SendCertificateDocument,
    options
  );
}
export type SendCertificateMutationHookResult = ReturnType<typeof useSendCertificateMutation>;
export type SendCertificateMutationResult = Apollo.MutationResult<SendCertificateMutation>;
export type SendCertificateMutationOptions = Apollo.BaseMutationOptions<
  SendCertificateMutation,
  SendCertificateMutationVariables
>;
export const GetAttendanceSheetDocument = gql`
  mutation GetAttendanceSheet($getAttendanceSheetInput: GetAttendanceSheetInput) {
    getAttendanceSheet(getAttendanceSheetInput: $getAttendanceSheetInput) {
      url
    }
  }
`;
export type GetAttendanceSheetMutationFn = Apollo.MutationFunction<
  GetAttendanceSheetMutation,
  GetAttendanceSheetMutationVariables
>;

/**
 * __useGetAttendanceSheetMutation__
 *
 * To run a mutation, you first call `useGetAttendanceSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAttendanceSheetMutation, { data, loading, error }] = useGetAttendanceSheetMutation({
 *   variables: {
 *      getAttendanceSheetInput: // value for 'getAttendanceSheetInput'
 *   },
 * });
 */
export function useGetAttendanceSheetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GetAttendanceSheetMutation,
    GetAttendanceSheetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GetAttendanceSheetMutation, GetAttendanceSheetMutationVariables>(
    GetAttendanceSheetDocument,
    options
  );
}
export type GetAttendanceSheetMutationHookResult = ReturnType<typeof useGetAttendanceSheetMutation>;
export type GetAttendanceSheetMutationResult = Apollo.MutationResult<GetAttendanceSheetMutation>;
export type GetAttendanceSheetMutationOptions = Apollo.BaseMutationOptions<
  GetAttendanceSheetMutation,
  GetAttendanceSheetMutationVariables
>;
export const GetCourseScheduleOnlyDocument = gql`
  query GetCourseScheduleOnly(
    $pagingInput: PagingInput
    $courseScheduleFilter: CourseScheduleFilter
  ) {
    courseSchedules(pagingInput: $pagingInput, courseScheduleFilter: $courseScheduleFilter) {
      data {
        id
        name
        startDate
        slug
        startTime
        days
        endDate
        endTime
        coursesId
        courseLevelId
        examId
      }
      paging {
        size
        totalItems
        totalPages
        previousPage
        orderBy
        orderField
        nextPage
        hasPreviousPage
        hasNextPage
        currentPage
      }
    }
  }
`;

/**
 * __useGetCourseScheduleOnlyQuery__
 *
 * To run a query within a React component, call `useGetCourseScheduleOnlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseScheduleOnlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseScheduleOnlyQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      courseScheduleFilter: // value for 'courseScheduleFilter'
 *   },
 * });
 */
export function useGetCourseScheduleOnlyQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCourseScheduleOnlyQuery,
    GetCourseScheduleOnlyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseScheduleOnlyQuery, GetCourseScheduleOnlyQueryVariables>(
    GetCourseScheduleOnlyDocument,
    options
  );
}
export function useGetCourseScheduleOnlyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseScheduleOnlyQuery,
    GetCourseScheduleOnlyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseScheduleOnlyQuery, GetCourseScheduleOnlyQueryVariables>(
    GetCourseScheduleOnlyDocument,
    options
  );
}
export type GetCourseScheduleOnlyQueryHookResult = ReturnType<typeof useGetCourseScheduleOnlyQuery>;
export type GetCourseScheduleOnlyLazyQueryHookResult = ReturnType<
  typeof useGetCourseScheduleOnlyLazyQuery
>;
export type GetCourseScheduleOnlyQueryResult = Apollo.QueryResult<
  GetCourseScheduleOnlyQuery,
  GetCourseScheduleOnlyQueryVariables
>;
export const GetCoursesListDocument = gql`
  query GetCoursesList($pagingInput: PagingInput, $filter: CourseFilter) {
    courses(pagingInput: $pagingInput, filter: $filter) {
      data {
        startDate
        price
        name
        median
        mediumOfExam
        imageUrl
        id
        examRequired
        endDate
        createdAt
        courseStatus
        courseCategoryId
        type
        courseCategory {
          name
          id
        }
        code
        classLink
      }
      paging {
        currentPage
        hasPreviousPage
        hasNextPage
        nextPage
        orderBy
        previousPage
        size
        totalItems
        totalPages
        orderField
      }
    }
  }
`;

/**
 * __useGetCoursesListQuery__
 *
 * To run a query within a React component, call `useGetCoursesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesListQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCoursesListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCoursesListQuery, GetCoursesListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCoursesListQuery, GetCoursesListQueryVariables>(
    GetCoursesListDocument,
    options
  );
}
export function useGetCoursesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesListQuery, GetCoursesListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCoursesListQuery, GetCoursesListQueryVariables>(
    GetCoursesListDocument,
    options
  );
}
export type GetCoursesListQueryHookResult = ReturnType<typeof useGetCoursesListQuery>;
export type GetCoursesListLazyQueryHookResult = ReturnType<typeof useGetCoursesListLazyQuery>;
export type GetCoursesListQueryResult = Apollo.QueryResult<
  GetCoursesListQuery,
  GetCoursesListQueryVariables
>;
export const GetCourseDetailsDocument = gql`
  query GetCourseDetails($courseId: Int!) {
    course(id: $courseId) {
      courseAssessmentSkills {
        id
        assessmentSkillsId
      }
      Summary
      classLink
      code
      courseCategory {
        id
        name
        slug
      }
      courseCategoryId
      courseStatus
      createdAt
      endDate
      examRequired
      id
      imageUrl
      instructor {
        roleId
        qualification
        profileImageUrl
        phone
        passwordUrl
        passportUrl
        name
        managerId
        imageUrl
        id
      }
      resources {
        id
        memeType
        name
        deleted
        createdAt
        coursesId
        url
      }
      Chapters {
        Questions {
          answersOptions
          chaptersId
          correctAnswer
          createdAt
          id
          mark
          question
          slug
        }
        chapterType
        coursesId
        id
        link
        name
        slug
      }
      instructorId
      median
      mediumOfExam
      name
      price
      slug
      startDate
      type
      updatedAt
      exams {
        id
        maximumMark
        name
        slug
        passMark
        updatedAt
      }
      expireIn
      schedules {
        createdAt
        days
        endDate
        endTime
        id
        name
        slug
        startDate
        startTime
        updatedAt
      }
      certificateType
      caaApprovalNo
      functionName
      maxStudentsAllowed
    }
  }
`;

/**
 * __useGetCourseDetailsQuery__
 *
 * To run a query within a React component, call `useGetCourseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseDetailsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetCourseDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseDetailsQuery, GetCourseDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseDetailsQuery, GetCourseDetailsQueryVariables>(
    GetCourseDetailsDocument,
    options
  );
}
export function useGetCourseDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCourseDetailsQuery, GetCourseDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseDetailsQuery, GetCourseDetailsQueryVariables>(
    GetCourseDetailsDocument,
    options
  );
}
export type GetCourseDetailsQueryHookResult = ReturnType<typeof useGetCourseDetailsQuery>;
export type GetCourseDetailsLazyQueryHookResult = ReturnType<typeof useGetCourseDetailsLazyQuery>;
export type GetCourseDetailsQueryResult = Apollo.QueryResult<
  GetCourseDetailsQuery,
  GetCourseDetailsQueryVariables
>;
export const CreateCourseDocument = gql`
  mutation CreateCourse($createCourseInput: CreateCourseInput!) {
    createCourse(createCourseInput: $createCourseInput) {
      id
      name
    }
  }
`;
export type CreateCourseMutationFn = Apollo.MutationFunction<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      createCourseInput: // value for 'createCourseInput'
 *   },
 * });
 */
export function useCreateCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(
    CreateCourseDocument,
    options
  );
}
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;
export const UpdateCourseDocument = gql`
  mutation UpdateCourse($updateCourseInput: UpdateCourseInput!) {
    updateCourse(updateCourseInput: $updateCourseInput) {
      id
      name
    }
  }
`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<
  UpdateCourseMutation,
  UpdateCourseMutationVariables
>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      updateCourseInput: // value for 'updateCourseInput'
 *   },
 * });
 */
export function useUpdateCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(
    UpdateCourseDocument,
    options
  );
}
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<
  UpdateCourseMutation,
  UpdateCourseMutationVariables
>;
export const GetCourseLevelsDocument = gql`
  query GetCourseLevels($courseId: Int!) {
    course(id: $courseId) {
      levels {
        id
        level
        title
        slug
        coursesId
      }
      id
      name
      createdAt
      code
      median
      imageUrl
      instructor {
        roleId
        qualification
        profileImageUrl
        phone
        passwordUrl
        passportUrl
        name
        managerId
        imageUrl
        id
      }
    }
  }
`;

/**
 * __useGetCourseLevelsQuery__
 *
 * To run a query within a React component, call `useGetCourseLevelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseLevelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseLevelsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetCourseLevelsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseLevelsQuery, GetCourseLevelsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseLevelsQuery, GetCourseLevelsQueryVariables>(
    GetCourseLevelsDocument,
    options
  );
}
export function useGetCourseLevelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCourseLevelsQuery, GetCourseLevelsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseLevelsQuery, GetCourseLevelsQueryVariables>(
    GetCourseLevelsDocument,
    options
  );
}
export type GetCourseLevelsQueryHookResult = ReturnType<typeof useGetCourseLevelsQuery>;
export type GetCourseLevelsLazyQueryHookResult = ReturnType<typeof useGetCourseLevelsLazyQuery>;
export type GetCourseLevelsQueryResult = Apollo.QueryResult<
  GetCourseLevelsQuery,
  GetCourseLevelsQueryVariables
>;
export const GeCoursesNamesDocument = gql`
  query GeCoursesNames($pagingInput: PagingInput, $filter: CourseFilter) {
    courses(pagingInput: $pagingInput, filter: $filter) {
      data {
        id
        name
        levels {
          id
          level
          title
          courseSchedule {
            name
            id
            endTime
            endDate
            startDate
            startTime
            isLocked
          }
        }
      }
    }
  }
`;

/**
 * __useGeCoursesNamesQuery__
 *
 * To run a query within a React component, call `useGeCoursesNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeCoursesNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeCoursesNamesQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGeCoursesNamesQuery(
  baseOptions?: Apollo.QueryHookOptions<GeCoursesNamesQuery, GeCoursesNamesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GeCoursesNamesQuery, GeCoursesNamesQueryVariables>(
    GeCoursesNamesDocument,
    options
  );
}
export function useGeCoursesNamesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GeCoursesNamesQuery, GeCoursesNamesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GeCoursesNamesQuery, GeCoursesNamesQueryVariables>(
    GeCoursesNamesDocument,
    options
  );
}
export type GeCoursesNamesQueryHookResult = ReturnType<typeof useGeCoursesNamesQuery>;
export type GeCoursesNamesLazyQueryHookResult = ReturnType<typeof useGeCoursesNamesLazyQuery>;
export type GeCoursesNamesQueryResult = Apollo.QueryResult<
  GeCoursesNamesQuery,
  GeCoursesNamesQueryVariables
>;
export const GetCourseDataDocument = gql`
  query GetCourseData($courseId: Int!) {
    course(id: $courseId) {
      id
      slug
      name
      code
      price
      classLink
      examRequired
      type
      median
      mediumOfExam
      courseCategoryId
      startDate
      endDate
      Summary
      imageUrl
      instructorId
      courseStatus
    }
  }
`;

/**
 * __useGetCourseDataQuery__
 *
 * To run a query within a React component, call `useGetCourseDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseDataQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetCourseDataQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseDataQuery, GetCourseDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseDataQuery, GetCourseDataQueryVariables>(
    GetCourseDataDocument,
    options
  );
}
export function useGetCourseDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCourseDataQuery, GetCourseDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseDataQuery, GetCourseDataQueryVariables>(
    GetCourseDataDocument,
    options
  );
}
export type GetCourseDataQueryHookResult = ReturnType<typeof useGetCourseDataQuery>;
export type GetCourseDataLazyQueryHookResult = ReturnType<typeof useGetCourseDataLazyQuery>;
export type GetCourseDataQueryResult = Apollo.QueryResult<
  GetCourseDataQuery,
  GetCourseDataQueryVariables
>;
export const GeCoursesNamesOnlyDocument = gql`
  query GeCoursesNamesOnly($pagingInput: PagingInput, $filter: CourseFilter) {
    courses(pagingInput: $pagingInput, filter: $filter) {
      data {
        id
        name
      }
    }
  }
`;

/**
 * __useGeCoursesNamesOnlyQuery__
 *
 * To run a query within a React component, call `useGeCoursesNamesOnlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeCoursesNamesOnlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeCoursesNamesOnlyQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGeCoursesNamesOnlyQuery(
  baseOptions?: Apollo.QueryHookOptions<GeCoursesNamesOnlyQuery, GeCoursesNamesOnlyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GeCoursesNamesOnlyQuery, GeCoursesNamesOnlyQueryVariables>(
    GeCoursesNamesOnlyDocument,
    options
  );
}
export function useGeCoursesNamesOnlyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GeCoursesNamesOnlyQuery,
    GeCoursesNamesOnlyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GeCoursesNamesOnlyQuery, GeCoursesNamesOnlyQueryVariables>(
    GeCoursesNamesOnlyDocument,
    options
  );
}
export type GeCoursesNamesOnlyQueryHookResult = ReturnType<typeof useGeCoursesNamesOnlyQuery>;
export type GeCoursesNamesOnlyLazyQueryHookResult = ReturnType<
  typeof useGeCoursesNamesOnlyLazyQuery
>;
export type GeCoursesNamesOnlyQueryResult = Apollo.QueryResult<
  GeCoursesNamesOnlyQuery,
  GeCoursesNamesOnlyQueryVariables
>;
export const RemoveCourseDocument = gql`
  mutation RemoveCourse($removeCourseId: Int!) {
    removeCourse(id: $removeCourseId) {
      id
    }
  }
`;
export type RemoveCourseMutationFn = Apollo.MutationFunction<
  RemoveCourseMutation,
  RemoveCourseMutationVariables
>;

/**
 * __useRemoveCourseMutation__
 *
 * To run a mutation, you first call `useRemoveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseMutation, { data, loading, error }] = useRemoveCourseMutation({
 *   variables: {
 *      removeCourseId: // value for 'removeCourseId'
 *   },
 * });
 */
export function useRemoveCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveCourseMutation, RemoveCourseMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(
    RemoveCourseDocument,
    options
  );
}
export type RemoveCourseMutationHookResult = ReturnType<typeof useRemoveCourseMutation>;
export type RemoveCourseMutationResult = Apollo.MutationResult<RemoveCourseMutation>;
export type RemoveCourseMutationOptions = Apollo.BaseMutationOptions<
  RemoveCourseMutation,
  RemoveCourseMutationVariables
>;
export const GetDepartmentsDocument = gql`
  query GetDepartments($pagingInput: PagingInput) {
    departments(pagingInput: $pagingInput) {
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderField
        orderBy
        previousPage
        size
        totalItems
        totalPages
      }
      data {
        companyId
        createdAt
        id
        name
        slug
      }
    }
  }
`;

/**
 * __useGetDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentsQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetDepartmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(
    GetDepartmentsDocument,
    options
  );
}
export function useGetDepartmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDepartmentsQuery, GetDepartmentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDepartmentsQuery, GetDepartmentsQueryVariables>(
    GetDepartmentsDocument,
    options
  );
}
export type GetDepartmentsQueryHookResult = ReturnType<typeof useGetDepartmentsQuery>;
export type GetDepartmentsLazyQueryHookResult = ReturnType<typeof useGetDepartmentsLazyQuery>;
export type GetDepartmentsQueryResult = Apollo.QueryResult<
  GetDepartmentsQuery,
  GetDepartmentsQueryVariables
>;
export const CreateDepartmentDocument = gql`
  mutation CreateDepartment($createDepartmentInput: CreateDepartmentInput!) {
    createDepartment(createDepartmentInput: $createDepartmentInput) {
      createdAt
      id
      name
      slug
    }
  }
`;
export type CreateDepartmentMutationFn = Apollo.MutationFunction<
  CreateDepartmentMutation,
  CreateDepartmentMutationVariables
>;

/**
 * __useCreateDepartmentMutation__
 *
 * To run a mutation, you first call `useCreateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDepartmentMutation, { data, loading, error }] = useCreateDepartmentMutation({
 *   variables: {
 *      createDepartmentInput: // value for 'createDepartmentInput'
 *   },
 * });
 */
export function useCreateDepartmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDepartmentMutation,
    CreateDepartmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDepartmentMutation, CreateDepartmentMutationVariables>(
    CreateDepartmentDocument,
    options
  );
}
export type CreateDepartmentMutationHookResult = ReturnType<typeof useCreateDepartmentMutation>;
export type CreateDepartmentMutationResult = Apollo.MutationResult<CreateDepartmentMutation>;
export type CreateDepartmentMutationOptions = Apollo.BaseMutationOptions<
  CreateDepartmentMutation,
  CreateDepartmentMutationVariables
>;
export const UpdateDepartmentDocument = gql`
  mutation UpdateDepartment($updateDepartmentInput: UpdateDepartmentInput!) {
    updateDepartment(updateDepartmentInput: $updateDepartmentInput) {
      createdAt
      id
      name
      slug
    }
  }
`;
export type UpdateDepartmentMutationFn = Apollo.MutationFunction<
  UpdateDepartmentMutation,
  UpdateDepartmentMutationVariables
>;

/**
 * __useUpdateDepartmentMutation__
 *
 * To run a mutation, you first call `useUpdateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDepartmentMutation, { data, loading, error }] = useUpdateDepartmentMutation({
 *   variables: {
 *      updateDepartmentInput: // value for 'updateDepartmentInput'
 *   },
 * });
 */
export function useUpdateDepartmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDepartmentMutation,
    UpdateDepartmentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateDepartmentMutation, UpdateDepartmentMutationVariables>(
    UpdateDepartmentDocument,
    options
  );
}
export type UpdateDepartmentMutationHookResult = ReturnType<typeof useUpdateDepartmentMutation>;
export type UpdateDepartmentMutationResult = Apollo.MutationResult<UpdateDepartmentMutation>;
export type UpdateDepartmentMutationOptions = Apollo.BaseMutationOptions<
  UpdateDepartmentMutation,
  UpdateDepartmentMutationVariables
>;
export const GetDesignationsDocument = gql`
  query GetDesignations($pagingInput: PagingInput) {
    designations(pagingInput: $pagingInput) {
      data {
        id
        name
        slug
      }
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalPages
        totalItems
      }
    }
  }
`;

/**
 * __useGetDesignationsQuery__
 *
 * To run a query within a React component, call `useGetDesignationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDesignationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDesignationsQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetDesignationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDesignationsQuery, GetDesignationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDesignationsQuery, GetDesignationsQueryVariables>(
    GetDesignationsDocument,
    options
  );
}
export function useGetDesignationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDesignationsQuery, GetDesignationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDesignationsQuery, GetDesignationsQueryVariables>(
    GetDesignationsDocument,
    options
  );
}
export type GetDesignationsQueryHookResult = ReturnType<typeof useGetDesignationsQuery>;
export type GetDesignationsLazyQueryHookResult = ReturnType<typeof useGetDesignationsLazyQuery>;
export type GetDesignationsQueryResult = Apollo.QueryResult<
  GetDesignationsQuery,
  GetDesignationsQueryVariables
>;
export const CreateDesignationDocument = gql`
  mutation CreateDesignation($createDesignationInput: CreateDesignationInput!) {
    createDesignation(createDesignationInput: $createDesignationInput) {
      id
      name
      slug
    }
  }
`;
export type CreateDesignationMutationFn = Apollo.MutationFunction<
  CreateDesignationMutation,
  CreateDesignationMutationVariables
>;

/**
 * __useCreateDesignationMutation__
 *
 * To run a mutation, you first call `useCreateDesignationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDesignationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDesignationMutation, { data, loading, error }] = useCreateDesignationMutation({
 *   variables: {
 *      createDesignationInput: // value for 'createDesignationInput'
 *   },
 * });
 */
export function useCreateDesignationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDesignationMutation,
    CreateDesignationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDesignationMutation, CreateDesignationMutationVariables>(
    CreateDesignationDocument,
    options
  );
}
export type CreateDesignationMutationHookResult = ReturnType<typeof useCreateDesignationMutation>;
export type CreateDesignationMutationResult = Apollo.MutationResult<CreateDesignationMutation>;
export type CreateDesignationMutationOptions = Apollo.BaseMutationOptions<
  CreateDesignationMutation,
  CreateDesignationMutationVariables
>;
export const UpdateDesignationDocument = gql`
  mutation UpdateDesignation($updateDesignationInput: UpdateDesignationInput!) {
    updateDesignation(updateDesignationInput: $updateDesignationInput) {
      id
      name
    }
  }
`;
export type UpdateDesignationMutationFn = Apollo.MutationFunction<
  UpdateDesignationMutation,
  UpdateDesignationMutationVariables
>;

/**
 * __useUpdateDesignationMutation__
 *
 * To run a mutation, you first call `useUpdateDesignationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDesignationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDesignationMutation, { data, loading, error }] = useUpdateDesignationMutation({
 *   variables: {
 *      updateDesignationInput: // value for 'updateDesignationInput'
 *   },
 * });
 */
export function useUpdateDesignationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDesignationMutation,
    UpdateDesignationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateDesignationMutation, UpdateDesignationMutationVariables>(
    UpdateDesignationDocument,
    options
  );
}
export type UpdateDesignationMutationHookResult = ReturnType<typeof useUpdateDesignationMutation>;
export type UpdateDesignationMutationResult = Apollo.MutationResult<UpdateDesignationMutation>;
export type UpdateDesignationMutationOptions = Apollo.BaseMutationOptions<
  UpdateDesignationMutation,
  UpdateDesignationMutationVariables
>;
export const CreateExamDocument = gql`
  mutation CreateExam($createExamInput: CreateExamInput!) {
    createExam(createExamInput: $createExamInput) {
      achivedMark
      coursesId
      createdAt
      deleted
      id
      maximumMark
      name
      passMark
      updatedAt
      slug
    }
  }
`;
export type CreateExamMutationFn = Apollo.MutationFunction<
  CreateExamMutation,
  CreateExamMutationVariables
>;

/**
 * __useCreateExamMutation__
 *
 * To run a mutation, you first call `useCreateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExamMutation, { data, loading, error }] = useCreateExamMutation({
 *   variables: {
 *      createExamInput: // value for 'createExamInput'
 *   },
 * });
 */
export function useCreateExamMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateExamMutation, CreateExamMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateExamMutation, CreateExamMutationVariables>(
    CreateExamDocument,
    options
  );
}
export type CreateExamMutationHookResult = ReturnType<typeof useCreateExamMutation>;
export type CreateExamMutationResult = Apollo.MutationResult<CreateExamMutation>;
export type CreateExamMutationOptions = Apollo.BaseMutationOptions<
  CreateExamMutation,
  CreateExamMutationVariables
>;
export const GetExamDocument = gql`
  query GetExam($examId: Int!) {
    exam(id: $examId) {
      slug
      passMark
      name
      id
      maximumMark
      createdAt
      coursesId
      type
      courseLevelId
      Questions {
        answer
        answerType
        FailPromt
        answersOptions
        correctAnswer
        examsId
        id
        mark
        question
        slug
        successPromt
        orderNo
        scenarioId
        media {
          id
          name
          url
          thumbnail
        }
      }
    }
  }
`;

/**
 * __useGetExamQuery__
 *
 * To run a query within a React component, call `useGetExamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExamQuery({
 *   variables: {
 *      examId: // value for 'examId'
 *   },
 * });
 */
export function useGetExamQuery(
  baseOptions: Apollo.QueryHookOptions<GetExamQuery, GetExamQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExamQuery, GetExamQueryVariables>(GetExamDocument, options);
}
export function useGetExamLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExamQuery, GetExamQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetExamQuery, GetExamQueryVariables>(GetExamDocument, options);
}
export type GetExamQueryHookResult = ReturnType<typeof useGetExamQuery>;
export type GetExamLazyQueryHookResult = ReturnType<typeof useGetExamLazyQuery>;
export type GetExamQueryResult = Apollo.QueryResult<GetExamQuery, GetExamQueryVariables>;
export const GetExamsDocument = gql`
  query GetExams($pagingInput: PagingInput, $examFilter: ExamFilter) {
    exams(pagingInput: $pagingInput, examFilter: $examFilter) {
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
      data {
        cource {
          id
          name
        }
        coursesId
        createdAt
        id
        maximumMark
        name
        passMark
        slug
        updatedAt
      }
    }
  }
`;

/**
 * __useGetExamsQuery__
 *
 * To run a query within a React component, call `useGetExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExamsQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      examFilter: // value for 'examFilter'
 *   },
 * });
 */
export function useGetExamsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetExamsQuery, GetExamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExamsQuery, GetExamsQueryVariables>(GetExamsDocument, options);
}
export function useGetExamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetExamsQuery, GetExamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetExamsQuery, GetExamsQueryVariables>(GetExamsDocument, options);
}
export type GetExamsQueryHookResult = ReturnType<typeof useGetExamsQuery>;
export type GetExamsLazyQueryHookResult = ReturnType<typeof useGetExamsLazyQuery>;
export type GetExamsQueryResult = Apollo.QueryResult<GetExamsQuery, GetExamsQueryVariables>;
export const UpdateExamDocument = gql`
  mutation UpdateExam($updateExamInput: UpdateExamInput!) {
    updateExam(updateExamInput: $updateExamInput) {
      id
      name
      maximumMark
      coursesId
      passMark
      slug
      updatedAt
      courseLevelId
    }
  }
`;
export type UpdateExamMutationFn = Apollo.MutationFunction<
  UpdateExamMutation,
  UpdateExamMutationVariables
>;

/**
 * __useUpdateExamMutation__
 *
 * To run a mutation, you first call `useUpdateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExamMutation, { data, loading, error }] = useUpdateExamMutation({
 *   variables: {
 *      updateExamInput: // value for 'updateExamInput'
 *   },
 * });
 */
export function useUpdateExamMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateExamMutation, UpdateExamMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateExamMutation, UpdateExamMutationVariables>(
    UpdateExamDocument,
    options
  );
}
export type UpdateExamMutationHookResult = ReturnType<typeof useUpdateExamMutation>;
export type UpdateExamMutationResult = Apollo.MutationResult<UpdateExamMutation>;
export type UpdateExamMutationOptions = Apollo.BaseMutationOptions<
  UpdateExamMutation,
  UpdateExamMutationVariables
>;
export const CreateQuestionScenarioDocument = gql`
  mutation CreateQuestionScenario($createQuestionScenarioInput: CreateQuestionScenarioInput!) {
    createQuestionScenario(createQuestionScenarioInput: $createQuestionScenarioInput) {
      id
      deleted
      createdAt
      name
      slug
      updatedAt
    }
  }
`;
export type CreateQuestionScenarioMutationFn = Apollo.MutationFunction<
  CreateQuestionScenarioMutation,
  CreateQuestionScenarioMutationVariables
>;

/**
 * __useCreateQuestionScenarioMutation__
 *
 * To run a mutation, you first call `useCreateQuestionScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionScenarioMutation, { data, loading, error }] = useCreateQuestionScenarioMutation({
 *   variables: {
 *      createQuestionScenarioInput: // value for 'createQuestionScenarioInput'
 *   },
 * });
 */
export function useCreateQuestionScenarioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateQuestionScenarioMutation,
    CreateQuestionScenarioMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateQuestionScenarioMutation,
    CreateQuestionScenarioMutationVariables
  >(CreateQuestionScenarioDocument, options);
}
export type CreateQuestionScenarioMutationHookResult = ReturnType<
  typeof useCreateQuestionScenarioMutation
>;
export type CreateQuestionScenarioMutationResult =
  Apollo.MutationResult<CreateQuestionScenarioMutation>;
export type CreateQuestionScenarioMutationOptions = Apollo.BaseMutationOptions<
  CreateQuestionScenarioMutation,
  CreateQuestionScenarioMutationVariables
>;
export const UpdateQuestionScenarioDocument = gql`
  mutation UpdateQuestionScenario($updateQuestionScenarioInput: UpdateQuestionScenarioInput!) {
    updateQuestionScenario(updateQuestionScenarioInput: $updateQuestionScenarioInput) {
      id
      name
      slug
      updatedAt
      createdAt
    }
  }
`;
export type UpdateQuestionScenarioMutationFn = Apollo.MutationFunction<
  UpdateQuestionScenarioMutation,
  UpdateQuestionScenarioMutationVariables
>;

/**
 * __useUpdateQuestionScenarioMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionScenarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionScenarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionScenarioMutation, { data, loading, error }] = useUpdateQuestionScenarioMutation({
 *   variables: {
 *      updateQuestionScenarioInput: // value for 'updateQuestionScenarioInput'
 *   },
 * });
 */
export function useUpdateQuestionScenarioMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateQuestionScenarioMutation,
    UpdateQuestionScenarioMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateQuestionScenarioMutation,
    UpdateQuestionScenarioMutationVariables
  >(UpdateQuestionScenarioDocument, options);
}
export type UpdateQuestionScenarioMutationHookResult = ReturnType<
  typeof useUpdateQuestionScenarioMutation
>;
export type UpdateQuestionScenarioMutationResult =
  Apollo.MutationResult<UpdateQuestionScenarioMutation>;
export type UpdateQuestionScenarioMutationOptions = Apollo.BaseMutationOptions<
  UpdateQuestionScenarioMutation,
  UpdateQuestionScenarioMutationVariables
>;
export const GetQuestionScenariosDocument = gql`
  query GetQuestionScenarios($filter: QuestionScenarioFilters) {
    questionScenarios(filter: $filter) {
      id
      levelId
      name
      scenario
      slug
      media {
        id
        name
        url
        thumbnail
      }
    }
  }
`;

/**
 * __useGetQuestionScenariosQuery__
 *
 * To run a query within a React component, call `useGetQuestionScenariosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionScenariosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionScenariosQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetQuestionScenariosQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetQuestionScenariosQuery,
    GetQuestionScenariosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetQuestionScenariosQuery, GetQuestionScenariosQueryVariables>(
    GetQuestionScenariosDocument,
    options
  );
}
export function useGetQuestionScenariosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetQuestionScenariosQuery,
    GetQuestionScenariosQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetQuestionScenariosQuery, GetQuestionScenariosQueryVariables>(
    GetQuestionScenariosDocument,
    options
  );
}
export type GetQuestionScenariosQueryHookResult = ReturnType<typeof useGetQuestionScenariosQuery>;
export type GetQuestionScenariosLazyQueryHookResult = ReturnType<
  typeof useGetQuestionScenariosLazyQuery
>;
export type GetQuestionScenariosQueryResult = Apollo.QueryResult<
  GetQuestionScenariosQuery,
  GetQuestionScenariosQueryVariables
>;
export const GetCourseLevelExamsDocument = gql`
  query GetCourseLevelExams($courseLevelId: Int!) {
    courseLevel(id: $courseLevelId) {
      exams {
        id
        name
        maximumMark
        passMark
        slug
        type
      }
    }
  }
`;

/**
 * __useGetCourseLevelExamsQuery__
 *
 * To run a query within a React component, call `useGetCourseLevelExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseLevelExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseLevelExamsQuery({
 *   variables: {
 *      courseLevelId: // value for 'courseLevelId'
 *   },
 * });
 */
export function useGetCourseLevelExamsQuery(
  baseOptions: Apollo.QueryHookOptions<GetCourseLevelExamsQuery, GetCourseLevelExamsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCourseLevelExamsQuery, GetCourseLevelExamsQueryVariables>(
    GetCourseLevelExamsDocument,
    options
  );
}
export function useGetCourseLevelExamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCourseLevelExamsQuery,
    GetCourseLevelExamsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCourseLevelExamsQuery, GetCourseLevelExamsQueryVariables>(
    GetCourseLevelExamsDocument,
    options
  );
}
export type GetCourseLevelExamsQueryHookResult = ReturnType<typeof useGetCourseLevelExamsQuery>;
export type GetCourseLevelExamsLazyQueryHookResult = ReturnType<
  typeof useGetCourseLevelExamsLazyQuery
>;
export type GetCourseLevelExamsQueryResult = Apollo.QueryResult<
  GetCourseLevelExamsQuery,
  GetCourseLevelExamsQueryVariables
>;
export const MakeFilePublicDocument = gql`
  mutation MakeFilePublic($path: String!) {
    makeFilePublic(path: $path) {
      url
    }
  }
`;
export type MakeFilePublicMutationFn = Apollo.MutationFunction<
  MakeFilePublicMutation,
  MakeFilePublicMutationVariables
>;

/**
 * __useMakeFilePublicMutation__
 *
 * To run a mutation, you first call `useMakeFilePublicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeFilePublicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeFilePublicMutation, { data, loading, error }] = useMakeFilePublicMutation({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useMakeFilePublicMutation(
  baseOptions?: Apollo.MutationHookOptions<MakeFilePublicMutation, MakeFilePublicMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MakeFilePublicMutation, MakeFilePublicMutationVariables>(
    MakeFilePublicDocument,
    options
  );
}
export type MakeFilePublicMutationHookResult = ReturnType<typeof useMakeFilePublicMutation>;
export type MakeFilePublicMutationResult = Apollo.MutationResult<MakeFilePublicMutation>;
export type MakeFilePublicMutationOptions = Apollo.BaseMutationOptions<
  MakeFilePublicMutation,
  MakeFilePublicMutationVariables
>;
export const GetAllPermissionsDocument = gql`
  query GetAllPermissions {
    permissions {
      data {
        id
        deleted
        name
        roleId
        slug
        updatedAt
      }
    }
  }
`;

/**
 * __useGetAllPermissionsQuery__
 *
 * To run a query within a React component, call `useGetAllPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPermissionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllPermissionsQuery, GetAllPermissionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllPermissionsQuery, GetAllPermissionsQueryVariables>(
    GetAllPermissionsDocument,
    options
  );
}
export function useGetAllPermissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllPermissionsQuery, GetAllPermissionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllPermissionsQuery, GetAllPermissionsQueryVariables>(
    GetAllPermissionsDocument,
    options
  );
}
export type GetAllPermissionsQueryHookResult = ReturnType<typeof useGetAllPermissionsQuery>;
export type GetAllPermissionsLazyQueryHookResult = ReturnType<typeof useGetAllPermissionsLazyQuery>;
export type GetAllPermissionsQueryResult = Apollo.QueryResult<
  GetAllPermissionsQuery,
  GetAllPermissionsQueryVariables
>;
export const CreateUserNewDocument = gql`
  mutation CreateUserNew($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      idNumber
      idUrl
      companyId
    }
  }
`;
export type CreateUserNewMutationFn = Apollo.MutationFunction<
  CreateUserNewMutation,
  CreateUserNewMutationVariables
>;

/**
 * __useCreateUserNewMutation__
 *
 * To run a mutation, you first call `useCreateUserNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserNewMutation, { data, loading, error }] = useCreateUserNewMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserNewMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserNewMutation, CreateUserNewMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserNewMutation, CreateUserNewMutationVariables>(
    CreateUserNewDocument,
    options
  );
}
export type CreateUserNewMutationHookResult = ReturnType<typeof useCreateUserNewMutation>;
export type CreateUserNewMutationResult = Apollo.MutationResult<CreateUserNewMutation>;
export type CreateUserNewMutationOptions = Apollo.BaseMutationOptions<
  CreateUserNewMutation,
  CreateUserNewMutationVariables
>;
export const GetNotificationsDocument = gql`
  query GetNotifications($filter: NotificationFilter, $pagingInput: PagingInput) {
    notifications(filter: $filter, pagingInput: $pagingInput) {
      data {
        path
        contextId
        contextType
        createdAt
        id
        message
        read
        readOn
        slug
        receiverId
        title
        updatedAt
      }
      paging {
        currentPage
        hasNextPage
        nextPage
        hasPreviousPage
        orderBy
        orderField
        previousPage
        size
        totalItems
        totalPages
      }
    }
  }
`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    options
  );
}
export function useGetNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    options
  );
}
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<
  GetNotificationsQuery,
  GetNotificationsQueryVariables
>;
export const MarkNotificationAsReadDocument = gql`
  mutation MarkNotificationAsRead {
    markNotificationAsRead {
      message
    }
  }
`;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<
  MarkNotificationAsReadMutation,
  MarkNotificationAsReadMutationVariables
>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkNotificationAsReadMutation,
    MarkNotificationAsReadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkNotificationAsReadMutation,
    MarkNotificationAsReadMutationVariables
  >(MarkNotificationAsReadDocument, options);
}
export type MarkNotificationAsReadMutationHookResult = ReturnType<
  typeof useMarkNotificationAsReadMutation
>;
export type MarkNotificationAsReadMutationResult =
  Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<
  MarkNotificationAsReadMutation,
  MarkNotificationAsReadMutationVariables
>;
export const GetUnreadNotificationCountDocument = gql`
  query GetUnreadNotificationCount {
    getUnreadNotificationCount {
      count
    }
  }
`;

/**
 * __useGetUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadNotificationCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(
    GetUnreadNotificationCountDocument,
    options
  );
}
export function useGetUnreadNotificationCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >(GetUnreadNotificationCountDocument, options);
}
export type GetUnreadNotificationCountQueryHookResult = ReturnType<
  typeof useGetUnreadNotificationCountQuery
>;
export type GetUnreadNotificationCountLazyQueryHookResult = ReturnType<
  typeof useGetUnreadNotificationCountLazyQuery
>;
export type GetUnreadNotificationCountQueryResult = Apollo.QueryResult<
  GetUnreadNotificationCountQuery,
  GetUnreadNotificationCountQueryVariables
>;
export const GetAttendanceReportDocument = gql`
  query GetAttendanceReport($attendanceReportFilter: AttendanceReportFilter) {
    attendanceReport(attendanceReportFilter: $attendanceReportFilter) {
      filter
      message
      report
      success
    }
  }
`;

/**
 * __useGetAttendanceReportQuery__
 *
 * To run a query within a React component, call `useGetAttendanceReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttendanceReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttendanceReportQuery({
 *   variables: {
 *      attendanceReportFilter: // value for 'attendanceReportFilter'
 *   },
 * });
 */
export function useGetAttendanceReportQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAttendanceReportQuery, GetAttendanceReportQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAttendanceReportQuery, GetAttendanceReportQueryVariables>(
    GetAttendanceReportDocument,
    options
  );
}
export function useGetAttendanceReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAttendanceReportQuery,
    GetAttendanceReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAttendanceReportQuery, GetAttendanceReportQueryVariables>(
    GetAttendanceReportDocument,
    options
  );
}
export type GetAttendanceReportQueryHookResult = ReturnType<typeof useGetAttendanceReportQuery>;
export type GetAttendanceReportLazyQueryHookResult = ReturnType<
  typeof useGetAttendanceReportLazyQuery
>;
export type GetAttendanceReportQueryResult = Apollo.QueryResult<
  GetAttendanceReportQuery,
  GetAttendanceReportQueryVariables
>;
export const GetReportListDocument = gql`
  query GetReportList {
    reportList {
      title
      description
      slug
    }
  }
`;

/**
 * __useGetReportListQuery__
 *
 * To run a query within a React component, call `useGetReportListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReportListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetReportListQuery, GetReportListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReportListQuery, GetReportListQueryVariables>(
    GetReportListDocument,
    options
  );
}
export function useGetReportListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReportListQuery, GetReportListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetReportListQuery, GetReportListQueryVariables>(
    GetReportListDocument,
    options
  );
}
export type GetReportListQueryHookResult = ReturnType<typeof useGetReportListQuery>;
export type GetReportListLazyQueryHookResult = ReturnType<typeof useGetReportListLazyQuery>;
export type GetReportListQueryResult = Apollo.QueryResult<
  GetReportListQuery,
  GetReportListQueryVariables
>;
export const GetReportListItemDocument = gql`
  query GetReportListItem($slug: String!) {
    reportListItem(slug: $slug) {
      columns {
        dataIndex
        key
        title
        type
        bgColor
        color
      }
      description
      filters {
        label
        name
        type
        rules
        options {
          label
          value
        }
      }
      slug
      title
    }
  }
`;

/**
 * __useGetReportListItemQuery__
 *
 * To run a query within a React component, call `useGetReportListItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportListItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportListItemQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetReportListItemQuery(
  baseOptions: Apollo.QueryHookOptions<GetReportListItemQuery, GetReportListItemQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReportListItemQuery, GetReportListItemQueryVariables>(
    GetReportListItemDocument,
    options
  );
}
export function useGetReportListItemLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetReportListItemQuery, GetReportListItemQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetReportListItemQuery, GetReportListItemQueryVariables>(
    GetReportListItemDocument,
    options
  );
}
export type GetReportListItemQueryHookResult = ReturnType<typeof useGetReportListItemQuery>;
export type GetReportListItemLazyQueryHookResult = ReturnType<typeof useGetReportListItemLazyQuery>;
export type GetReportListItemQueryResult = Apollo.QueryResult<
  GetReportListItemQuery,
  GetReportListItemQueryVariables
>;
export const GenerateReportDocument = gql`
  query GenerateReport($slug: String!, $filter: JSON) {
    generateReport(slug: $slug, filter: $filter) {
      filter
      columns {
        dataIndex
        key
        title
        type
        bgColor
        color
      }
      message
      report
      reportData
      success
    }
  }
`;

/**
 * __useGenerateReportQuery__
 *
 * To run a query within a React component, call `useGenerateReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateReportQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGenerateReportQuery(
  baseOptions: Apollo.QueryHookOptions<GenerateReportQuery, GenerateReportQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GenerateReportQuery, GenerateReportQueryVariables>(
    GenerateReportDocument,
    options
  );
}
export function useGenerateReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GenerateReportQuery, GenerateReportQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GenerateReportQuery, GenerateReportQueryVariables>(
    GenerateReportDocument,
    options
  );
}
export type GenerateReportQueryHookResult = ReturnType<typeof useGenerateReportQuery>;
export type GenerateReportLazyQueryHookResult = ReturnType<typeof useGenerateReportLazyQuery>;
export type GenerateReportQueryResult = Apollo.QueryResult<
  GenerateReportQuery,
  GenerateReportQueryVariables
>;
export const CreateRequestDocument = gql`
  mutation CreateRequest($createRequestInput: CreateRequestInput!) {
    createRequest(createRequestInput: $createRequestInput) {
      id
      rejectedOn
      remarks
      requestedOn
      type
      status
      slug
      userId
      approvedOn
    }
  }
`;
export type CreateRequestMutationFn = Apollo.MutationFunction<
  CreateRequestMutation,
  CreateRequestMutationVariables
>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      createRequestInput: // value for 'createRequestInput'
 *   },
 * });
 */
export function useCreateRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(
    CreateRequestDocument,
    options
  );
}
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateRequestMutation,
  CreateRequestMutationVariables
>;
export const GetRequestsDocument = gql`
  query GetRequests($findRequestInput: FindRequestInput!, $pagingInput: PagingInput) {
    requests(findRequestInput: $findRequestInput, pagingInput: $pagingInput) {
      data {
        approvedOn
        contextId
        context
        coursesId
        createdAt
        creatorId
        id
        rejectedOn
        remarks
        requestedOn
        slug
        status
        type
        updatedAt
        userId
        user {
          id
          name
        }
        attendedExam {
          id
          slug
        }
        reason
      }
    }
  }
`;

/**
 * __useGetRequestsQuery__
 *
 * To run a query within a React component, call `useGetRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsQuery({
 *   variables: {
 *      findRequestInput: // value for 'findRequestInput'
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useGetRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRequestsQuery, GetRequestsQueryVariables>(GetRequestsDocument, options);
}
export function useGetRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRequestsQuery, GetRequestsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRequestsQuery, GetRequestsQueryVariables>(
    GetRequestsDocument,
    options
  );
}
export type GetRequestsQueryHookResult = ReturnType<typeof useGetRequestsQuery>;
export type GetRequestsLazyQueryHookResult = ReturnType<typeof useGetRequestsLazyQuery>;
export type GetRequestsQueryResult = Apollo.QueryResult<
  GetRequestsQuery,
  GetRequestsQueryVariables
>;
export const UpdateRequestDocument = gql`
  mutation UpdateRequest($updateRequestInput: UpdateRequestInput!) {
    updateRequest(updateRequestInput: $updateRequestInput) {
      id
    }
  }
`;
export type UpdateRequestMutationFn = Apollo.MutationFunction<
  UpdateRequestMutation,
  UpdateRequestMutationVariables
>;

/**
 * __useUpdateRequestMutation__
 *
 * To run a mutation, you first call `useUpdateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestMutation, { data, loading, error }] = useUpdateRequestMutation({
 *   variables: {
 *      updateRequestInput: // value for 'updateRequestInput'
 *   },
 * });
 */
export function useUpdateRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateRequestMutation, UpdateRequestMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRequestMutation, UpdateRequestMutationVariables>(
    UpdateRequestDocument,
    options
  );
}
export type UpdateRequestMutationHookResult = ReturnType<typeof useUpdateRequestMutation>;
export type UpdateRequestMutationResult = Apollo.MutationResult<UpdateRequestMutation>;
export type UpdateRequestMutationOptions = Apollo.BaseMutationOptions<
  UpdateRequestMutation,
  UpdateRequestMutationVariables
>;
export const UpdateScheduleProgressDocument = gql`
  mutation UpdateScheduleProgress($updateScheduleProgressInput: UpdateScheduleProgressInput!) {
    updateScheduleProgress(updateScheduleProgressInput: $updateScheduleProgressInput) {
      id
      courseScheduleStudentId
      slug
      status
      coursesId
      courseLevelId
      chaptersId
      activityStatus
      createdAt
      userId
    }
  }
`;
export type UpdateScheduleProgressMutationFn = Apollo.MutationFunction<
  UpdateScheduleProgressMutation,
  UpdateScheduleProgressMutationVariables
>;

/**
 * __useUpdateScheduleProgressMutation__
 *
 * To run a mutation, you first call `useUpdateScheduleProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScheduleProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScheduleProgressMutation, { data, loading, error }] = useUpdateScheduleProgressMutation({
 *   variables: {
 *      updateScheduleProgressInput: // value for 'updateScheduleProgressInput'
 *   },
 * });
 */
export function useUpdateScheduleProgressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateScheduleProgressMutation,
    UpdateScheduleProgressMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateScheduleProgressMutation,
    UpdateScheduleProgressMutationVariables
  >(UpdateScheduleProgressDocument, options);
}
export type UpdateScheduleProgressMutationHookResult = ReturnType<
  typeof useUpdateScheduleProgressMutation
>;
export type UpdateScheduleProgressMutationResult =
  Apollo.MutationResult<UpdateScheduleProgressMutation>;
export type UpdateScheduleProgressMutationOptions = Apollo.BaseMutationOptions<
  UpdateScheduleProgressMutation,
  UpdateScheduleProgressMutationVariables
>;
export const CreateUploadSignedUrlDocument = gql`
  mutation CreateUploadSignedUrl($createUploadSignedUrlInput: CreateUploadSignedUrlInput!) {
    createUploadSignedUrl(createUploadSignedUrlInput: $createUploadSignedUrlInput) {
      signedUrl
      url
    }
  }
`;
export type CreateUploadSignedUrlMutationFn = Apollo.MutationFunction<
  CreateUploadSignedUrlMutation,
  CreateUploadSignedUrlMutationVariables
>;

/**
 * __useCreateUploadSignedUrlMutation__
 *
 * To run a mutation, you first call `useCreateUploadSignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadSignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadSignedUrlMutation, { data, loading, error }] = useCreateUploadSignedUrlMutation({
 *   variables: {
 *      createUploadSignedUrlInput: // value for 'createUploadSignedUrlInput'
 *   },
 * });
 */
export function useCreateUploadSignedUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUploadSignedUrlMutation,
    CreateUploadSignedUrlMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUploadSignedUrlMutation, CreateUploadSignedUrlMutationVariables>(
    CreateUploadSignedUrlDocument,
    options
  );
}
export type CreateUploadSignedUrlMutationHookResult = ReturnType<
  typeof useCreateUploadSignedUrlMutation
>;
export type CreateUploadSignedUrlMutationResult =
  Apollo.MutationResult<CreateUploadSignedUrlMutation>;
export type CreateUploadSignedUrlMutationOptions = Apollo.BaseMutationOptions<
  CreateUploadSignedUrlMutation,
  CreateUploadSignedUrlMutationVariables
>;
export const GetScheduleStudentDocument = gql`
  query GetScheduleStudent($slug: ID!) {
    scheduleStudent(slug: $slug) {
      id
      name
      slug
      updatedAt
      courseScheduleId
      courseSchedule {
        course {
          name
          price
          code
          courseCategoryId
          median
          courseCategory {
            id
            name
          }
          courseStatus
          id
          examRequired
          imageUrl
          instructorId
          instructor {
            id
            name
          }
          type
          mediumOfExam
        }
        courseLevel {
          id
          slug
          title
        }
        id
        endDate
        endTime
        days
        courseLevelId
        coursesId
        startDate
        startTime
        name
      }
      completionPercentage
      status
      exams {
        id
        name
        status
        slug
        createdAt
        achivedMark
        totalMark
      }
    }
  }
`;

/**
 * __useGetScheduleStudentQuery__
 *
 * To run a query within a React component, call `useGetScheduleStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduleStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduleStudentQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetScheduleStudentQuery(
  baseOptions: Apollo.QueryHookOptions<GetScheduleStudentQuery, GetScheduleStudentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScheduleStudentQuery, GetScheduleStudentQueryVariables>(
    GetScheduleStudentDocument,
    options
  );
}
export function useGetScheduleStudentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScheduleStudentQuery,
    GetScheduleStudentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScheduleStudentQuery, GetScheduleStudentQueryVariables>(
    GetScheduleStudentDocument,
    options
  );
}
export type GetScheduleStudentQueryHookResult = ReturnType<typeof useGetScheduleStudentQuery>;
export type GetScheduleStudentLazyQueryHookResult = ReturnType<
  typeof useGetScheduleStudentLazyQuery
>;
export type GetScheduleStudentQueryResult = Apollo.QueryResult<
  GetScheduleStudentQuery,
  GetScheduleStudentQueryVariables
>;
export const UpdateScheduleStudentDocument = gql`
  mutation UpdateScheduleStudent($updateScheduleStudentInput: UpdateScheduleStudentInput!) {
    updateScheduleStudent(updateScheduleStudentInput: $updateScheduleStudentInput) {
      id
      name
      slug
      courseScheduleId
    }
  }
`;
export type UpdateScheduleStudentMutationFn = Apollo.MutationFunction<
  UpdateScheduleStudentMutation,
  UpdateScheduleStudentMutationVariables
>;

/**
 * __useUpdateScheduleStudentMutation__
 *
 * To run a mutation, you first call `useUpdateScheduleStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScheduleStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScheduleStudentMutation, { data, loading, error }] = useUpdateScheduleStudentMutation({
 *   variables: {
 *      updateScheduleStudentInput: // value for 'updateScheduleStudentInput'
 *   },
 * });
 */
export function useUpdateScheduleStudentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateScheduleStudentMutation,
    UpdateScheduleStudentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateScheduleStudentMutation, UpdateScheduleStudentMutationVariables>(
    UpdateScheduleStudentDocument,
    options
  );
}
export type UpdateScheduleStudentMutationHookResult = ReturnType<
  typeof useUpdateScheduleStudentMutation
>;
export type UpdateScheduleStudentMutationResult =
  Apollo.MutationResult<UpdateScheduleStudentMutation>;
export type UpdateScheduleStudentMutationOptions = Apollo.BaseMutationOptions<
  UpdateScheduleStudentMutation,
  UpdateScheduleStudentMutationVariables
>;
export const GetScheduleStudentDetailsDocument = gql`
  query GetScheduleStudentDetails($slug: ID!) {
    scheduleStudent(slug: $slug) {
      id
      name
      slug
      updatedAt
      courseScheduleId
      progress {
        chaptersId
        activityStatus
        coursesId
        courseLevelId
        createdAt
        deleted
        deletedAt
        id
        courseScheduleStudentId
        status
        lessonStatus
      }
      courseSchedule {
        course {
          name
          price
          code
          courseCategoryId
          median
          examRequired
          courseCategory {
            id
            name
          }
          courseStatus
          id
          examRequired
          imageUrl
          instructorId
          Summary
          instructor {
            id
            name
          }
          type
        }
        courseLevel {
          id
          slug
          title
          chapters {
            name
            slug
            link
            keyLearning
            id
            createdAt
            chapterType
            Questions {
              answersOptions
              id
              question
            }
          }
        }
        id
        endDate
        endTime
        days
        courseLevelId
        coursesId
        startDate
        startTime
        name
      }
      completionPercentage
      status
      exams {
        id
        name
        status
        slug
      }
    }
  }
`;

/**
 * __useGetScheduleStudentDetailsQuery__
 *
 * To run a query within a React component, call `useGetScheduleStudentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduleStudentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduleStudentDetailsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetScheduleStudentDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetScheduleStudentDetailsQuery,
    GetScheduleStudentDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScheduleStudentDetailsQuery, GetScheduleStudentDetailsQueryVariables>(
    GetScheduleStudentDetailsDocument,
    options
  );
}
export function useGetScheduleStudentDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScheduleStudentDetailsQuery,
    GetScheduleStudentDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetScheduleStudentDetailsQuery,
    GetScheduleStudentDetailsQueryVariables
  >(GetScheduleStudentDetailsDocument, options);
}
export type GetScheduleStudentDetailsQueryHookResult = ReturnType<
  typeof useGetScheduleStudentDetailsQuery
>;
export type GetScheduleStudentDetailsLazyQueryHookResult = ReturnType<
  typeof useGetScheduleStudentDetailsLazyQuery
>;
export type GetScheduleStudentDetailsQueryResult = Apollo.QueryResult<
  GetScheduleStudentDetailsQuery,
  GetScheduleStudentDetailsQueryVariables
>;
export const GetScheduleStudentNameDocument = gql`
  query GetScheduleStudentName($getScheduleStudentInput: GetScheduleStudentInput) {
    scheduleStudents(getScheduleStudentInput: $getScheduleStudentInput) {
      id
      name
      userId
      user {
        id
        name
        idNumber
      }
      status
      completionPercentage
      slug
      startedOn
      courseScheduleId
    }
  }
`;

/**
 * __useGetScheduleStudentNameQuery__
 *
 * To run a query within a React component, call `useGetScheduleStudentNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduleStudentNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduleStudentNameQuery({
 *   variables: {
 *      getScheduleStudentInput: // value for 'getScheduleStudentInput'
 *   },
 * });
 */
export function useGetScheduleStudentNameQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetScheduleStudentNameQuery,
    GetScheduleStudentNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetScheduleStudentNameQuery, GetScheduleStudentNameQueryVariables>(
    GetScheduleStudentNameDocument,
    options
  );
}
export function useGetScheduleStudentNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetScheduleStudentNameQuery,
    GetScheduleStudentNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetScheduleStudentNameQuery, GetScheduleStudentNameQueryVariables>(
    GetScheduleStudentNameDocument,
    options
  );
}
export type GetScheduleStudentNameQueryHookResult = ReturnType<
  typeof useGetScheduleStudentNameQuery
>;
export type GetScheduleStudentNameLazyQueryHookResult = ReturnType<
  typeof useGetScheduleStudentNameLazyQuery
>;
export type GetScheduleStudentNameQueryResult = Apollo.QueryResult<
  GetScheduleStudentNameQuery,
  GetScheduleStudentNameQueryVariables
>;
export const CreateScheduleStudentDocument = gql`
  mutation CreateScheduleStudent($createScheduleStudentInput: CreateScheduleStudentInput!) {
    createScheduleStudent(createScheduleStudentInput: $createScheduleStudentInput) {
      id
      name
    }
  }
`;
export type CreateScheduleStudentMutationFn = Apollo.MutationFunction<
  CreateScheduleStudentMutation,
  CreateScheduleStudentMutationVariables
>;

/**
 * __useCreateScheduleStudentMutation__
 *
 * To run a mutation, you first call `useCreateScheduleStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScheduleStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScheduleStudentMutation, { data, loading, error }] = useCreateScheduleStudentMutation({
 *   variables: {
 *      createScheduleStudentInput: // value for 'createScheduleStudentInput'
 *   },
 * });
 */
export function useCreateScheduleStudentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateScheduleStudentMutation,
    CreateScheduleStudentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateScheduleStudentMutation, CreateScheduleStudentMutationVariables>(
    CreateScheduleStudentDocument,
    options
  );
}
export type CreateScheduleStudentMutationHookResult = ReturnType<
  typeof useCreateScheduleStudentMutation
>;
export type CreateScheduleStudentMutationResult =
  Apollo.MutationResult<CreateScheduleStudentMutation>;
export type CreateScheduleStudentMutationOptions = Apollo.BaseMutationOptions<
  CreateScheduleStudentMutation,
  CreateScheduleStudentMutationVariables
>;
export const UserRolesDocument = gql`
  query UserRoles($pagingInput: PagingInput) {
    userRoles(pagingInput: $pagingInput) {
      data {
        createdAt
        deleted
        id
        name
        slug
      }
      paging {
        currentPage
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
        size
        totalItems
        totalPages
      }
    }
  }
`;

/**
 * __useUserRolesQuery__
 *
 * To run a query within a React component, call `useUserRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *   },
 * });
 */
export function useUserRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserRolesQuery, UserRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserRolesQuery, UserRolesQueryVariables>(UserRolesDocument, options);
}
export function useUserRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserRolesQuery, UserRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserRolesQuery, UserRolesQueryVariables>(UserRolesDocument, options);
}
export type UserRolesQueryHookResult = ReturnType<typeof useUserRolesQuery>;
export type UserRolesLazyQueryHookResult = ReturnType<typeof useUserRolesLazyQuery>;
export type UserRolesQueryResult = Apollo.QueryResult<UserRolesQuery, UserRolesQueryVariables>;
export const CreateUserRoleDocument = gql`
  mutation CreateUserRole($createUserRoleInput: CreateUserRoleInput!) {
    createUserRole(createUserRoleInput: $createUserRoleInput) {
      name
      slug
      id
    }
  }
`;
export type CreateUserRoleMutationFn = Apollo.MutationFunction<
  CreateUserRoleMutation,
  CreateUserRoleMutationVariables
>;

/**
 * __useCreateUserRoleMutation__
 *
 * To run a mutation, you first call `useCreateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserRoleMutation, { data, loading, error }] = useCreateUserRoleMutation({
 *   variables: {
 *      createUserRoleInput: // value for 'createUserRoleInput'
 *   },
 * });
 */
export function useCreateUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserRoleMutation, CreateUserRoleMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserRoleMutation, CreateUserRoleMutationVariables>(
    CreateUserRoleDocument,
    options
  );
}
export type CreateUserRoleMutationHookResult = ReturnType<typeof useCreateUserRoleMutation>;
export type CreateUserRoleMutationResult = Apollo.MutationResult<CreateUserRoleMutation>;
export type CreateUserRoleMutationOptions = Apollo.BaseMutationOptions<
  CreateUserRoleMutation,
  CreateUserRoleMutationVariables
>;
export const UpdateUserRoleDocument = gql`
  mutation UpdateUserRole($updateUserRoleInput: UpdateUserRoleInput!) {
    updateUserRole(updateUserRoleInput: $updateUserRoleInput) {
      companyId
      createdAt
      name
      id
      slug
    }
  }
`;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<
  UpdateUserRoleMutation,
  UpdateUserRoleMutationVariables
>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      updateUserRoleInput: // value for 'updateUserRoleInput'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(
    UpdateUserRoleDocument,
    options
  );
}
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserRoleMutation,
  UpdateUserRoleMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      firebaseID
      email
      departmentId
      dateOfBirth
      idNumber
      idUrl
      imageUrl
      managerId
      name
      passportUrl
      passwordUrl
      phone
      profileImageUrl
      qualification
      roleId
      slug
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const GetUsersDocument = gql`
  query GetUsers($pagingInput: PagingInput, $filter: UserFilter) {
    users(pagingInput: $pagingInput, filter: $filter) {
      data {
        createdAt
        dateOfBirth
        deleted
        department {
          id
          name
        }
        email
        firebaseID
        id
        idNumber
        idUrl
        imageUrl
        manager {
          id
          name
        }
        name
        phone
        profileImageUrl
        qualification
        role {
          id
          name
        }
        slug
        updatedAt
        status
      }
      paging {
        currentPage
        hasPreviousPage
        hasNextPage
        nextPage
        orderBy
        previousPage
        size
        totalItems
        totalPages
        orderField
      }
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUsersOnlyDocument = gql`
  query GetUsersOnly($pagingInput: PagingInput, $filter: UserFilter) {
    users(pagingInput: $pagingInput, filter: $filter) {
      data {
        id
        name
        idNumber
        status
      }
      paging {
        currentPage
        hasPreviousPage
        hasNextPage
        nextPage
        orderBy
        previousPage
        size
        totalItems
        totalPages
        orderField
      }
    }
  }
`;

/**
 * __useGetUsersOnlyQuery__
 *
 * To run a query within a React component, call `useGetUsersOnlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersOnlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersOnlyQuery({
 *   variables: {
 *      pagingInput: // value for 'pagingInput'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUsersOnlyQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersOnlyQuery, GetUsersOnlyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersOnlyQuery, GetUsersOnlyQueryVariables>(
    GetUsersOnlyDocument,
    options
  );
}
export function useGetUsersOnlyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersOnlyQuery, GetUsersOnlyQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersOnlyQuery, GetUsersOnlyQueryVariables>(
    GetUsersOnlyDocument,
    options
  );
}
export type GetUsersOnlyQueryHookResult = ReturnType<typeof useGetUsersOnlyQuery>;
export type GetUsersOnlyLazyQueryHookResult = ReturnType<typeof useGetUsersOnlyLazyQuery>;
export type GetUsersOnlyQueryResult = Apollo.QueryResult<
  GetUsersOnlyQuery,
  GetUsersOnlyQueryVariables
>;
export const GetUserProfileDocument = gql`
  query GetUserProfile {
    getUserProfile {
      companyId
      createdAt
      dateOfBirth
      departmentId
      email
      firebaseID
      id
      idUrl
      idNumber
      imageUrl
      managerId
      name
      passportUrl
      passwordUrl
      phone
      profileImageUrl
      qualification
      roleId
      updatedAt
      slug
      role {
        id
        name
      }
    }
  }
`;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(
    GetUserProfileDocument,
    options
  );
}
export function useGetUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(
    GetUserProfileDocument,
    options
  );
}
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<
  GetUserProfileQuery,
  GetUserProfileQueryVariables
>;
export const UpdateUserProfileDocument = gql`
  mutation updateUserProfile($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      companyId
      createdAt
      dateOfBirth
      departmentId
      email
      firebaseID
      id
      idUrl
      idNumber
      imageUrl
      managerId
      name
      passportUrl
      passwordUrl
      phone
      profileImageUrl
      qualification
      roleId
      updatedAt
      slug
    }
  }
`;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
    UpdateUserProfileDocument,
    options
  );
}
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;
export const GetUserDetailsDocument = gql`
  query GetUserDetails($userId: Int!) {
    user(id: $userId) {
      companyId
      createdAt
      dateOfBirth
      departmentId
      email
      firebaseID
      id
      idNumber
      idUrl
      imageUrl
      managerId
      name
      passportUrl
      passwordUrl
      phone
      profileImageUrl
      qualification
      roleId
      slug
      type
      updatedAt
      institution
      status
      signature
      designationId
    }
  }
`;

/**
 * __useGetUserDetailsQuery__
 *
 * To run a query within a React component, call `useGetUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(
    GetUserDetailsDocument,
    options
  );
}
export function useGetUserDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailsQuery, GetUserDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(
    GetUserDetailsDocument,
    options
  );
}
export type GetUserDetailsQueryHookResult = ReturnType<typeof useGetUserDetailsQuery>;
export type GetUserDetailsLazyQueryHookResult = ReturnType<typeof useGetUserDetailsLazyQuery>;
export type GetUserDetailsQueryResult = Apollo.QueryResult<
  GetUserDetailsQuery,
  GetUserDetailsQueryVariables
>;
export const UpdatePasswordDocument = gql`
  mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
    updatePassword(updatePasswordInput: $updatePasswordInput) {
      id
    }
  }
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      updatePasswordInput: // value for 'updatePasswordInput'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
    UpdatePasswordDocument,
    options
  );
}
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;
export const BulkInsertUserDocument = gql`
  mutation BulkInsertUser($bulkUserInput: [BulkUserInput!]!) {
    bulkInsertUser(bulkUserInput: $bulkUserInput) {
      email
      idNumber
      name
      password
      status
      idNumber
      name
      email
      password
      status
      errorMessage
      role
      lineManagerEmplyeeID
      department
      designation
      type
      institution
    }
  }
`;
export type BulkInsertUserMutationFn = Apollo.MutationFunction<
  BulkInsertUserMutation,
  BulkInsertUserMutationVariables
>;

/**
 * __useBulkInsertUserMutation__
 *
 * To run a mutation, you first call `useBulkInsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkInsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkInsertUserMutation, { data, loading, error }] = useBulkInsertUserMutation({
 *   variables: {
 *      bulkUserInput: // value for 'bulkUserInput'
 *   },
 * });
 */
export function useBulkInsertUserMutation(
  baseOptions?: Apollo.MutationHookOptions<BulkInsertUserMutation, BulkInsertUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BulkInsertUserMutation, BulkInsertUserMutationVariables>(
    BulkInsertUserDocument,
    options
  );
}
export type BulkInsertUserMutationHookResult = ReturnType<typeof useBulkInsertUserMutation>;
export type BulkInsertUserMutationResult = Apollo.MutationResult<BulkInsertUserMutation>;
export type BulkInsertUserMutationOptions = Apollo.BaseMutationOptions<
  BulkInsertUserMutation,
  BulkInsertUserMutationVariables
>;
export const namedOperations = {
  Query: {
    GetAssessmentSkills: 'GetAssessmentSkills',
    GetCourseAssessmentSkills: 'GetCourseAssessmentSkills',
    GetAssessments: 'GetAssessments',
    GetAssessment: 'GetAssessment',
    GetAttendedExam: 'GetAttendedExam',
    GetAttendedExams: 'GetAttendedExams',
    GetAttendedExamDetails: 'GetAttendedExamDetails',
    GetAttendanceDetails: 'GetAttendanceDetails',
    GetAttendancesForSchedule: 'GetAttendancesForSchedule',
    GetCertificates: 'GetCertificates',
    GetCertificateDetails: 'GetCertificateDetails',
    GetAttendedActivityByChapterAndSchedule: 'GetAttendedActivityByChapterAndSchedule',
    GetCourseCategory: 'GetCourseCategory',
    GetChapterDetails: 'GetChapterDetails',
    GetCourseEvaluation: 'GetCourseEvaluation',
    CourseEvaluationsList: 'CourseEvaluationsList',
    GetCourseLevelDetails: 'GetCourseLevelDetails',
    GetCourseLevelResources: 'GetCourseLevelResources',
    GetCourseDetailsWithLevelId: 'GetCourseDetailsWithLevelId',
    GetCourseLevelNotAttendedUser: 'GetCourseLevelNotAttendedUser',
    GetStudentsExpiredInCourse: 'GetStudentsExpiredInCourse',
    GetCourseResources: 'GetCourseResources',
    GetCourseScheduleDetails: 'GetCourseScheduleDetails',
    GetCourseSchedule: 'GetCourseSchedule',
    GetMyStudentSchedules: 'GetMyStudentSchedules',
    CourseSchedules: 'CourseSchedules',
    GetCourseScheduleOnly: 'GetCourseScheduleOnly',
    GetCoursesList: 'GetCoursesList',
    GetCourseDetails: 'GetCourseDetails',
    GetCourseLevels: 'GetCourseLevels',
    GeCoursesNames: 'GeCoursesNames',
    GetCourseData: 'GetCourseData',
    GeCoursesNamesOnly: 'GeCoursesNamesOnly',
    GetDepartments: 'GetDepartments',
    GetDesignations: 'GetDesignations',
    GetExam: 'GetExam',
    GetExams: 'GetExams',
    GetQuestionScenarios: 'GetQuestionScenarios',
    GetCourseLevelExams: 'GetCourseLevelExams',
    GetAllPermissions: 'GetAllPermissions',
    GetNotifications: 'GetNotifications',
    GetUnreadNotificationCount: 'GetUnreadNotificationCount',
    GetAttendanceReport: 'GetAttendanceReport',
    GetReportList: 'GetReportList',
    GetReportListItem: 'GetReportListItem',
    GenerateReport: 'GenerateReport',
    GetRequests: 'GetRequests',
    GetScheduleStudent: 'GetScheduleStudent',
    GetScheduleStudentDetails: 'GetScheduleStudentDetails',
    GetScheduleStudentName: 'GetScheduleStudentName',
    UserRoles: 'UserRoles',
    GetUsers: 'GetUsers',
    GetUsersOnly: 'GetUsersOnly',
    GetUserProfile: 'GetUserProfile',
    GetUserDetails: 'GetUserDetails',
  },
  Mutation: {
    CreateAssessmentSkill: 'CreateAssessmentSkill',
    UpdateAssessmentSkill: 'UpdateAssessmentSkill',
    CreateAssessment: 'CreateAssessment',
    UpdateAssessment: 'UpdateAssessment',
    CreateAttendedExam: 'CreateAttendedExam',
    UpdateAttendedExamAnswer: 'UpdateAttendedExamAnswer',
    UpdateAttendedExam: 'UpdateAttendedExam',
    CreteOrUpdateOfflineExam: 'CreteOrUpdateOfflineExam',
    BulkUpdateAttendedExam: 'BulkUpdateAttendedExam',
    CreateAttendance: 'CreateAttendance',
    UpdateAttendanceStudent: 'UpdateAttendanceStudent',
    CreateCertificate: 'CreateCertificate',
    UpdateCertificate: 'UpdateCertificate',
    RequestCertificate: 'RequestCertificate',
    CreateAttendedActivity: 'CreateAttendedActivity',
    createCourseCategory: 'createCourseCategory',
    updateCourseCategory: 'updateCourseCategory',
    CreateChapter: 'CreateChapter',
    UpdateChapter: 'UpdateChapter',
    RemoveChapter: 'RemoveChapter',
    CreateCourseEvaluation: 'CreateCourseEvaluation',
    UpdateCourseEvaluation: 'UpdateCourseEvaluation',
    CreateCourseLevel: 'CreateCourseLevel',
    UpdateCourseLevel: 'UpdateCourseLevel',
    createCourseResource: 'createCourseResource',
    RemoveCourseResource: 'RemoveCourseResource',
    CreateCourseSchedule: 'CreateCourseSchedule',
    UpdateCourseSchedule: 'UpdateCourseSchedule',
    SendCertificate: 'SendCertificate',
    GetAttendanceSheet: 'GetAttendanceSheet',
    CreateCourse: 'CreateCourse',
    UpdateCourse: 'UpdateCourse',
    RemoveCourse: 'RemoveCourse',
    CreateDepartment: 'CreateDepartment',
    UpdateDepartment: 'UpdateDepartment',
    CreateDesignation: 'CreateDesignation',
    UpdateDesignation: 'UpdateDesignation',
    CreateExam: 'CreateExam',
    UpdateExam: 'UpdateExam',
    CreateQuestionScenario: 'CreateQuestionScenario',
    UpdateQuestionScenario: 'UpdateQuestionScenario',
    MakeFilePublic: 'MakeFilePublic',
    CreateUserNew: 'CreateUserNew',
    MarkNotificationAsRead: 'MarkNotificationAsRead',
    CreateRequest: 'CreateRequest',
    UpdateRequest: 'UpdateRequest',
    UpdateScheduleProgress: 'UpdateScheduleProgress',
    CreateUploadSignedUrl: 'CreateUploadSignedUrl',
    UpdateScheduleStudent: 'UpdateScheduleStudent',
    CreateScheduleStudent: 'CreateScheduleStudent',
    CreateUserRole: 'CreateUserRole',
    UpdateUserRole: 'UpdateUserRole',
    CreateUser: 'CreateUser',
    updateUserProfile: 'updateUserProfile',
    UpdatePassword: 'UpdatePassword',
    BulkInsertUser: 'BulkInsertUser',
  },
};
