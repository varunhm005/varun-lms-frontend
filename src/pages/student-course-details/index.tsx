/* eslint-disable no-nested-ternary */
import { Button, Progress } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseResources from '../../components/course/CourseResources';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { colors } from '../../configs/constants';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useMessage } from '../../context/message-context';
import {
  AttendExamStatus,
  ExamMedium,
  ExamStatus,
  ReqContext,
  RequestType,
  ScheduleStudentStatus,
  useCreateAttendedExamMutation,
  useCreateCourseEvaluationMutation,
  useCreateRequestMutation,
  useGetScheduleStudentQuery,
  useRequestCertificateMutation,
  useUpdateScheduleStudentMutation,
} from '../../graphql/@generated/graphql';
import { useGetProfile } from '../../hooks/auth-hook';
import {
  formatCourseMedian,
  formatDate,
  formatEnums,
  formatTime,
  showErrorMessage,
} from '../../utils/utils';

function StudentCourseDDetails() {
  const { studentScheduleId } = useParams<{
    studentScheduleId: string;
  }>();

  const message = useMessage();

  const { data, loading } = useGetScheduleStudentQuery({
    variables: {
      slug: studentScheduleId!,
    },
  });

  const [updateScheduleStudent, { loading: updateScheduleStudentLoading }] =
    useUpdateScheduleStudentMutation({
      refetchQueries: [queryKeys.GetMyStudentSchedules, queryKeys.GetScheduleStudent],
    });

  const navigate = useNavigate();

  const joinClass = async () => {
    if (data?.scheduleStudent?.status === ScheduleStudentStatus.NotStarted) {
      // Check date is passed
      // const startDate = new Date(data?.scheduleStudent?.courseSchedule?.startDate!);

      // if (startDate.getTime() > Date.now()) {
      //   message.error('Class has not started yet');
      //   return;
      // }

      await updateScheduleStudent({
        variables: {
          updateScheduleStudentInput: {
            id: data?.scheduleStudent?.id!,
            status: ScheduleStudentStatus.InProgress,
          },
        },
        onCompleted: () => {
          navigate(`/${route.studentClassModule(studentScheduleId!)}`);
        },
      });
    } else {
      navigate(`/${route.studentClassModule(studentScheduleId!)}`);
    }
  };

  const [createAttendedExam, { loading: createAttendedExamLoading }] =
    useCreateAttendedExamMutation({
      onError(err) {
        showErrorMessage(err);
      },
    });

  const lastExamStatus = useMemo(() => {
    const exams = data?.scheduleStudent!.exams!;
    if (!exams || exams.length === 0) {
      return null;
    }
    // Get last exam
    const lastExam = exams[exams.length - 1];
    // Get last exam status
    return lastExam?.status || null;
  }, [data?.scheduleStudent]);

  const attended =
    lastExamStatus === AttendExamStatus.Failed ||
    lastExamStatus === AttendExamStatus.Completed ||
    lastExamStatus === AttendExamStatus.RetakeRequested ||
    lastExamStatus === AttendExamStatus.RetakeRejected ||
    lastExamStatus === AttendExamStatus.Passed;

  const attendExam = () => {
    // check status of last exam
    if (attended) {
      navigate(`/${route.viewExam}`, {
        state: {
          slug: data?.scheduleStudent?.exams![data!.scheduleStudent!.exams!.length - 1]?.slug,
        },
      });
      return;
    }
    createAttendedExam({
      variables: {
        createAttendedExamInput: {
          scheduleStudentId: Number(data?.scheduleStudent?.id!),
        },
      },
      onCompleted(response) {
        const slug = response.createAttendedExam?.slug;

        if (slug) {
          navigate(`/${route.attendExam}`, {
            state: {
              slug,
            },
          });
        }
      },
    });
  };

  const { success } = useMessage();

  const [createRequest, { loading: createRequestLoading }] = useCreateRequestMutation({
    onError(err) {
      showErrorMessage(err);
    },
    onCompleted() {
      success('Request sent successfully');
    },
    refetchQueries: [queryKeys.GetMyStudentSchedules, queryKeys.GetScheduleStudent],
  });

  const profile = useGetProfile();
  const lastExam = data?.scheduleStudent?.exams![data!.scheduleStudent!.exams!.length - 1];

  const requestRetake = () => {
    createRequest({
      variables: {
        createRequestInput: {
          type: RequestType.RetakeExam,
          context: ReqContext.AttendedExams,
          contextId: +lastExam!.id!,
          courseId: Number(data?.scheduleStudent?.courseSchedule?.coursesId),
          userId: Number(profile?.id),
        },
      },
    });
  };

  const [requestCertMutation, { loading: requestCertLoading }] = useRequestCertificateMutation({
    onCompleted(res) {
      success(res.requestCertificate!.message);
    },

    onError(err) {
      showErrorMessage(err);
    },
    refetchQueries: [queryKeys.GetCertificates],
  });

  const requestCertificate = () => {
    if (!lastExam) {
      message.error('Exam not attended yet');
    }

    requestCertMutation({
      variables: {
        examId: Number(lastExam!.id),
      },
    });
  };

  const [createCourseEvaluation, { loading: createCourseEvaluationLoading }] =
    useCreateCourseEvaluationMutation({
      onCompleted(resp) {
        navigate(`/${route.courseEvaluation(resp.createCourseEvaluation.slug)}`);
      },
      onError(err) {
        showErrorMessage(err);
      },
    });

  const evaluateCourse = () => {
    createCourseEvaluation({
      variables: {
        createCourseEvaluationInput: {
          scheduleStudentId: Number(data?.scheduleStudent?.id),
        },
      },
    });
  };

  const completionPercentage = useMemo(() => {
    return data?.scheduleStudent?.completionPercentage ?? 0;
  }, [data?.scheduleStudent]);

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <div>
      <div className="p-6 text-left">
        <div className="mb-4  grid grid-cols-1 gap-4 text-left md:grid-cols-12">
          <div className="col-span-1 md:col-span-8 ">
            <div className="relative  rounded-[25px]  border border-red-200 bg-red-100 shadow">
              <div className="flex w-full border-b p-5">
                <div className="pr-3">
                  <p className="mb-0 text-[14px] font-normal text-black">Course Name:</p>
                  <h3 className="text-[24px] font-black text-black">
                    {data?.scheduleStudent?.courseSchedule?.course?.name} -{' '}
                    {data?.scheduleStudent?.courseSchedule?.courseLevel?.title}
                  </h3>
                </div>

                <div className="border-l pl-3">
                  <p className="text-[14px] font-normal text-black">Status</p>

                  <h6
                    className=" text-base font-black text-black"
                    style={{
                      color:
                        data?.scheduleStudent?.status === ScheduleStudentStatus.Completed
                          ? colors.successGreen
                          : colors.infoBlue,
                    }}
                  >
                    {formatEnums(data?.scheduleStudent?.status!)}
                  </h6>
                </div>
                <div className="flex-grow pl-3 text-right">
                  <Button
                    loading={updateScheduleStudentLoading}
                    shape="round"
                    className="mr-3 !bg-green-700"
                    type="primary"
                    onClick={joinClass}
                  >
                    {data?.scheduleStudent?.status === ScheduleStudentStatus.NotStarted
                      ? 'Join Class'
                      : 'Resume Class'}
                  </Button>
                </div>
              </div>

              <div className="flex w-full  p-5">
                <div className="flex-grow pr-3">
                  <p className="text-[14px] font-normal text-black">Type:</p>

                  <h6 className=" text-base font-black text-black">
                    {data?.scheduleStudent?.courseSchedule?.course?.type}
                  </h6>
                </div>
                <div className="flex-grow border-l pl-3 pr-3">
                  <p className="text-[14px] font-normal text-black">Start Date:</p>

                  <h6 className=" text-base font-black text-black">
                    {formatDate(data?.scheduleStudent?.courseSchedule?.startDate)}
                  </h6>
                </div>

                <div className="flex-grow border-l pl-3 pr-3">
                  <p className="text-[14px] font-normal text-black">End Date:</p>

                  <h6 className=" text-base font-black text-black">
                    {formatDate(data?.scheduleStudent?.courseSchedule?.endDate)}
                  </h6>
                </div>

                <div className="flex-grow border-l pl-3">
                  <p className="text-[14px] font-normal text-black">Exam Attended:</p>

                  <h6
                    style={{
                      color:
                        lastExamStatus === AttendExamStatus.Passed
                          ? colors.successGreen
                          : lastExamStatus === AttendExamStatus.Failed
                          ? colors.errorRed
                          : colors.infoBlue,
                    }}
                    className=" text-base font-black text-black"
                  >
                    {lastExam ? formatDate(lastExam.createdAt) : 
                    !data?.scheduleStudent?.courseSchedule?.course?.examRequired ? 'Not Required' : 'Not Attended'}
                  </h6>
                </div>
              </div>
              {lastExam && (
                <div className="flex w-full  p-5">
                  <div className="flex-grow pr-3">
                    <p className="text-[14px] font-normal text-black">Exam Name:</p>

                    <h6 className=" text-base font-black text-black">{lastExam.name}</h6>
                  </div>
                  <div className="flex-grow border-l pl-3 pr-3">
                    <p className="text-[14px] font-normal text-black">Exam Status:</p>

                    <h6
                      style={{
                        color:
                          lastExamStatus === AttendExamStatus.Passed
                            ? colors.successGreen
                            : lastExamStatus === AttendExamStatus.Failed
                            ? colors.errorRed
                            : colors.infoBlue,
                      }}
                      className=" text-base font-black text-black"
                    >
                      {formatEnums(lastExam.status)}
                    </h6>
                  </div>
                </div>
              )}
              {/* {data?.scheduleStudent?.status === ScheduleStudentStatus.InProgress && ( */}
              {data?.scheduleStudent?.courseSchedule.course?.mediumOfExam === ExamMedium.Online && (
                <div className="flex w-full  p-5">
                  {!attended && (
                    <Button
                      onClick={attendExam}
                      loading={createAttendedExamLoading}
                      shape="round"
                      type="primary"
                      className="mr-3 "
                      ghost
                      disabled={[
                        ScheduleStudentStatus.InProgress,
                        ScheduleStudentStatus.NotStarted,
                      ].includes(data?.scheduleStudent?.status as ScheduleStudentStatus)}
                    >
                      {attended ? 'View Last Exam' : 'Attend Exam'}
                    </Button>
                  )}
                  <Button
                    shape="round"
                    type="primary"
                    className="mr-3 "
                    ghost
                    disabled={[
                      ScheduleStudentStatus.InProgress,
                      ScheduleStudentStatus.NotStarted,
                    ].includes(data?.scheduleStudent?.status as ScheduleStudentStatus)}
                    loading={createCourseEvaluationLoading}
                    onClick={evaluateCourse}
                  >
                    Course Evaluation
                  </Button>
                  {attended && (
                    <>
                      {lastExamStatus === AttendExamStatus.Passed && (
                        <Button
                          onClick={() => {
                            requestCertificate();
                          }}
                          loading={requestCertLoading}
                          shape="round"
                          type="primary"
                          disabled={[
                            ScheduleStudentStatus.InProgress,
                            ScheduleStudentStatus.NotStarted,
                          ].includes(data?.scheduleStudent?.status as ScheduleStudentStatus)}
                          className="mr-3"
                          ghost
                        >
                          Request Certificate
                        </Button>
                      )}
                      {lastExamStatus === AttendExamStatus.Failed && (
                        <Button
                          onClick={() => {
                            requestRetake();
                          }}
                          shape="round"
                          type="primary"
                          ghost
                          loading={createRequestLoading}
                          disabled={[
                            ScheduleStudentStatus.InProgress,
                            ScheduleStudentStatus.NotStarted,
                          ].includes(data?.scheduleStudent?.status as ScheduleStudentStatus)}
                        >
                          Request Retake
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
              {lastExam && [ExamStatus.Passed, ExamStatus.Failed] && (
                <div className="flex w-full  p-5 text-lg">
                  <strong className="">Exam Marks:&nbsp;</strong> {lastExam?.achivedMark} /{' '}
                  {lastExam?.totalMark}
                </div>
              )}
              {/* )} */}
            </div>
          </div>
          <div className="col-span-1 md:col-span-4 ">
            <div className="relative   rounded-[25px] border border-sky-200  bg-sky-100 p-5 shadow">
              <div className="flex  w-full">
                <div className="w-1/2  p-5">
                  <p className="text-[14px] font-normal text-black">Course Code:</p>

                  <h6 className=" mb-2 text-base font-black text-black">
                    {data?.scheduleStudent?.courseSchedule?.course?.code}
                  </h6>

                  <p className="text-[14px] font-normal text-black">Location</p>

                  <h6 className="mb-2 text-base font-black text-black">NA</h6>

                  <p className="text-[14px] font-normal text-black">Start Time:</p>

                  <h6 className="mb-2 text-base font-black text-black">
                    {formatTime(data?.scheduleStudent?.courseSchedule?.startTime)}
                  </h6>
                </div>

                <div className="w-1/2  p-5">
                  <p className="text-[14px] font-normal text-black">Instructor:</p>

                  <h6 className=" mb-2 text-base font-black text-black">
                    {data?.scheduleStudent?.courseSchedule?.course?.instructor?.name}
                  </h6>

                  <p className="text-[14px] font-normal text-black">Mode:</p>

                  <h6 className="mb-2 text-base font-black text-black">
                    {formatCourseMedian(data?.scheduleStudent?.courseSchedule?.course?.median!)}
                  </h6>

                  <p className="text-[14px] font-normal text-black">End Time:</p>

                  <h6 className="mb-2 text-base font-black text-black">
                    {formatTime(data?.scheduleStudent?.courseSchedule?.endTime)}
                  </h6>
                </div>
              </div>
              <div className="pb-5 pl-5 pr-5">
                <Progress
                  strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }}
                  percent={completionPercentage}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-5 ">
            <CourseResources
              levelId={data?.scheduleStudent?.courseSchedule.courseLevelId!}
              courseId={data?.scheduleStudent?.courseSchedule.coursesId!}
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourseDDetails;
