import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { route } from '../../constants/routes';
import { AttendExamStatus, ScheduleStudent } from '../../graphql/@generated/graphql';
import { formatDate, formatEnums, formatText, getExamStatusColor } from '../../utils/utils';

interface CourseListProps {
  schedules: ScheduleStudent[];
  title: string;
}

function ScheduleList(props: CourseListProps) {
  const { schedules, title } = props;

  return (
    <div className="col-span-2 text-left">
      <p className="mb-2 ml-2 text-2xl font-bold">{title}</p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {schedules.length === 0 && (
          <div className="col-span">
            <Card
              className="card-style cursor-pointer"
              style={{ backgroundColor: '', width: '100%', height: '100%' }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p>No {title} Found on selected date</p>
                </div>
              </div>
            </Card>
          </div>
        )}
        {schedules.map((course) => (
          <div className="col-span-1" key={course?.id}>
            <Link to={`/${route.studentCourseDetails(`${course?.slug}`)}`}>
              <Card
                className="card-style cursor-pointer"
                style={{ backgroundColor: '#E7F3FF', width: '100%', height: '100%' }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <p>{formatEnums(course?.status ?? '')}</p>
                    <h4 className="mb-5 text-xl font-semibold">
                      {course?.courseSchedule.course?.name} -{' '}
                      {course?.courseSchedule.courseLevel?.title}
                    </h4>
                  </div>
                  <div>
                    <p>Status: {formatText(course?.status ?? '')}</p>
                    <p>
                      Date:{' '}
                      {`${formatDate(course?.courseSchedule.startDate)} - ${formatDate(
                        course?.courseSchedule.endDate
                      )}`}
                    </p>
                  </div>
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
                          'Not attended'
                        )}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>Course Progress:</p>
                    <Progress
                      strokeColor={{ '0%': '#80BFFF', '100%': '#80BFFF' }}
                      percent={course?.completionPercentage}
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleList;
