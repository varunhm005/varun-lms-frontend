import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal } from 'antd';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { CourseLevelItem } from '../../components/course-levels/CourseLevelItem';
import { Permissions } from '../../configs/permissions';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import {
  CourseLevel,
  useCreateCourseLevelMutation,
  useGetCourseLevelsQuery,
  useUpdateCourseLevelMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import { formatCourseMedian, showErrorMessage } from '../../utils/utils';

export default function CourseLevels() {
  const [visible, setVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<null | CourseLevel>(null);

  const { courseId } = useParams<{
    courseId: string;
  }>();

  const { loading, data: course } = useGetCourseLevelsQuery({
    variables: {
      courseId: +courseId!,
    },
  });

  const levels = useMemo(() => {
    if (course?.course!.levels!) {
      return course?.course!.levels! as unknown as CourseLevel[];
    }

    return [] as CourseLevel[];
  }, [course]);

  const [form] = Form.useForm<{
    level: string;
  }>();

  const [createCourseLevel, { loading: createLoading }] = useCreateCourseLevelMutation({
    onCompleted: () => {
      setVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      showErrorMessage(error);
    },
    refetchQueries: [queryKeys.GetCourseLevels],
  });
  const [updateCourseLevel, { loading: updateLoading }] = useUpdateCourseLevelMutation({
    onCompleted: () => {
      setVisible(false);
      form.resetFields();
      setSelectedLevel(null);
    },
    refetchQueries: [queryKeys.GetCourseLevels],
    onError: (error) => {
      showErrorMessage(error);
    },
  });

  const onSubmit = async (values: { level: string }) => {
    try {
      if (selectedLevel) {
        await updateCourseLevel({
          variables: {
            updateCourseLevelInput: { id: selectedLevel.id, title: values.level },
          },
        });
      } else {
        createCourseLevel({
          variables: {
            createCourseLevelInput: {
              title: values.level,
              courseId: +courseId!,
            },
          },
        });
      }
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const onEdit = async (lev: CourseLevel) => {
    setSelectedLevel(lev);
    form.setFieldsValue({
      level: lev.title,
    });
    setVisible(true);
  };

  const permissions = useGetUserPermissions();

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="p-6 text-left">
      {/* Header */}

      <div className="mb-4  grid grid-cols-1 items-stretch gap-4 text-left  md:grid-cols-10">
        <div className="col-span-1  md:col-span-6 ">
          <div className="relative flex  rounded-[25px] border border-red-200 bg-red-100 shadow">
            <div className="p-5">
              <div className="mb-3 flex">
                <div className="border-r  border-r-stone-300 pr-5">
                  <p className="text-[14px] font-normal text-black">Course Name:</p>
                  <h3 className="text-[24px] font-bold text-black">{course?.course?.name}</h3>
                </div>
                <div className="w-[140px] pl-5">
                  <p className="text-[14px] font-normal text-black">Created On:</p>
                  <h6 className="text-[16px] font-bold text-black">
                    {new Date(course?.course?.createdAt!).toLocaleDateString()}
                  </h6>
                </div>
              </div>

              {permissions.includes(Permissions.EDIT_COURSE) && (
                <Link to={`/${route.editCourse(courseId!)}`}>
                  <Button shape="round" className="mr-3 mt-2" type="primary">
                    Edit
                  </Button>
                </Link>
              )}
              <div className=" w-[140px]">
                {course?.course?.imageUrl && (
                  <img
                    className="h-[279px   absolute bottom-2 right-3 w-[136px]"
                    src={course?.course?.imageUrl}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 h-full md:col-span-4">
          <div className=" flex flex-wrap rounded-[25px] border border-sky-200  bg-sky-100 p-5 shadow">
            <div className="w-1/2 ">
              <p className="text-[14px] font-normal text-black">Course Code:</p>
              <h6 className="text-[16px] font-bold text-black">{course?.course?.code}</h6>
            </div>
            <div className="w-1/2 ">
              <p className="text-[14px] font-normal text-black">Instructor:</p>
              <h6 className="text-[16px] font-bold text-black">
                {course?.course?.instructor ? course?.course?.instructor.name : ''}
              </h6>
            </div>
            <div className="mt-4 ">
              <p className="text-[14px] font-normal text-black">Mode:</p>
              <h6 className="text-[16px] font-bold text-black">
                {formatCourseMedian(course?.course?.median!)}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* End Header */}
      <Card
        title={course?.course?.name}
        extra={[
          <Button
            onClick={() => {
              setVisible(true);
            }}
            key="add"
            icon={<PlusOutlined />}
            shape="round"
            type="primary"
          >
            Add Level
          </Button>,
        ]}
      >
        <div className="grid grid-cols-3 gap-6">
          {levels && levels.length > 0 ? (
            levels.map((level) => <CourseLevelItem onEdit={onEdit} key={level.id} level={level} />)
          ) : (
            <div className="text-center">No levels found</div>
          )}
        </div>
      </Card>
      <Modal
        title="Add Level"
        open={visible}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields();
          setSelectedLevel(null);
          setVisible(false);
        }}
        okButtonProps={{
          loading: createLoading || updateLoading,
        }}
      >
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="level"
            rules={[
              {
                required: true,
                message: 'Please input level',
              },
            ]}
            label="Level"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
