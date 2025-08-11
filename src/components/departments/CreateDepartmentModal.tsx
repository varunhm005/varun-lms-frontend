/* eslint-disable react/require-default-props */
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { env } from '../../configs/env';
import {
  Department,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface Props {
  visible: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  department: Department | null;
  refetchDepartments: () => void;
}

function CreateDepartmentModal(props: Props) {
  const { visible, onCancel, department, refetchDepartments } = props;

  const [form] = Form.useForm<{
    name: string;
  }>();

  useEffect(() => {
    if (department) {
      form.setFieldsValue({
        name: department.name!,
      });
    }
  }, [form, department]);

  const handleCancel = () => {
    form.resetFields();
    onCancel?.(null!);
  };

  const [create, createOptions] = useCreateDepartmentMutation({
    onCompleted: () => {
      refetchDepartments();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const [update, updateOptions] = useUpdateDepartmentMutation({
    onCompleted: () => {
      refetchDepartments();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const onFinish = (values: { name: string }) => {
    if (!department) {
      return create({
        variables: {
          createDepartmentInput: {
            companyId: env.companyId,
            name: values.name,
          },
        },
      });
    }

    return update({
      variables: {
        updateDepartmentInput: {
          id: department.id!,
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
            {department ? 'Update department' : 'Create new department'}
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

export default CreateDepartmentModal;
