import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, InputNumber, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { AnswerType, useGetQuestionScenariosLazyQuery } from '../../graphql/@generated/graphql';
import { CreateExamFormInputs } from '../../types/FormInputs';
import { normFile } from '../../utils/utils';

interface Props {
  remove: () => void;
  name: number;
  form: FormInstance<CreateExamFormInputs>;
  levelId: number;
}

export default function ExamQuestion(props: Props) {
  const { remove, name, form, levelId } = props;

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(form.getFieldValue('Questions')[name]?.answersOptions || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue('Questions')]);

  const [getScenarios, { data: scenarios }] = useGetQuestionScenariosLazyQuery({
    variables: {
      filter: {
        levelId,
      },
    },
  });

  const [type, setType] = useState(AnswerType.Mcq);

  useEffect(() => {
    const ansType =
      (form.getFieldValue('Questions')[name].answerType as AnswerType) || AnswerType.Mcq;

    setType(ansType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getScenarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId]);

  return (
    <div className="grid grid-cols-3 gap-x-5">
      <Form.Item hidden name={[name, 'id']}>
        <Input />
      </Form.Item>
      <Form.Item label="Type" name={[name, 'answerType']}>
        <Select
          onChange={(value) => {
            setType(value);
          }}
          placeholder="Select Question Type"
        >
          <Select.Option value={AnswerType.Mcq}>MCQ</Select.Option>
          <Select.Option value={AnswerType.Descriptive}>Descriptive</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[name, 'question']}
        rules={[{ required: true, message: 'Please input your Question!' }]}
        label="Question"
      >
        <Input placeholder="Question" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Please input your Mark!' }]}
        name={[name, 'mark']}
        label="Mark:"
      >
        <InputNumber className="!w-full !rounded-full" placeholder="Mark" />
      </Form.Item>

      {type === AnswerType.Mcq && (
        <>
          <Form.Item
            rules={[{ required: true, message: 'Please input your Answer Options!' }]}
            name={[name, 'answersOptions']}
            label="Answer Options"
          >
            <Select
              onChange={(value) => {
                setOptions(value);
              }}
              maxLength={4}
              mode="tags"
              placeholder="Answer Options"
              className="text-left"
            />
          </Form.Item>
          <Form.Item
            name={[name, 'correctAnswer']}
            rules={[
              {
                required: true,
                message: 'Please input your Correct Answer!',
                validator: (_, value: string) =>
                  options.includes(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Correct Answer must be in Answer Options')),
              },
            ]}
            label="Correct Answer"
          >
            <Select placeholder="Correct Answer">
              {options.map((option) => (
                <Select.Option value={option} key={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item hidden name={[name, 'successPromt']} label="Success Prompt:">
        <Input placeholder="Success Prompt" />
      </Form.Item>
      <Form.Item hidden label="Fail Prompt" name={[name, 'FailPromt']}>
        <Input placeholder="Fail Prompt" />
      </Form.Item>
      <Form.Item name={[name, 'scenarioId']} rules={[]} label="Scenario">
        <Select placeholder="Scenario">
          {scenarios?.questionScenarios.map((option) => (
            <Select.Option key={option?.id}>{option?.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name={[name, 'attachment']}
        rules={[]}
        label="Attachment"
        className="!text-left"
      >
        <Upload
          beforeUpload={() => {
            return false;
          }}
          showUploadList={{
            showRemoveIcon: true,
          }}
          onPreview={(file) => {
            window.open(file.url, '_blank');
          }}
          multiple={false}
          maxCount={1}
          accept=".doc,.docx,.pdf,.ppt,.pptx,.png,.jpg,.jpeg"
        >
          <Button
            size="small"
            icon={<UploadOutlined />}
            shape="round"
            className="mt-2"
            type="primary"
          >
            Upload File
          </Button>
        </Upload>
      </Form.Item>
      {/* Delete Buttion */}
      <div className="col-span-3">
        <Form.Item>
          <div className="-mt-2 w-full pl-2 text-left">
            <Button
              size="small"
              onClick={() => {
                remove();
              }}
              shape="round"
              danger
            >
              Delete
            </Button>
          </div>
        </Form.Item>
      </div>
    </div>
  );
}
