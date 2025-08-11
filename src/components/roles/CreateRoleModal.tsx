/* eslint-disable react/require-default-props */
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { env } from '../../configs/env';
import {
  UserRole,
  useCreateUserRoleMutation,
  useUpdateUserRoleMutation,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface Props {
  visible: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  role: UserRole | null;
  refetchRoles: () => void;
}

function CreateRoleModal(props: Props) {
  const { visible, onCancel, role, refetchRoles } = props;

  const [form] = Form.useForm<{
    name: string;
  }>();

  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        name: role.name!,
      });
    }
  }, [form, role]);

  const handleCancel = () => {
    form.resetFields();
    onCancel?.(null!);
  };

  const [createRole, createRoleOptions] = useCreateUserRoleMutation({
    onCompleted: () => {
      refetchRoles();
      handleCancel();
    },
    onError: showErrorMessage,
  });
  const [updateRole, updateUserRoleOptions] = useUpdateUserRoleMutation({
    onCompleted: () => {
      refetchRoles();
      handleCancel();
    },
    onError: showErrorMessage,
  });

  const onFinish = (values: { name: string }) => {
    if (!role) {
      return createRole({
        variables: {
          createUserRoleInput: {
            companyId: env.companyId,
            name: values.name,
          },
        },
      });
    }

    return updateRole({
      variables: {
        updateUserRoleInput: {
          id: role.id!,
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
        loading: createRoleOptions.loading || updateUserRoleOptions.loading,
      }}
      cancelButtonProps={{
        size: 'large',
      }}
      open={visible}
      title={
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{role ? 'Update role' : 'Create new role'}</h2>
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

export default CreateRoleModal;
