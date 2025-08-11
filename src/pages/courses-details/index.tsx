import { Button, Tabs } from 'antd';
import { lazy, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaftyImage from '../../assets/images/safety.png';
import Loading from '../../components/common/Loading';

import { Permissions } from '../../configs/permissions';
import { route } from '../../constants/routes';
import { Chapter, Course, useGetCourseLevelDetailsQuery } from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import useUrlQueries from '../../hooks/useUrlQueries';

// Lazy Imports
const CourseChapters = lazy(() => import('../../components/course-details/CourseChapters'));
const CourseExams = lazy(() => import('../../components/course-details/CourseExams'));
const CourseExamScenarios = lazy(
  () => import('../../components/course-details/CourseExamsScenarios')
);
const CourseSchedules = lazy(() => import('../../components/course-details/CourseSchedules'));
const CourseResources = lazy(() => import('../../components/course/CourseResources'));

type Tab = 'chapters' | 'exams' | 'scenarios' | 'schedules' | 'resources' | undefined;

export default function CourseDetails() {
  const { levelId } = useParams();

  const permissions = useGetUserPermissions();

  const { data: levelData } = useGetCourseLevelDetailsQuery({
    variables: {
      courseLevelId: +levelId!,
    },
  });

  const course = levelData?.courseLevel?.course;

  // const [selectedTab, setSelectedTab] = useState<Tab>('resources');

  const navigate = useNavigate();

  const { tab } = useUrlQueries() as unknown as {
    tab: Tab;
  };

  const tabItems = useMemo(() => {
    if (!levelData) {
      return [];
    }

    const items = [
      {
        key: 'chapters',
        label: 'Chapters',
        children: (
          <CourseChapters chapters={(levelData.courseLevel?.chapters as Array<Chapter>) || []} />
        ),
      },
      {
        key: 'scenarios',
        label: 'Scenarios',
        children: <CourseExamScenarios levelId={+levelId!} />,
      },
      {
        key: 'schedules',
        label: 'Schedules',
        children: (
          <CourseSchedules
            course={levelData.courseLevel?.course as Course}
            schedules={levelData.courseLevel?.courseSchedule as any}
          />
        ),
      },
      {
        key: 'resources',
        label: 'Resources',
        children: <CourseResources levelId={levelId!} courseId={course!.id} />,
      },
    ];

    if (course?.examRequired) {
      items.splice(2, 0, {
        key: 'exams',
        label: 'Exams',
        children: <CourseExams exams={levelData.courseLevel?.exams as any} />,
      });
    }

    return items;
  }, [course, levelData, levelId]);

  if (!course) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-6 text-left">
        <div className="grid  grid-cols-1 gap-4 text-left md:grid-cols-10">
          <div className="col-span-1 md:col-span-6 ">
            <div className="relative flex rounded-[25px]  border border-red-200 bg-red-100 shadow">
              <div className="p-5">
                <div className="mb-3 flex">
                  <div className="border-r  border-r-stone-300 pr-5">
                    <p className="text-[14px] font-normal text-black">Course Name:</p>
                    <h3 className="text-[24px] font-black text-black">
                      {course?.name} - {levelData.courseLevel?.title}
                    </h3>
                  </div>
                  <div className="pl-5">
                    <p className="text-[14px] font-normal text-black">Created On:</p>
                    <h6 className="text-[16px] font-black text-black">
                      {new Date(course?.createdAt!).toLocaleDateString()}
                    </h6>
                  </div>
                </div>

                {permissions.includes(Permissions.CREATE_SCHEDULE) && (
                  <Button
                    shape="round"
                    onClick={() => {
                      navigate(`/${route.createSchedule(levelId!)}`);
                    }}
                    className="mr-3 mt-2"
                    type="primary"
                  >
                    Add Schedule
                  </Button>
                )}

                {/* <Link to="/attendance-report">
                  <Button shape="round" className="mr-3 mt-2" type="primary" ghost>
                    Attendance Reports
                  </Button>
                </Link> */}
                {permissions.includes(Permissions.CREATE_EXAM) && course.examRequired && (
                  <Button
                    onClick={() => {
                      navigate(`/${route.createCourseExam(levelId!)}?type=${course.mediumOfExam}`);
                    }}
                    shape="round"
                    className="mr-3 mt-2"
                    type="primary"
                    ghost
                  >
                    Create Exam
                  </Button>
                )}
                {permissions.includes(Permissions.CREATE_SCHEDULE) && (
                  <Button
                    onClick={() => {
                      navigate(`/${route.courseChapterCreation(levelId!)}`);
                    }}
                    shape="round"
                    className="mr-3 mt-2"
                    type="primary"
                    ghost
                  >
                    Create Chapter
                  </Button>
                )}
              </div>
              <div className=" w-[140px]">
                <img
                  className="h-[279px   absolute bottom-0 right-3 w-[136px]"
                  src={SaftyImage}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 ">
            <div className=" flex flex-wrap rounded-[25px]  border border-sky-200  bg-sky-100 p-5 shadow">
              <div className="w-1/2 ">
                <p className="text-[14px] font-normal text-black">Course Code:</p>
                <h6 className="text-[16px] font-black text-black">{course?.code}</h6>
              </div>
              <div className="w-1/2 ">
                {/* <p className="text-[14px] font-normal text-black">Instructor:</p>
                <h6 className="text-[16px] font-black text-black">
                  {course?.instructor ? course.instructor.name : ''}
                </h6> */}
              </div>
              <div className="mt-4 ">
                <p className="text-[14px] font-normal text-black">Mode:</p>
                <h6 className="text-[16px] font-black text-black">{course.median}</h6>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <Tabs
            centered
            size="large"
            onChange={(key) => {
              navigate(`/${route.coursesDetails(levelId!)}?tab=${key}`, {
                replace: true,
              });
            }}
            defaultActiveKey={tab}
            items={tabItems}
          />
        </section>
      </div>
    </div>
  );
}
