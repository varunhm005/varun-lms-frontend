import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Radio, Spin, Tooltip } from 'antd';
import { queryKeys } from '../../constants/query-keys';
import {
  AnswerStatus,
  Chapter,
  ScheduleProgress,
  useCreateAttendedActivityMutation,
  useGetAttendedActivityByChapterAndScheduleQuery,
} from '../../graphql/@generated/graphql';

interface Props {
  chapter: Chapter;
  progress: ScheduleProgress | null;
}

function CourseActivity(props: Props) {
  const { chapter, progress } = props;

  const [form] = Form.useForm();

  const { data: activity, loading } = useGetAttendedActivityByChapterAndScheduleQuery({
    variables: {
      getAttendedActivityInput: {
        chapterId: +chapter.id!,
        scheduleProgressId: +progress!.id!,
      },
    },
    onCompleted(data) {
      if (data.attendedActivityByChapterAndSchedule) {
        form.setFieldsValue(
          data.attendedActivityByChapterAndSchedule?.activityAnswers?.reduce((acc, answer) => {
            return {
              ...acc,
              [answer!.questionId!]: answer!.answer,
            };
          }, {})
        );
      }
    },
  });

  const [createAttendedActivity, { loading: createAttendedActivityLoading }] =
    useCreateAttendedActivityMutation({
      refetchQueries: [
        queryKeys.GetScheduleStudentDetails,
        queryKeys.GetAttendedActivityByChapterAndSchedule,
      ],
    });

  const onFinish = (values: { [key: string]: string }) => {
    createAttendedActivity({
      variables: {
        createAttendedActivityInput: {
          chapterId: +chapter.id!,
          progressId: +progress!.id!,
          ActivityAnswers: Object.keys(values).map((key) => {
            return {
              questionId: +key,
              answer: values[key] || '',
            };
          }),
        },
      },
    });
  };

  return (
    <Spin spinning={loading}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="col-span-6">
          <p className=" mb-2 text-base font-normal text-black">Activity </p>
          {chapter.Questions?.map((question, index) => {
            const answer =
              activity?.attendedActivityByChapterAndSchedule?.activityAnswers?.find(
                (an) => Number(an?.questionId) === Number(question?.id)
              ) || null;

            return (
              <div className="flex" key={question?.id}>
                <p className="w-16 px-3 text-right text-xl font-normal leading-snug text-black">
                  Q{index + 1}:
                </p>
                <div className="flex justify-between gap-5 border-l border-r-gray-200 pl-3">
                  <Form.Item name={`${question!.id!}`} label={`${question?.question}`}>
                    <Radio.Group buttonStyle="solid" className="">
                      {question?.answersOptions?.map((option) => {
                        return (
                          <Radio.Button key={option} value={option}>
                            {option}
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>

                  {answer?.answerStatus === AnswerStatus.CorrectAnswer && (
                    <CheckCircleOutlined className="text-2xl text-green-500" />
                  )}
                  {answer?.answerStatus === AnswerStatus.WrongAnswer && (
                    <>
                      <CloseCircleOutlined className="text-2xl text-red-500" />
                      <Tooltip
                        placement="bottomLeft"
                        title={`Correct Answer Is ${answer?.correctAnswer}`}
                        color="orange"
                        overlayStyle={{}}
                      >
                        <ExclamationCircleOutlined className="cursor-pointer text-2xl text-yellow-500" />
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          <div className="flex">
            <p className="w-16 px-3 text-right text-xl font-normal leading-snug text-black" />
            <div className="border-l border-r-gray-200 px-4 ">
              <div className="h-4" />
              <Button
                loading={createAttendedActivityLoading}
                htmlType="submit"
                type="primary"
                shape="round"
              >
                {activity?.attendedActivityByChapterAndSchedule
                  ? 'Update Answers'
                  : 'Submit Answers'}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </Spin>
  );
}

export default CourseActivity;
