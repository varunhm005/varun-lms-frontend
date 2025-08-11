/* eslint-disable react/require-default-props */
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { env } from '../../configs/env';
import {
  Department,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface Props {
  visible: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  designation: Department | null;
  refetchDepartments: () => void;
}

function CreateDesignationModal(props: Props) {
  const { visible, onCancel, designation, refetchDepartments } = props;

  const [form] = Form.useForm<{
    name: string;
  }>();

  useEffect(() => {
    if (designation) {
      form.setFieldsValue({
        name: designation.name!,
      });
    }
  }, [form, designation]);

  const handleCancel = () => {
    form.resetFields();
    onCancel?.(null!);
  };

  const [create, createOptions] = useCreateDesignationMutation({
    onCompleted: () => {
      refetchDepartments();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const [update, updateOptions] = useUpdateDesignationMutation({
    onCompleted: () => {
      refetchDepartments();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const onFinish = (values: { name: string }) => {
    if (!designation) {
      return create({
        variables: {
          createDesignationInput: {
            companyId: env.companyId,
            name: values.name,
          },
        },
      });
    }

    return update({
      variables: {
        updateDesignationInput: {
          id: designation.id!,
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
            {designation ? 'Update designation' : 'Create new designation'}
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
              message: 'Please input designation name',
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

export default CreateDesignationModal;
