/* eslint-disable react/jsx-props-no-spreading */
import { CloseCircleOutlined } from '@ant-design/icons';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { ChapterFormInput } from '../../types/ChapterFormInput';

interface Props {
  remove: (index: number | number[]) => void;
  name: number;
  restField: any;
  form: FormInstance<ChapterFormInput>;
}

function AssessmentQuestion(props: Props) {
  const { remove, name, restField, form } = props;

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(form.getFieldValue('questions')[name]?.options || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue('questions')]);

  return (
    <div className="col-span-2 mb-2 rounded-lg bg-[#e6e6e6] p-2">
      <div className=" text-right">
        <CloseCircleOutlined
          className="text-red-500"
          onClick={() => {
            remove(name);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-5">
        <div className="col-span-1 text-left">
          <Form.Item hidden {...restField} name={[name, 'id']}>
            <Input />
          </Form.Item>
          <Form.Item
            {...restField}
            rules={[
              {
                required: true,
                message: 'Please input your Question!',
              },
            ]}
            name={[name, 'question']}
            label="Question"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-span-1 text-left">
          <Form.Item {...restField} name={[name, 'options']} label="Answer Options">
            <Select
              onChange={(value) => {
                setOptions(value);
              }}
              maxLength={4}
              mode="tags"
            />
          </Form.Item>
        </div>
        <div className="col-span-1 text-left">
          <Form.Item
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
            {...restField}
            name={[name, 'answer']}
            label="Correct Answer"
          >
            {/* <Input /> */}
            <Select placeholder="Correct Answer">
              {options.map((option) => (
                <Select.Option value={option} key={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="col-span-1 text-left">
          <Form.Item {...restField} name={[name, 'weighage']} label="Answer Weighage">
            <InputNumber className="!w-full !rounded-full" />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default AssessmentQuestion;
