/* eslint-disable react/require-default-props */
import { Form, Select } from 'antd';
import { useRef, useState } from 'react';
import {
  useGeCoursesNamesOnlyQuery,
  useGetCourseLevelsQuery,
} from '../../graphql/@generated/graphql';

interface Props {
  courseRequired?: boolean;
  levelRequired?: boolean;
}

function CourseLevelFilter(props: Props) {
  const { courseRequired, levelRequired } = props;

  const levelRef = useRef(null);

  const [selectedCourse, setSelectedCourse] = useState<null | string>(null);

  const { data: courseNames, loading: courseNamesLoading } = useGeCoursesNamesOnlyQuery({
    variables: {
      filter: {},
      pagingInput: {
        page: 1,
        size: 10000,
      },
    },
  });

  const { data: courseLevels, loading: courseLevelsLoading } = useGetCourseLevelsQuery({
    variables: {
      courseId: +selectedCourse!,
    },
    skip: !selectedCourse,
  });

  return (
    <>
      <Form.Item
        rules={[{ required: courseRequired, message: 'Please select course' }]}
        label="Course"
        name="courseId"
      >
        <Select
          onChange={(value) => {
            setSelectedCourse(value as string);
          }}
          loading={courseNamesLoading}
        >
          {courseNames?.courses.data.map((course) => (
            <Select.Option value={course!.id}>{course!.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        rules={[{ required: levelRequired, message: 'Please select level' }]}
        label="Level"
        name="courseLevelId"
      >
        <Select ref={levelRef} loading={courseLevelsLoading}>
          {courseLevels?.course?.levels.map((level) => (
            <Select.Option value={level!.id}>{level!.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}

export default CourseLevelFilter;
