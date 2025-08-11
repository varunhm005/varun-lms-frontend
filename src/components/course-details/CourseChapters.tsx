import { Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import { route } from '../../constants/routes';
import { Chapter, ChapterType } from '../../graphql/@generated/graphql';

interface Props {
  chapters: Chapter[];
}

function CourseChapters(props: Props) {
  const { chapters } = props;

  const navigate = useNavigate();

  const columns: ColumnsType<Chapter> = [
    {
      title: 'SL.No',
      dataIndex: 'id',
      render: (_, __, i) => <div>{i + 1}</div>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Chapter Type',
      dataIndex: 'chapterType',
      render: (text: ChapterType, rec) => {
        let color = 'green';

        if (text === ChapterType.Video) {
          color = 'geekblue';
        } else if (text === ChapterType.LiveClass) {
          color = 'volcano';
        }

        return (
          <div>
            <Link
              to={`/${route.viewChapterDoc}`}
              state={{
                url: rec.link,
                type: rec.chapterType,
              }}
            >
              <Tag color={color}>{text?.replace('_', ' ')}</Tag>
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      render(value: Chapter) {
        return (
          <div>
            <div className="flex">
              <div className="mr-4">
                <Button
                  onClick={() => {
                    navigate(`/${route.chapterDetails(value.id)}`);
                  }}
                  size="small"
                  type="primary"
                >
                  View Chapter
                </Button>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <p className="mb-2 mt-4 text-base">Chapters:</p>
      <div className="custom-table">
        <Table columns={columns} rowKey="id" dataSource={chapters} />
      </div>
    </div>
  );
}

export default CourseChapters;
