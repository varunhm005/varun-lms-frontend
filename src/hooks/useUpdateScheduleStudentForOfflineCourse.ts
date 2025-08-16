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
            id,
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

  return {
    markAsComplete,
    loading,
    error,
    data,
  };
};
