/* eslint-disable no-console */
import { message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { colors } from '../configs/constants';
import { storage } from '../configs/firebase';
import { AssessmentType, CourseMedian, ExamStatus, OrderBy } from '../graphql/@generated/graphql';

export function showErrorMessage(error: any) {
  message.error({
    content: error?.message || 'Something went wrong',
    key: 'error',
  });
}

export const getOptionsFromEnum = (enumObject: any) => {
  const options: any[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in enumObject) {
    if (Object.prototype.hasOwnProperty.call(enumObject, key)) {
      options.push({
        label: enumObject[key],
        value: enumObject[key],
      });
    }
  }
  return options;
};

export const showSuccessMessage = (text: string) => {
  message.success({
    content: text,
    key: 'success',
  });
};

export const getImageDetailsFromUrl = (input: string) => {
  // Remove query params from url

  const url = new URL(input).pathname;

  const splitUrl = url.split('/');
  let fileName = decodeURI(splitUrl[splitUrl.length - 1]);
  const fileExtension = fileName.split('.')[1];
  fileName = fileName.split('/')[fileName.split('/').length - 1];
  fileName = fileName.split('%2F')[fileName.split('%2F').length - 1];

  // Get type from extension video or image or doc

  // Get type from extension video or image or doc or pdf considering all the possible extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'mkv', 'webm'];
  const docExtensions = ['doc', 'docx', 'pdf', 'ppt', 'pptx', 'xls', 'xlsx'];

  let type: 'image' | 'video' | 'doc' | 'other' = 'other';

  if (imageExtensions.includes(fileExtension)) {
    type = 'image';
  } else if (videoExtensions.includes(fileExtension)) {
    type = 'video';
  } else if (docExtensions.includes(fileExtension)) {
    type = 'doc';
  }

  return {
    fileName,
    fileExtension,
    url: input,
    type,
  };
};

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const getTimeFromDateStr = (dateStr: string) => {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Make it 12 hours format
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const amPm = hours < 12 || hours === 24 ? 'AM' : 'PM';
  return `${hours12}:${minutesStr} ${amPm}`;
};

export const getDaysFromNumber = (number: number) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[number];
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  return dayjs(d).format('MMM DD, YYYY');
};

export const uploadFileToStorage = async (file: File, path: string) => {
  const imagesRef = ref(storage, path);
  await uploadBytes(imagesRef, file);
  const mediaUrl = await getDownloadURL(imagesRef);
  return mediaUrl;
};

export const formatTime = (date: string) => {
  const d = new Date(date);
  return dayjs(d).format('hh:mm A');
};

export const formatEnums = (enumValue: string) => {
  let formattedValue = enumValue.replace('_', ' ').trim().toLocaleLowerCase();
  // Convert formattedValue to camel case
  formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
  return formattedValue;
};

export const minDate = (...dates: any[]) => new Date(Math.min(...dates));

export const formatText = (t: string) => {
  // Replace hyphens with space
  let s = t.replace('_', ' ');
  s = s.toLocaleLowerCase();
  //  Make fist letter only caps
  s = s.charAt(0).toUpperCase() + s.slice(1);
  return s;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export const consoleDebug = (message?: any, ...optionalParams: any[]) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(message, optionalParams);
};

export const getAssessmentType = (type: AssessmentType) => {
  switch (type) {
    case AssessmentType.Certificate:
      return 'Certificate';
    case AssessmentType.Hr:
      return 'Hr';
    case AssessmentType.TrainingRecord:
      return 'Training Record';
    default:
      return '';
  }
};

export const getNumberWithDefaultValue = (
  number: string | number | undefined | null,
  defaultValue: number
) => {
  if (!number) return defaultValue;
  return Number(number);
};

export const getStringWithDefaultValue = (str: string | undefined | null, defaultValue: string) => {
  if (!str) return defaultValue;
  return `${str}`;
};

export const getFilterDirection = (direction: SortOrder) => {
  if (direction === 'descend') return OrderBy.Desc;
  return OrderBy.Asc;
};

export const getSortDirection = (direction: OrderBy): SortOrder => {
  if (direction === OrderBy.Desc) return 'descend';
  if (direction === OrderBy.Asc) return 'ascend';
  return null;
};

export const formatCourseMedian = (median: CourseMedian) => {
  switch (median) {
    case CourseMedian.Offline:
      return 'Classroom';
    case CourseMedian.Online:
      return 'E Learning';
    default:
      return median;
  }
};

export const getExamStatusColor = (status: ExamStatus | string) => {
  switch (status) {
    case ExamStatus.Passed:
      return colors.successGreen;
    case ExamStatus.Failed:
      return colors.errorRed;
    case ExamStatus.Onprogress:
      return colors.warningYellow;
    default:
      return colors.infoBlue;
  }
};

export const createErrorMessage = (err: any) => {
  if (err?.message) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return 'Something went wrong';
};
