/* eslint-disable react/require-default-props */
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { queryKeys } from '../../constants/query-keys';
import { useMessage } from '../../context/message-context';
import {
  AssessmentSkill,
  useCreateAssessmentSkillMutation,
  useUpdateAssessmentSkillMutation,
} from '../../graphql/@generated/graphql';
import { showErrorMessage } from '../../utils/utils';

interface Props {
  visible: boolean;
  onCancel?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  skill: AssessmentSkill | null;
}

function CreateAssessmentsSkillModal(props: Props) {
  const { visible, onCancel, skill } = props;

  const [form] = Form.useForm<{
    name: string;
  }>();

  useEffect(() => {
    if (skill) {
      form.setFieldsValue({
        name: skill.name!,
      });
    }
  }, [form, skill]);

  const handleCancel = () => {
    form.resetFields();
    onCancel?.(null!);
  };

  const message = useMessage();

  const [create, createOptions] = useCreateAssessmentSkillMutation({
    onCompleted: () => {
      handleCancel();
      message.success('Assessment skill created successfully');
    },
    onError: showErrorMessage,
    refetchQueries: [queryKeys.GetAssessmentSkills],
  });

  const [update, updateOptions] = useUpdateAssessmentSkillMutation({
    onCompleted: () => {
      handleCancel();
      message.success('Assessment skill updated successfully');
    },
    onError: showErrorMessage,
    refetchQueries: [queryKeys.GetAssessmentSkills],
  });

  const onFinish = (values: { name: string }) => {
    if (!skill) {
      return create({
        variables: {
          createAssessmentSkillInput: {
            name: values.name,
          },
        },
      });
    }

    return update({
      variables: {
        updateAssessmentSkillInput: {
          id: skill.id!,
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
            {skill ? 'Update Assessment' : 'Create new assessment'}
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
              message: 'Please input skill name',
            },
            {
              min: 3,
              message: 'Skill name must be at least 3 characters',
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

export default CreateAssessmentsSkillModal;
