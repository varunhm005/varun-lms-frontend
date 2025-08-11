import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { route } from '../../constants/routes';
import { CourseLevel } from '../../graphql/@generated/graphql';

const { Meta } = Card;

interface Props {
  level: CourseLevel;
  onEdit: (level: CourseLevel) => void;
}

export function CourseLevelItem(props: Props) {
  const { level, onEdit } = props;

  const navigate = useNavigate();

  return (
    <Card
      className="level-list h-full w-full"
      actions={[
        <EyeOutlined
          className=" b border-sky-700  bg-sky-500  pb-2 pt-2"
          key="view"
          onClick={() => {
            navigate(`/${route.coursesDetails(level.id)}`);
          }}
        />,
        <EditOutlined
          className="order-orange-700  bg-orange-500  pb-2 pt-2 text-white"
          key="edit"
          onClick={() => {
            onEdit(level);
          }}
        />,
      ]}
    >
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={<Avatar>{level.level}</Avatar>}
          title={level.title}
          description={`Level ${level.level}`}
        />
      </Skeleton>
    </Card>
  );
}
