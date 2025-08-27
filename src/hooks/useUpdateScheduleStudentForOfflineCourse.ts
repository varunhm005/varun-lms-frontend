import {
  ScheduleStudentStatus,
  useUpdateScheduleStudentForOfflineCourseMutation,
} from '../graphql/@generated/graphql';

export const useUpdateScheduleStudentForOfflineCourse = () => {
  const [updateScheduleStudentForOfflineCourse, { loading, error, data }] =
    useUpdateScheduleStudentForOfflineCourseMutation();

  const markAsComplete = async (id: string) => {
    try {
      const result = await updateScheduleStudentForOfflineCourse({
        variables: {
          updateScheduleStudentForOfflineCourseInput: {
            ids: [id], // Use ids array with single ID
            status: ScheduleStudentStatus.Completed,
          },
        },
      });
      return result;
    } catch (err) {
      console.error('Error marking course as complete:', err);
      throw err;
    }
  };

  const markMultipleAsComplete = async (ids: string[]) => {
    try {
      const result = await updateScheduleStudentForOfflineCourse({
        variables: {
          updateScheduleStudentForOfflineCourseInput: {
            ids, // Use ids array directly
            status: ScheduleStudentStatus.Completed,
          },
        },
      });
      return result;
    } catch (err) {
      console.error('Error marking multiple courses as complete:', err);
      throw err;
    }
  };

  return {
    markAsComplete,
    markMultipleAsComplete,
    loading,
    error,
    data,
  };
};
