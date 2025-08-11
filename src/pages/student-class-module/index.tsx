import { CheckCircleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Button, Collapse } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import CourseActivity from '../../components/student-class-module/CourseActivity';
import CourseDescription from '../../components/student-class-module/CourseDescription';
import CourseView from '../../components/student-class-module/CourseView';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useConfirm } from '../../context/context-hooks';
import {
  AttendExamStatus,
  Chapter,
  ChapterType,
  Course,
  CourseProgressStatus,
  ScheduleProgress,
  ScheduleStudentStatus,
  useCreateAttendedExamMutation,
  useGetScheduleStudentDetailsQuery,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

function StudentClass() {
  const { studentScheduleId } = useParams<{
    studentScheduleId: string;
  }>();

  const { data, loading } = useGetScheduleStudentDetailsQuery({
    variables: {
      slug: studentScheduleId!,
    },
  });

  const course = data?.scheduleStudent?.courseSchedule?.course;
  const courseLevel = data?.scheduleStudent?.courseSchedule?.courseLevel;

  const [selected, setSelected] = useState<{
    type: 'lesson' | 'activity';
    chapter: Chapter;
  } | null>(null);

  const { collapseItems, keys } = useMemo<{
    collapseItems: CollapseProps['items'];
    keys: string[];
  }>(() => {
    const chapterIds: string[] = [];

    if (courseLevel) {
      let { chapters } = courseLevel;

      if (data.scheduleStudent!.status! === ScheduleStudentStatus.Completed) {
        const progressCount = data?.scheduleStudent?.progress?.length;
        // make the chapters array equal to the progress array
        chapters = chapters?.slice(0, progressCount);
      }

      const response: CollapseProps['items'] = chapters?.map((chapter) => {
        const ss = data?.scheduleStudent?.progress?.find(
          (progress) => progress?.chaptersId && Number(progress.chaptersId) === Number(chapter?.id)
        );

        let icon = <LockOutlined className="text-red-500" />;

        const chapterActive = Boolean(ss);
        const chapterCompleted = ss?.status === CourseProgressStatus.Completed;
        const activityCompleted =
          ss?.activityStatus === CourseProgressStatus.Completed || chapter?.Questions?.length === 0;

        if (chapterActive) {
          icon = <UnlockOutlined className="text-yellow-600" />;
        }

        if (chapterCompleted && activityCompleted) {
          icon = <CheckCircleOutlined className="text-green-500" />;
        }

        const assessmentActive = ss?.status === CourseProgressStatus.Completed;

        if (chapter?.id) chapterIds.push(chapter?.id);

        return {
          key: chapter?.id,
          label: <p>{chapter?.name}</p>,
          extra: [
            <div key="1" className="text-lg">
              {icon}
            </div>,
          ],
          children: [
            <button
              onClick={() => {
                setSelected({
                  type: 'lesson',
                  chapter: chapter as Chapter,
                });
              }}
              type="button"
              key="1"
              disabled={!chapterActive}
              className="relative mb-4 flex w-full justify-between rounded-lg bg-blue-400 pt-2 text-left text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="-mt-2 block w-full border-b pb-2 pl-6 pt-2 hover:bg-zinc-300">
                {chapter?.chapterType === ChapterType.Video ? 'Watch the lesson' : 'Start Chapter'}
              </span>{' '}
              {chapterCompleted && (
                <div className="absolute bottom-0 right-1 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-50">
                  <CheckCircleOutlined className="text-green-500" />
                </div>
              )}
            </button>,
            Boolean(chapter?.Questions?.length) && (
              <button
                className="relative  flex w-full justify-between rounded-lg bg-orange-300 text-left disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  setSelected({
                    type: 'activity',
                    chapter: chapter as Chapter,
                  });
                }}
                type="button"
                key="2"
                disabled={!assessmentActive}
              >
                <span className="block w-full border-b pb-2 pl-6 pt-2 hover:bg-zinc-300">
                  Start Activity based on the session
                </span>
                {activityCompleted && (
                  <div className="absolute bottom-0 right-1 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-50">
                    <CheckCircleOutlined className="text-green-500" />
                  </div>
                )}
              </button>
            ),
          ],
        };
      });

      return { collapseItems: response, keys: chapterIds };
    }

    return { collapseItems: [] as CollapseProps['items'], keys: [] };
  }, [courseLevel, data?.scheduleStudent]);

  const progressOfSelectedChapter = useMemo(() => {
    if (!selected?.chapter?.id) return null;

    const prog = data?.scheduleStudent?.progress?.find(
      (progress) =>
        progress?.chaptersId && Number(progress.chaptersId) === Number(selected?.chapter?.id)
    );
    if (prog) return prog as ScheduleProgress;
    return null;
  }, [data?.scheduleStudent?.progress, selected?.chapter?.id]);

  const navigate = useNavigate();

  const { error } = useConfirm();

  const endClass = () => {
    // Check all completed
    const allCompleted = data?.scheduleStudent?.progress?.every(
      (progress) => progress?.status === CourseProgressStatus.Completed
    );

    if (allCompleted) {
      navigate(`/${route.studentCourseDetails(`${data?.scheduleStudent?.slug}`)}`);
      return;
    }
    error({
      title: 'You have not completed all the lessons',
      content: 'Please complete all the lessons to end the class',
      centered: true,
    });
  };

  const [createAttendedExam, { loading: createAttendedExamLoading }] =
    useCreateAttendedExamMutation({
      onError(err) {
        showErrorMessage(err);
      },
      refetchQueries: [queryKeys.GetScheduleStudentDetails],
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
    lastExamStatus === AttendExamStatus.RetakeRejected ||
    lastExamStatus === AttendExamStatus.RetakeRequested ||
    lastExamStatus === AttendExamStatus.Passed;

  const attendExam = () => {
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

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <div>
      <div className="p-6 text-left">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-10 ">
          <div className="col-span-10">
            <div className=" flex  items-center rounded-[25px] bg-stone-100 p-5">
              <div className="flex-grow">
                <p className="mb-0 text-[14px] font-normal text-black">Course Name:</p>
                <h3 className="text-[24px] font-black text-black">
                  {course?.name} - {courseLevel?.title}
                </h3>
              </div>
              <Button onClick={endClass} shape="round" type="primary">
                End Class
              </Button>
            </div>
          </div>

          <div className="col-span-4 ">
            <p className=" mb-2 text-base font-normal text-black">Module Overview</p>
            <div className="rounded-[25px] border border-gray-200 !bg-red-100 py-5">
              <p className="ml-5 text-sm font-medium leading-snug text-black">Lessons</p>
              <Collapse
                items={collapseItems}
                bordered={false}
                ghost
                defaultActiveKey={keys}
                // className="!bg-red-100"
              />
            </div>
            <div className="p-4">
              {course?.examRequired &&
                !attended &&
                data?.scheduleStudent?.status === ScheduleStudentStatus.Completed && (
                  <Button
                    onClick={attendExam}
                    loading={createAttendedExamLoading}
                    type="primary"
                    shape="round"
                    block
                  >
                    {attended ? 'View Last Exam' : 'Attend Exam'}
                  </Button>
                )}
            </div>
          </div>
          <div className="col-span-6">
            {course && !selected && <CourseDescription course={course as Course} />}
            {selected?.type === 'lesson' && (
              <CourseView chapter={selected.chapter} progress={progressOfSelectedChapter} />
            )}
            {selected?.type === 'activity' && (
              <CourseActivity chapter={selected.chapter} progress={progressOfSelectedChapter} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentClass;
