/* eslint-disable react/require-default-props */
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { env } from '../../configs/env';
import {
  CourseCategory,
  useCreateCourseCategoryMutation,
  useUpdateCourseCategoryMutation,
} from '../../graphql/@generated/graphql';

import { showErrorMessage } from '../../utils/utils';

interface Props {
  visible: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  courseCategory: CourseCategory | null;
  refetchCourseCategory: () => void;
}

function CreateCourseCategoryModal(props: Props) {
  const { visible, onCancel, courseCategory, refetchCourseCategory } = props;

  const [form] = Form.useForm<{
    name: string;
  }>();

  useEffect(() => {
    if (courseCategory) {
      form.setFieldsValue({
        name: courseCategory.name!,
      });
    }
  }, [form, courseCategory]);

  const handleCancel = () => {
    form.resetFields();
    onCancel?.(null!);
  };

  const [create, createOptions] = useCreateCourseCategoryMutation({
    onCompleted: () => {
      refetchCourseCategory();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const [update, updateOptions] = useUpdateCourseCategoryMutation({
    onCompleted: () => {
      refetchCourseCategory();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const onFinish = (values: { name: string }) => {
    if (!courseCategory) {
      return create({
        variables: {
          createCourseCategoryInput: {
            companyId: env.companyId,
            name: values.name,
          },
        },
      });
    }

    return update({
      variables: {
        updateCourseCategoryInput: {
          id: courseCategory.id!,
          name: values.name,
        },
      },
    });
  };

  return (
    <Modal
      centered
      okText="Save"
      okButtonProps={{
        size: 'large',
        onClick: () => form.submit(),
        loading: createOptions.loading || updateOptions.loading,
      }}
      cancelButtonProps={{
        size: 'large',
      }}
      open={visible}
      title={
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">
            {courseCategory ? 'Update course category' : 'Create new course category'}
          </h2>
        </div>
      }
      onCancel={handleCancel}
    >
      <Form onFinish={onFinish} form={form} layout="vertical" size="large">
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please input role name',
            },
            {
              min: 3,
              message: 'Role name must be at least 3 characters',
            },
          ]}
          name="name"
          label="Name"
        >
          <Input type="text" className="mb-10" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateCourseCategoryModal;
