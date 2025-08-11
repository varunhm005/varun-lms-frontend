import { Button, Descriptions, Form, Input, Radio } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import { useEffect, useMemo, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { Permissions } from '../../configs/permissions';
import { queryKeys } from '../../constants/query-keys';
import { useModalContext } from '../../context/conform-context';
import { useMessage } from '../../context/message-context';
import {
  Language,
  useGetCourseEvaluationQuery,
  useUpdateCourseEvaluationMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import { formatDate } from '../../utils/utils';

function AddCourseEvaluation() {
  const { slug } = useParams<{ slug: string }>();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const message = useMessage();
  const { confirm } = useModalContext();

  const permissions = useGetUserPermissions();

  const [form] = Form.useForm();
  const { showBoundary } = useErrorBoundary();
  const { data, loading } = useGetCourseEvaluationQuery({
    variables: {
      slug: slug!,
    },
    onError(error) {
      showBoundary(error);
    },
    onCompleted(d) {
      if (!d?.courseEvaluation) showBoundary(new Error('Course Evaluation not found'));
    },
  });

  const hasWritePermission = useMemo(() => {
    if (data?.courseEvaluation?.language) return false;

    return permissions?.includes(Permissions.CREATE_COURSE_EVALUATION);
  }, [permissions, data]);

  const { courseEvaluation } = data || {};

  const allQuestions = courseEvaluation?.questions.map((question) => question.questions) || [];

  //   Set Data to form
  useEffect(() => {
    if (courseEvaluation) {
      if (courseEvaluation.language) setLanguage(courseEvaluation.language);
      let values: {
        [key: string]: string;
      } = {
        remarks: courseEvaluation.remarks ?? '',
        language: courseEvaluation.language || language,
      };

      allQuestions.forEach((question) => {
        question.forEach((q) => {
          values = {
            ...values,
            [q.id]: q.answer,
          };
        });
      });

      form.setFieldsValue(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseEvaluation, form, allQuestions]);

  const [updateCourseEvaluation, { loading: updateCourseEvaluationLoading }] =
    useUpdateCourseEvaluationMutation({
      refetchQueries: [queryKeys.GetCourseEvaluation],
      onCompleted() {
        message.success('Course Evaluation Saved Successfully');
      },
    });

  const submitValues = async (values: any) => {
    const { remarks, ...rest } = values;

    const questions = Object.keys(rest).map((key) => ({
      id: Number(key),
      answer: rest[key] ?? '',
    }));

    if (!hasWritePermission) {
      message.error('You do not have permission to perform this action');
      return;
    }

    confirm({
      title: 'Are you sure you want to save this evaluation?',
      content: 'You will not be able to change your answers after saving.',
      centered: true,
      okText: 'Save',
      cancelText: 'Cancel',
      onOk() {
        return updateCourseEvaluation({
          variables: {
            updateCourseEvaluationInput: {
              id: Number(courseEvaluation?.id),
              language: language as Language,
              remarks,
              questions,
            },
          },
        });
      },
    });
  };

  if (loading) return <FullScreenLoading />;

  return (
    <main className="p-6">
      <div className="container rounded-md bg-white p-6 shadow-sm">
        <Descriptions column={4} title="Course Evaluation">
          <DescriptionsItem label="Date">
            {formatDate(courseEvaluation?.createdAt)}
          </DescriptionsItem>
          <DescriptionsItem label="Course">{courseEvaluation?.course.name}</DescriptionsItem>
          <DescriptionsItem label="Instructor">
            {courseEvaluation?.course.instructor?.name}
          </DescriptionsItem>
          <DescriptionsItem label="Language">
            <span className="uppercase">{language === 'ar' ? 'Arabic' : 'English'}</span>
            <button
              onClick={() => {
                form.resetFields();
                setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
              }}
              disabled={Boolean(courseEvaluation?.language)}
              type="button"
              className="ml-3 text-xs text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Change
            </button>
          </DescriptionsItem>
        </Descriptions>
        <hr />
        <div className="h-4" />
        <Form form={form} onFinish={submitValues} layout="vertical">
          {courseEvaluation?.questions.map((question) => {
            if (question?.questions?.length === 0) return null;

            return (
              <div key={question.category} className="text-left">
                <h1 className="mb-5 text-lg font-bold">{question.category}</h1>
                <div className="grid grid-cols-2 gap-2">
                  {question.questions.map((q) => {
                    const getSelectedQuestion = q.questions.find((qq) => qq.language === language);

                    return (
                      <Form.Item
                        name={q.id}
                        rules={[{ required: false, message: 'Please select an option' }]}
                        key={getSelectedQuestion?.id}
                        label={<h5 className="text-lg">{getSelectedQuestion?.question}</h5>}
                      >
                        {/* <Select>
                          {getSelectedQuestion?.options.map((option) => (
                            <Select.Option key={option} value={option}>
                              {option}
                            </Select.Option>
                          ))}
                        </Select> */}
                        <Radio.Group className="!text-black" disabled={!hasWritePermission}>
                          {getSelectedQuestion?.options.map((option) => (
                            <Radio key={option} value={option}>
                              <span className="text-black">{option}</span>
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <Form.Item name="remarks" rules={[{ required: true, message: 'Please enter remarks' }]}>
            <Input.TextArea
              readOnly={!hasWritePermission}
              rows={5}
              placeholder="Remarks / Comments"
            />
          </Form.Item>
          {hasWritePermission && (
            <Form.Item name="remarks">
              <Button
                loading={updateCourseEvaluationLoading}
                htmlType="submit"
                type="primary"
                block
              >
                Save
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </main>
  );
}

export default AddCourseEvaluation;
