import { Card, Empty } from 'antd';

function EmptyCourse() {
  return (
    <div className="mt-5">
      <Card className="">
        <Empty description="You haven't enrolled in any course yet" />
      </Card>
    </div>
  );
}

export default EmptyCourse;
