/* eslint-disable react/require-default-props */
import { Form, FormInstance, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  CourseFilter,
  InputMaybe,
  useGeCoursesNamesOnlyQuery,
  useGetCourseScheduleOnlyLazyQuery,
} from '../../graphql/@generated/graphql';
import { formatDate } from '../../utils/utils';

interface Props {
  filter?: InputMaybe<CourseFilter> | undefined;
  form: FormInstance<any>;
}

function CourseScheduleFilter(props: Props) {
  const { filter, form } = props;

  const [selectedCourse, setSelectedCourse] = useState<null | string>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<null | string>(null);

  const { data: courseNames, loading: courseNamesLoading } = useGeCoursesNamesOnlyQuery({
    variables: {
      filter: filter ?? {},
      pagingInput: {
        page: 1,
        size: 10000,
      },
    },
  });

  const [refetchCourseSchedule, { data: courseSchedule, loading: courseScheduleLoading }] =
    useGetCourseScheduleOnlyLazyQuery({
      variables: {
        courseScheduleFilter: {
          courseId: Number(selectedCourse),
        },
        pagingInput: {
          page: 1,
          size: 10000,
        },
      },
    });

  useEffect(() => {
    if (selectedCourse) {
      refetchCourseSchedule();
    }

    form.setFieldsValue({
      courseScheduleId: undefined,
    });
  }, [form, refetchCourseSchedule, selectedCourse]);

  return (
    <>
      <Form.Item label="Course" name="courseId">
        <Select
          onChange={(value) => {
            setSelectedCourse(value as string);
          }}
          loading={courseNamesLoading}
          disabled={courseNamesLoading}
        >
          {courseNames?.courses.data.map((course) => (
            <Select.Option value={course!.id}>{course!.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Schedule" name="courseScheduleId">
        <Select
          value={selectedSchedule}
          onChange={(value) => {
            setSelectedSchedule(value as string);
          }}
          disabled={!selectedCourse || courseScheduleLoading}
          loading={courseScheduleLoading}
        >
          {courseSchedule?.courseSchedules.data.map((schedule) => (
            <Select.Option value={schedule!.id}>
              {schedule!.name} - {formatDate(schedule!.startDate)} to{' '}
              {formatDate(schedule!.endDate)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}

export default CourseScheduleFilter;
