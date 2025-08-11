import { Checkbox, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';
import { queryKeys } from '../../constants/query-keys';
import {
  AttendanceStatus,
  AttendanceStudent,
  useGetAttendanceDetailsQuery,
  useUpdateAttendanceStudentMutation,
} from '../../graphql/@generated/graphql';
import { formatDate } from '../../utils/utils';

function EditAttendance() {
  const { id: slug } = useParams<{ id: string }>();

  const { data, loading } = useGetAttendanceDetailsQuery({
    variables: {
      slug: slug!,
    },
  });

  const [updateAttendanceStudentMutation, { loading: updateAttendanceStudentLoading }] =
    useUpdateAttendanceStudentMutation({
      refetchQueries: [queryKeys.GetAttendanceDetails],
    });

  const columns: ColumnsType<AttendanceStudent> = [
    {
      title: 'Sl No',
      render(_, __, index) {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Name',
      render(_, record) {
        return <div>{record.user.name}</div>;
      },
    },
    {
      title: 'Present',
      render(_, record) {
        return (
          <Checkbox
            onChange={(e) => {
              updateAttendanceStudentMutation({
                variables: {
                  updateAttendanceStudentInput: {
                    id: record.id,
                    status: e.target.checked ? AttendanceStatus.Present : AttendanceStatus.Absent,
                  },
                },
              });
            }}
            defaultChecked={record.status === AttendanceStatus.Present}
          />
        );
      },
    },
  ];

  return (
    <div>
      <div className="p-6 text-left">
        <h1 className="mb-4 text-xl font-bold">
          Attendance - {formatDate(data?.attendance?.date)}
        </h1>
        <Table
          loading={loading || updateAttendanceStudentLoading}
          columns={columns}
          dataSource={data?.attendance?.students ?? ([] as any)}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
}

export default EditAttendance;
