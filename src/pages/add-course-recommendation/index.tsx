import { LockFilled } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import { useMemo, useState } from 'react';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { useModalContext } from '../../context/conform-context';
import {
  useCreateScheduleStudentMutation,
  useGeCoursesNamesQuery,
} from '../../graphql/@generated/graphql';
import { useGetProfile } from '../../hooks/auth-hook';
import { useStudentsUnderFaculty } from '../../hooks/useGetUsers';
import { formatDate, showErrorMessage } from '../../utils/utils';

function AddCourseRecommendation() {
  const { data: students, loading } = useStudentsUnderFaculty();

  const [form] = Form.useForm<{
    userId: string;
    courseId: string;
    levelId: string;
    courseScheduleId: string;
  }>();

  const { data: courses, loading: courseLoading } = useGeCoursesNamesQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
      },
      filter: {},
    },
  });

  const { success } = useModalContext();

  const [courseId, setCourseId] = useState<string | null>();
  const [levelId, setLevelId] = useState<string | null>();
  const [courseScheduleId, setCourseScheduleId] = useState<string | null>();
  const profile = useGetProfile();

  const resetForm = () => {
    form.resetFields();
    setCourseId(null);
    setLevelId(null);
    setCourseScheduleId(null);
  };

  const [createScheduleStudent, { loading: createScheduleStudentLoading }] =
    useCreateScheduleStudentMutation({
      onCompleted: (data) => {
        if (data) {
          success({
            content: 'Student has been added to schedule',
          });
          resetForm();
        }
      },
      onError: (error) => {
        showErrorMessage(error);
      },
    });

  const sleetedCourse = useMemo(() => {
    if (!courseId) return null;
    return courses?.courses.data.find((course) => course?.id === courseId);
  }, [courseId, courses]);

  const selectedLevel = useMemo(() => {
    if (!levelId) return null;
    return sleetedCourse?.levels.find((level) => level?.id === levelId);
  }, [levelId, sleetedCourse]);

  const schedules = useMemo(() => {
    if (!selectedLevel) return [];
    return selectedLevel?.courseSchedule;
  }, [selectedLevel]);

  if (loading || courseLoading) return <FullScreenLoading />;

  return (
    <main className="!text-left">
      <div className="max-w-xl p-6">
        <h1 className="mb-6 text-xl font-bold">Recommend Courses</h1>
        <Form
          form={form}
          onFinish={(values) => {
            createScheduleStudent({
              variables: {
                createScheduleStudentInput: {
                  userId: +values.userId,
                  courseScheduleId: +values.courseScheduleId,
                  recommendedBy: profile?.id!,
                },
              },
            });
          }}
          layout="vertical"
        >
          <Form.Item
            name="userId"
            rules={[{ required: true, message: 'Please select student' }]}
            label="Student"
          >
            <Select
              // Search with name
              showSearch
              filterOption={(input, option) => {
                return `${option?.children}`.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
            >
              {students?.users.data.map((student) => (
                <Select.Option key={student!.id} value={student!.id}>
                  {student!.name} - {student!.idNumber}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please select course' }]}
            name="courseId"
            label="Course"
          >
            <Select
              onChange={(value) => {
                setCourseId(value);
                setLevelId(null);
                form.setFieldsValue({
                  levelId: undefined,
                  courseScheduleId: undefined,
                });
              }}
              value={courseId}
              showSearch
              filterOption={(input, option) => {
                return `${option?.children}`.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
            >
              {courses?.courses.data.map((course) => (
                <Select.Option key={course!.id} value={course!.id}>
                  {course!.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="levelId"
            label="Level"
            rules={[{ required: true, message: 'Please select level' }]}
          >
            <Select
              onChange={(value) => {
                setLevelId(value);
                form.setFieldsValue({
                  courseScheduleId: undefined,
                });
              }}
              value={levelId}
            >
              {sleetedCourse?.levels.map((level) => (
                <Select.Option key={level!.id} value={level!.id}>
                  {level!.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please select schedule' }]}
            name="courseScheduleId"
            label="Schedule "
          >
            <Select
              onChange={(value) => {
                setCourseScheduleId(value);
              }}
              value={courseScheduleId}
            >
              {schedules?.map((schedule) => (
                <Select.Option key={schedule!.id} value={schedule!.id}>
                  {schedule!.name} ({formatDate(schedule!.startDate)} -{' '}
                  {formatDate(schedule!.endDate)}){' '}
                  {schedule?.isLocked && <LockFilled className="text-red-500" />}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={createScheduleStudentLoading}
              type="primary"
              className="w-full"
              shape="round"
            >
              Recommend
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}

export default AddCourseRecommendation;
