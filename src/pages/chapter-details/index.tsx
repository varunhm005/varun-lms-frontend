import { Button, Card, Popconfirm, Table, Tag } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SaftyImage from '../../assets/images/safety.png';
import Loading from '../../components/common/Loading';
import { Permissions } from '../../configs/permissions';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useMessage } from '../../context/message-context';
import {
  useGetChapterDetailsQuery,
  useRemoveChapterMutation,
} from '../../graphql/@generated/graphql';
import { useGetUserPermissions } from '../../hooks/auth-hook';
import { createErrorMessage, formatCourseMedian } from '../../utils/utils';

export default function ChapterDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: chapterData } = useGetChapterDetailsQuery({
    variables: {
      chapterId: +id!,
    },
  });

  const { success, error } = useMessage();

  const [removeChapter, { loading: removeChapterLoading }] = useRemoveChapterMutation({
    onCompleted(data) {
      success(data?.removeChapter?.message);
      navigate(`/${route.courseLevels(chapterData?.chapter?.courses?.id!.toString()!)}`, {
        replace: true,
      });
    },

    onError(e) {
      error(createErrorMessage(e));
    },
    refetchQueries: [queryKeys.GetChapterDetails, queryKeys.GetCourseDetails],
  });

  const chapter = chapterData?.chapter!;

  const permissions = useGetUserPermissions();

  if (!chapter) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-6 text-left">
        <div className="grid  grid-cols-1 gap-4 text-left md:grid-cols-10">
          <div className="col-span-1 md:col-span-6 ">
            <div className="relative flex rounded-[25px]  bg-stone-100">
              <div className="p-5">
                <div className="mb-3 flex">
                  <div className="border-r  border-r-stone-300 pr-5">
                    <p className="text-[14px] font-normal text-black">Chapter Name:</p>
                    <h3 className="text-[24px] font-black text-black">{chapter?.name}</h3>
                  </div>
                  <div className="pl-5">
                    <p className="text-[14px] font-normal text-black">Created On:</p>
                    <h6 className="text-[16px] font-black text-black">
                      {new Date(chapter?.createdAt!).toLocaleDateString()}
                    </h6>
                  </div>
                </div>

                {permissions.includes(Permissions.EDIT_CHAPTER) && (
                  <Link to={`/${route.editChapter(id!)}`}>
                    <Button shape="round" className="mr-3 mt-2" type="default">
                      Edit
                    </Button>
                  </Link>
                )}

                {permissions.includes(Permissions.REMOVE_CHAPTER) && (
                  <Popconfirm
                    title="Remove chapter"
                    description="Are you sure you want to remove this chapter?"
                    onConfirm={() => {
                      removeChapter({
                        variables: {
                          id: +chapter.id!,
                        },
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      loading={removeChapterLoading}
                      shape="round"
                      className="mr-3 mt-2"
                      type="primary"
                    >
                      Remove
                    </Button>
                  </Popconfirm>
                )}
                {Boolean(chapter.link) && (
                  <Link
                    to={`/${route.viewChapterDoc}`}
                    state={{
                      url: chapter.link,
                      type: chapter.chapterType,
                    }}
                  >
                    <Button
                      shape="round"
                      className="mr-3 mt-2 !border-primary-500 !text-primary-500"
                      type="default"
                    >
                      {chapter.chapterType === 'VIDEO' ? 'Play Video' : 'View Document'}
                    </Button>
                  </Link>
                )}
              </div>
              <div className=" w-[140px]">
                <img
                  className="h-[279px   absolute bottom-0 right-3 w-[136px]"
                  src={SaftyImage}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 ">
            <div className=" flex flex-wrap rounded-[25px]  bg-stone-100 p-5">
              <div className="w-1/2 ">
                <p className="text-[14px] font-normal text-black">Course Code:</p>
                <h6 className="text-[16px] font-black text-black">{chapter?.courses?.code}</h6>
              </div>
              <div className="w-1/2 ">
                <p className="text-[14px] font-normal text-black">Instructor:</p>
                <h6 className="text-[16px] font-black text-black">
                  {chapter?.courses?.instructor ? chapter?.courses?.instructor.name : ''}
                </h6>
              </div>
              <div className="mt-4 ">
                <p className="text-[14px] font-normal text-black">Mode:</p>
                <h6 className="text-[16px] font-black text-black">
                  {formatCourseMedian(chapter?.courses?.median!)}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <Card
            extra={[
              permissions.includes(Permissions.EDIT_CHAPTER) && (
                <Button
                  onClick={() => {
                    navigate(route.editChapter(id!));
                  }}
                  type="primary"
                  shape="round"
                >
                  Add Question
                </Button>
              ),
            ]}
            title="Activity Questions"
          >
            <Table
              columns={[
                {
                  title: 'SL No.',
                  render(_, __, index) {
                    return <span>{index + 1}</span>;
                  },
                },
                {
                  title: 'Question',
                  dataIndex: 'question',
                },
                {
                  title: 'Answer',
                  dataIndex: 'answer',
                },

                {
                  title: 'Options',
                  width: 200,
                  dataIndex: 'answersOptions',
                  render: (value: string[]) => {
                    return (
                      <div className="grid gap-5">
                        {value.map((item) => (
                          <Tag>{item}</Tag>
                        ))}
                      </div>
                    );
                  },
                },
                {
                  title: 'Correct Answer',
                  dataIndex: 'correctAnswer',
                },
                {
                  title: 'Weighage',
                  dataIndex: 'mark',
                },
              ]}
              dataSource={(chapter.Questions as any) ?? []}
              rowKey={(record) => Number((record as any).id)}
              pagination={false}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
