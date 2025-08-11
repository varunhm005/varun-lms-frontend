/* eslint-disable react/jsx-props-no-spreading */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import AddScenarioModal from '../../components/create-exam/AddScenarioModal';
import ExamQuestion from '../../components/create-exam/ExamQuestion';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { storagePaths } from '../../constants/storage-paths';
import { useMessage } from '../../context/context-hooks';
import {
  AnswerType,
  ExamMedium,
  useCreateExamMutation,
  useGetExamLazyQuery,
  useUpdateExamMutation,
} from '../../graphql/@generated/graphql';
import useUrlQueries from '../../hooks/useUrlQueries';
import { CreateExamFormInputs, QuestionInput } from '../../types/FormInputs';
import { getImageDetailsFromUrl, showErrorMessage, uploadFileToStorage } from '../../utils/utils';

const refetchQueries = [queryKeys.GetCourseLevelDetails, queryKeys.GetExams, queryKeys.GetExam];

export default function CreateExam() {
  const [form] = Form.useForm<CreateExamFormInputs>();

  const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
  const { levelId, examId } = useParams<{ levelId: string; examId: string }>();
  const navigate = useNavigate();

  const [createExam, { loading: createExamLoading }] = useCreateExamMutation({
    refetchQueries: [queryKeys.GetCourseDetails],
  });
  const [updateExam, { loading: updateExamLoading }] = useUpdateExamMutation({
    refetchQueries: [queryKeys.GetCourseDetails],
  });

  const [getExam, { loading: getExamLoading, data: examData }] = useGetExamLazyQuery({
    fetchPolicy: 'network-only',
  });

  const { type } = useUrlQueries<{
    type: ExamMedium;
  }>();

  // Validate type of exam
  const typeOfExam = useMemo(() => {
    if (examData) {
      return examData.exam!.type;
    }

    if (type && [ExamMedium.Online, ExamMedium.Offline].includes(type as ExamMedium)) {
      return type;
    }
    navigate(`/${route.coursesDetails(levelId!)}`, { replace: true });
    return ExamMedium.Online;
  }, [examData, levelId, navigate, type]);

  const message = useMessage();

  const [uploading, setUploading] = useState(false);

  const onFinish = async (input: CreateExamFormInputs) => {
    try {
      setUploading(true);
      let values = { ...input, type: typeOfExam };

      // VALIDATE TO CHECK IF THE MARKS ARE EQUAL TO THE MAXIMUM MARK

      if (typeOfExam === ExamMedium.Online) {
        const totalMark = values.Questions!.reduce(
          (acc, curr) => acc + (curr?.mark ? curr.mark : 0),
          0
        );

        if (Number(totalMark) !== Number(values.maximumMark)) {
          message.error('Total Mark must be equal to Maximum Mark');
          return;
        }

        const mediaUrls = values.Questions!.map((question) => {
          if (question && question.attachment && question?.attachment?.length > 0) {
            const [att] = question.attachment;

            const file = att!.originFileObj as any;
            if (!file) {
              return att!.url || null;
            }
            return uploadFileToStorage(file, `${storagePaths.questionAttachments}/${file.name}`);
          }

          return null;
        });

        const responses = await Promise.all(mediaUrls);

        values = {
          ...values,
          Questions: values.Questions!.map((question, i) => {
            const answerType = question.answerType || AnswerType.Mcq;
            const { attachment, ...rest } = question;
            return {
              ...rest,
              scenarioId: question.scenarioId ? +question.scenarioId : null,
              mediaUrl: responses[i],
              answerType,
              answersOptions: answerType === AnswerType.Mcq ? question.answersOptions : [],
              correctAnswer: answerType === AnswerType.Mcq ? question.correctAnswer : null,
            } satisfies QuestionInput;
          }),
        };
      }

      if (levelId) {
        createExam({
          variables: {
            createExamInput: { ...values, levelId: +levelId },
          },
          onCompleted() {
            message.success('Exam Created Successfully');
            navigate(`/${route.coursesDetails(levelId!)}`, { replace: true });
          },
          onError(error) {
            showErrorMessage(error);
          },
          refetchQueries,
        });
        return;
      }

      if (examId) {
        updateExam({
          variables: {
            updateExamInput: { ...values, id: +examId },
          },
          onCompleted(data) {
            message.success('Exam Updated Successfully');
            navigate(`/${route.coursesDetails(`${data!.updateExam.courseLevelId!}`)}`, {
              replace: true,
            });
          },
          onError(error) {
            showErrorMessage(error);
          },
          refetchQueries,
        });
      }
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setUploading(false);
    }
  };

  // GET EXAM DETAILS
  React.useEffect(() => {
    if (examId) {
      getExam({
        variables: {
          examId: +examId,
        },
        onCompleted(data) {
          form.setFieldsValue({
            name: data.exam!.name!,
            maximumMark: Number(data.exam?.maximumMark),
            passMark: Number(data.exam?.passMark),
            Questions: data.exam?.Questions!.map(
              (question) =>
                ({
                  answer: question!.answer,
                  mark: question!.mark,
                  question: question!.question,
                  answersOptions: question!.answersOptions,
                  correctAnswer: question!.correctAnswer,
                  FailPromt: question!.FailPromt,
                  successPromt: question!.successPromt,
                  id: question!.id,
                  scenarioId: question!.scenarioId ? `${question!.scenarioId}` : null,
                  attachment: question!.media?.url
                    ? [
                        {
                          uid: question!.media?.url,
                          name: getImageDetailsFromUrl(question!.media?.url).fileName,
                          status: 'done',
                          url: question!.media?.url,
                        },
                      ]
                    : undefined,
                  answerType: question!.answerType,
                } as any)
            ),
          });
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  const courseLevelId = examData?.exam?.courseLevelId ?? levelId;

  if (getExamLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <h1 className="my-4 text-2xl font-bold">{levelId ? 'Create' : 'Update'} Exam</h1>
      <div className="w-full">
        <div className="input-rounded p-6">
          <Form
            form={form}
            initialValues={{
              Questions: [
                {
                  question: '',
                  mark: '',
                },
              ],
            }}
            onFinish={onFinish}
            layout="vertical"
            colon
          >
            <div className="grid grid-cols-3 gap-x-5">
              <Form.Item
                rules={[{ required: true, message: 'Please input Exam Name!' }]}
                name="name"
                label="Exam Name"
              >
                <Input placeholder="Exam Name" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Please input Exam Code!' }]}
                label="Maximum Mark:"
                name="maximumMark"
              >
                <InputNumber className="!w-full !rounded-full" placeholder="Maximum Mark" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: 'Please input Pass Mark!' }]}
                name="passMark"
                label="Pass Mark:"
              >
                <InputNumber className="!w-full !rounded-full" placeholder="Pass Mark" />
              </Form.Item>
            </div>

            {typeOfExam === ExamMedium.Online && (
              <>
                <div className="col-span-3 mb-5 text-left">
                  <Button onClick={() => setScenarioModalVisible(true)} type="link">
                    + Add Scenario
                  </Button>
                </div>

                <hr className="mb-4" />

                <Form.List name="Questions">
                  {(fields, { add, remove }) => (
                    <div className="">
                      {fields.map(({ key, name, ...restField }) => (
                        <ExamQuestion
                          name={name}
                          key={key}
                          form={form}
                          remove={() => {
                            remove(name);
                          }}
                          {...restField}
                          levelId={Number(courseLevelId)}
                        />
                      ))}

                      <hr className="mb-6" />

                      <Form.Item>
                        <Button
                          onClick={() => {
                            add({
                              answerType: AnswerType.Mcq,
                            });
                          }}
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Question
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </>
            )}

            <div className="text-left">
              <Button
                loading={createExamLoading || updateExamLoading || uploading}
                htmlType="submit"
                shape="round"
                className="mr-3 mt-2"
                type="primary"
              >
                Save
              </Button>
              {/* 
              <Button htmlType="reset" shape="round" className="mr-3 mt-2" type="primary" ghost>
                Safe Draft
              </Button> */}

              {/* <Button htmlType="reset" shape="round" className="mt-2" type="primary" ghost>
                Delete
              </Button> */}
            </div>
          </Form>
        </div>
      </div>
      <AddScenarioModal
        onClose={() => setScenarioModalVisible(false)}
        visible={scenarioModalVisible}
        scenario={null}
        level={String(courseLevelId)}
      />
    </div>
  );
}
