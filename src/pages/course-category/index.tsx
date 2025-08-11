import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CreateCourseCategoryModal from '../../components/course-category/CreateCourseCategoryModal';
import { CourseCategory, useGetCourseCategoryQuery } from '../../graphql/@generated/graphql';

function CourseCategorys() {
  const [modalVisible, setModalVisible] = useState(false);
  const [courseCategory, setCourseCategory] = useState<null | CourseCategory>(null);

  const { data, refetch } = useGetCourseCategoryQuery({
    variables: {
      PagingInput: {
        page: 1,
        size: 1000,
      },
    },
  });

  return (
    <main className="p-6 text-left">
      <Card
        title="Course Category"
        extra={[
          <Button
            icon={<PlusOutlined />}
            shape="round"
            type="primary"
            className="btn btn-primary"
            onClick={() => setModalVisible(true)}
          >
            Add Course Category
          </Button>,
        ]}
      >
        <Table
          size="small"
          dataSource={(data?.courseCategories!.data! as Array<any>) || []}
          pagination={false}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Created',
              dataIndex: 'createdAt',
              key: 'createdAt',
              render(value) {
                return dayjs(value).format('DD MMM YYYY');
              },
            },
            {
              title: 'Action',
              key: 'action',
              render(_, dep) {
                return (
                  <div className="flex items-center">
                    <Button
                      onClick={() => {
                        setCourseCategory(dep);
                        setModalVisible(true);
                      }}
                      type="link"
                    >
                      Edit
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </Card>
      <CreateCourseCategoryModal
        visible={modalVisible}
        onCancel={() => {
          setCourseCategory(null);
          setModalVisible(false);
        }}
        courseCategory={courseCategory}
        refetchCourseCategory={refetch}
      />
    </main>
  );
}

export default CourseCategorys;
