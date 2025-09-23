import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';
import EmptyCourse from '../../components/course/EmptyCourse';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { route } from '../../constants/routes';
import { AttendExamStatus, useGetMyStudentSchedulesQuery } from '../../graphql/@generated/graphql';
import { formatDate, formatEnums, formatText, getExamStatusColor } from '../../utils/utils';

function MyStudentCourses() {
  const { data, loading } = useGetMyStudentSchedulesQuery({
    variables: {
      input: {},
    },
  });

  const courses = data?.getMyStudentSchedules ?? [];

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <div className="p-6 text-left">
      <h1 className="text-2xl font-bold">Courses</h1>
      {courses.length === 0 && <EmptyCourse />}
      <div className="my-5 grid grid-cols-3 gap-5">
        {courses.map((course) => (
          <div className="col-span-1" key={course?.id}>
            <Link to={`/${route.studentCourseDetails(`${course?.slug}`)}`}>
              <Card
                className="card-style cursor-pointer shadow-lg"
                style={{ backgroundColor: '#E7F3FF', width: '100%' }}
              >
                <p>Active</p>
                <h4 className="mb-5 text-xl font-semibold">
                  {course?.courseSchedule.course?.name} -{' '}
                  {course?.courseSchedule.courseLevel?.title}
                </h4>
                <p>Status: {formatText(course?.status ?? '')}</p>
                <p>
                  Date:{' '}
                  {`${formatDate(course?.courseSchedule.startDate)} - ${formatDate(
                    course?.courseSchedule.endDate
                  )}`}
                </p>
                <div>
                  <p>
                    Exam Status:{' '}
                    <span className="font-bold">
                      {course?.exams?.length ? (
                        <span
                          style={{
                            color: getExamStatusColor(
                              course?.exams[course.exams.length - 1]?.status ?? ''
                            ),
                          }}
                        >
                          {course?.exams[course.exams.length - 1]?.status ===
                          AttendExamStatus.Completed
                            ? 'Awaiting Scoring'
                            : formatEnums(course?.exams[course.exams.length - 1]?.status ?? '')}
                        </span>
                      ) : (
                        !course?.courseSchedule?.course?.examRequired ? 'Not Required' : 'Not Attended'
                      )}
                    </span>
                  </p>
                </div>
                <p>Course Progress:</p>
                <Progress
                  strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }}
                  percent={course?.completionPercentage ?? 0}
                />
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyStudentCourses;
