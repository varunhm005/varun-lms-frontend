import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssessmentQuestion from '../../components/chapter-creation/AssessmentQuestion';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import {
  ChapterType,
  useCreateChapterMutation,
  useGetChapterDetailsLazyQuery,
  useUpdateChapterMutation,
} from '../../graphql/@generated/graphql';
import { useUploadPublicFile } from '../../hooks/useUploadPublicFile';
import { ChapterFormInput, Question } from '../../types/ChapterFormInput';
import { getImageDetailsFromUrl, normFile, showErrorMessage } from '../../utils/utils';

const refetchQueries = [
  queryKeys.GetCourseDetails,
  queryKeys.GetCoursesList,
  queryKeys.GetCourseLevelDetails,
  queryKeys.GetChapterDetails,
];

export default function ChapterCreation() {
  const [form] = Form.useForm<ChapterFormInput>();

  const { id, levelId } = useParams<{ id: string; levelId: string }>();

  const [type, setType] = useState<ChapterType>(ChapterType.Video);

  const [createChapterMutation, { loading: createChapterLoading }] = useCreateChapterMutation({});

  const [updateChapterMutation, { loading: updateChapterLoading }] = useUpdateChapterMutation();
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(id ? `/${route.chapterDetails(id!)}` : `/${route.chapterDetails(levelId!)}`);
  };

  const [getChapterDetails, { loading: courseLoading, data: chapter }] =
    useGetChapterDetailsLazyQuery({
      variables: {
        chapterId: +id!,
      },
      onCompleted(data) {
        const existing = data.chapter!;
        setType(existing.chapterType!);

        form.setFieldsValue({
          name: existing.name,
          chapterType: existing.chapterType!,
          keyLearning: existing.keyLearning!,
          questions: existing.Questions!.map((question) => {
            const d: Question = {
              question: question!.question!,
              answer: question!.answer!,
              options: question!.answersOptions! as string[],
              weighage: question!.mark! as unknown as string,
              id: question!.id!,
            };
            return d;
          }),
        });

        if (existing?.link && existing.chapterType! === ChapterType.Document) {
          const chapterLink = getImageDetailsFromUrl(existing?.link!);
          form.setFieldsValue({
            chapterLink: [
              {
                uid: existing.link!,
                name: chapterLink?.fileName,
                status: 'done',
                url: existing.link!,
              },
            ] as any,
          });
        } else {
          form.setFieldsValue({
            chapterLink: existing.link as any,
          });
        }
      },
    });

  const { uploadPublicFile, loading: uploading } = useUploadPublicFile();

  const onSubmit = async (values: ChapterFormInput) => {
    try {
      let image: any = null;

      if (values.chapterLink && (values as any).chapterLink?.length > 0) {
        image = (values as any).chapterLink[0]?.originFileObj;
      }

      if (image) {
        // eslint-disable-next-line no-param-reassign
        values.chapterLink = await uploadPublicFile(image);
      }
      if (!image && chapter?.chapter?.link) {
        // eslint-disable-next-line no-param-reassign
        values.chapterLink = chapter?.chapter?.link as string;
      }

      if (id) {
        updateChapterMutation({
          variables: {
            updateChapterInput: {
              id: `${id}`,
              chapterType: values.chapterType,
              keyLearning: values.keyLearning,
              name: values.name,
              link: values.chapterLink,
              questions: (values.questions || []).map((question) => ({
                question: question.question,
                answer: question.answer,
                answersOptions: question.options,
                correctAnswer: question.answer,
                id: question.id || null,
                mark: +question.weighage,
              })),
            },
          },
          refetchQueries,
          onCompleted: () => {
            form.resetFields();
            onCancel();
          },
          onError: showErrorMessage,
        });
      } else {
        createChapterMutation({
          variables: {
            createChapterInput: {
              chapterType: values.chapterType,
              name: values.name,
              keyLearning: values.keyLearning,
              levelId: Number(levelId),
              link: values.chapterLink,
              questions: (values.questions || []).map((question) => ({
                question: question.question,
                answer: question.answer,
                answersOptions: question.options,
                correctAnswer: question.answer,
                mark: +question.weighage,
              })),
            },
          },
          refetchQueries,
          onCompleted: (data) => {
            form.resetFields();
            navigate(`/${route.chapterDetails(data.createChapter!.id)}`);
          },
          onError: showErrorMessage,
        });
      }
    } catch (error) {
      showErrorMessage(error);
    }
  };

  useEffect(() => {
    if (id) {
      getChapterDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (courseLoading) {
    return <FullScreenLoading />;
  }

  return (
    <div>
      <div className="p-6">
        <Form
          onFinish={onSubmit}
          initialValues={{
            chapterType: type,
          }}
          onReset={() => {
            onCancel();
          }}
          form={form}
          layout="vertical"
          className="form-design"
        >
          <div className="m-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 md:gap-x-10 ">
            <div className="col-span-2 mt-4 text-left">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input your Chapter Name!',
                  },
                ]}
                name="name"
                label="Chapter Name"
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-span-2 mt-4 text-left">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please Select Type!',
                  },
                ]}
                name="chapterType"
                label="Type"
              >
                <Select
                  onChange={(value) => {
                    setType(value);
                  }}
                  disabled={!!id}
                >
                  <Select.Option value="VIDEO">Video</Select.Option>
                  <Select.Option value="DOCUMENT">Document</Select.Option>
                  <Select.Option value="LIVE_CLASS">Live Class</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {type === ChapterType.Video && (
              <div className="col-span-2 text-left">
                <Form.Item name="chapterLink" label="Video Link">
                  <Input />
                </Form.Item>
              </div>
            )}

            {type === ChapterType.Document && (
              <div className="col-span-2  text-left ">
                <div className="antd-image-200 flex items-center ">
                  <Form.Item
                    label="Upload"
                    name="chapterLink"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      beforeUpload={() => false}
                      accept=".doc,.docx,.pdf,.ppt,.pptx"
                      multiple={false}
                      maxCount={1}
                      showUploadList={{
                        removeIcon: false,
                      }}
                    >
                      <Button className="!w-40" icon={<UploadOutlined />}>
                        Click to Upload
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            )}

            <div className="col-span-2 text-left">
              <Form.Item
                name="keyLearning"
                label="Description"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input your Description!',
                //   },
                // ]}
              >
                <Input.TextArea placeholder="Key Learnings" rows={5} />
              </Form.Item>
            </div>
            <div className="col-span-2 my-5">
              <p className="text-xl font-semibold">Activity</p>
            </div>

            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <AssessmentQuestion
                      key={key}
                      restField={{ ...restField }}
                      remove={remove}
                      name={name}
                      form={form}
                    />
                  ))}
                  <div className="col-span-2 text-left">
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Activity
                      </Button>
                    </Form.Item>
                  </div>
                </>
              )}
            </Form.List>

            <div className="col-span-2 text-left">
              <Button
                loading={createChapterLoading || updateChapterLoading || uploading}
                htmlType="submit"
                shape="round"
                className="mr-3 mt-2"
                type="primary"
              >
                Save
              </Button>

              <Button htmlType="reset" shape="round" className="mt-2" type="primary" ghost>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
