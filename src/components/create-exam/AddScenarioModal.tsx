import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload, UploadFile } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../../configs/firebase';
import { queryKeys } from '../../constants/query-keys';
import { storagePaths } from '../../constants/storage-paths';
import {
  QuestionScenario,
  useCreateQuestionScenarioMutation,
  useUpdateQuestionScenarioMutation,
} from '../../graphql/@generated/graphql';
import { getImageDetailsFromUrl, normFile, showErrorMessage } from '../../utils/utils';

interface Props {
  onClose: () => void;
  visible: boolean;
  scenario: QuestionScenario | null;
  level: string;
}

interface FormInput {
  name: string;
  scenario: string;
  mediaUrl: UploadFile[];
}

function AddScenarioModal(props: Props) {
  const { onClose, visible, scenario, level } = props;

  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm<FormInput>();

  const resetForm = () => {
    form.resetFields();
    onClose();
  };

  const [createQuestionScenario, { loading: createQuestionScenarioLoading }] =
    useCreateQuestionScenarioMutation({
      onCompleted: resetForm,
      refetchQueries: [queryKeys.GetQuestionScenarios],
    });

  const [updateQuestionScenario, { loading: updateQuestionScenarioLoading }] =
    useUpdateQuestionScenarioMutation({
      onCompleted: resetForm,
      refetchQueries: [queryKeys.GetQuestionScenarios],
    });

  const onFinish = async (values: FormInput) => {
    try {
      setUploading(true);
      let mediaUrl: string | null = null;

      if (values.mediaUrl && values.mediaUrl.length > 0) {
        const image = (values as any).mediaUrl[0]?.originFileObj;

        if (image) {
          const imagesRef = ref(storage, `${storagePaths.QuestionScenarioImages}/${image.name}`);
          await uploadBytes(imagesRef, image);
          mediaUrl = await getDownloadURL(imagesRef);
        }
      }

      if (scenario) {
        updateQuestionScenario({
          variables: {
            updateQuestionScenarioInput: {
              id: scenario.id,
              name: values.name,
              scenario: values.scenario,
              mediaUrl,
            },
          },
        });
      } else {
        createQuestionScenario({
          variables: {
            createQuestionScenarioInput: {
              name: values.name,
              scenario: values.scenario,
              levelId: Number(level),
              mediaUrl,
            },
          },
        });
      }
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (scenario) {
      form.setFieldsValue({
        name: scenario.name,
        scenario: scenario.scenario,
        mediaUrl:
          scenario.media?.url &&
          ([
            {
              uid: scenario.media.url!,
              name: getImageDetailsFromUrl(scenario.media.url!).fileName,
              status: 'done',
              url: scenario.media.url!,
            },
          ] as any),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario]);

  return (
    <Modal
      title="Add Scenario"
      destroyOnClose
      okText="Save"
      open={visible}
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{
        loading: createQuestionScenarioLoading || updateQuestionScenarioLoading || uploading,
      }}
      onCancel={onClose}
      centered
      width="80%"
    >
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          rules={[{ required: true, message: 'Please input your Title!' }]}
          name="name"
          label="Title"
        >
          <Input className="w-full !rounded-lg" />
        </Form.Item>
        <Form.Item
          label="Upload"
          name="mediaUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={() => false}
            accept=".doc,.docx,.pdf,.ppt,.pptx,.png,.jpg,.jpeg"
            multiple={false}
            maxCount={1}
            showUploadList={{
              removeIcon: false,
            }}
          >
            <Button
              className="!w-40 !border-primary-500 !text-primary-500"
              icon={<UploadOutlined />}
            >
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Please input your Scenario!' }]}
          name="scenario"
          label="Scenario"
        >
          <Input.TextArea className="w-full" rows={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddScenarioModal;
