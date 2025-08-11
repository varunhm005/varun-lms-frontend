import { Button, Popconfirm, Spin, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/query-keys';
import { route } from '../../constants/routes';
import { useMessage } from '../../context/message-context';
import {
  OrderBy,
  Request,
  RequestStatus,
  RequestType,
  useGetRequestsQuery,
  useUpdateRequestMutation,
} from '../../graphql/@generated/graphql';
import { formatDate, formatEnums } from '../../utils/utils';

function Requests() {
  const { data, loading } = useGetRequestsQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 100,
        orderField: 'createdAt',
        orderBy: OrderBy.Desc,
      },
      findRequestInput: {},
    },
  });

  const [updateRequestMutation, { loading: updateRequestLoading }] = useUpdateRequestMutation({
    refetchQueries: [queryKeys.GetRequests],
  });

  const { success } = useMessage();

  const updateRequest = (request: Request, status: RequestStatus) => {
    updateRequestMutation({
      variables: {
        updateRequestInput: {
          id: request.id,
          status,
        },
      },
      onCompleted: () => {
        success('Request updated successfully');
      },
    });
  };

  const navigate = useNavigate();

  const viewItem = (request: Request) => {
    if (request.type === RequestType.RetakeExam) {
      return {
        action: () => {
          navigate(`/${route.viewAttendedExam(`${request.attendedExam?.slug}`)}`);
        },
        label: 'View Exam',
      };
    }

    return null;
  };

  return (
    <main className="p-6 text-left">
      <h1 className="mb-6 text-3xl font-bold">Requests</h1>
      <Table loading={loading} size="small" dataSource={(data?.requests.data ?? []) as Request[]}>
        <Table.Column title="S.No" dataIndex="key" render={(_, __, i) => <div>{i + 1}</div>} />
        <Table.Column title="Date" dataIndex="createdAt" render={(date) => formatDate(date)} />
        <Table.Column
          title="Student"
          render={(_, record: Request) => <div>{record.user?.name}</div>}
        />
        <Table.Column title="Reason" dataIndex="reason" />
        <Table.Column
          title="Approved On"
          dataIndex="approvedOn"
          render={(date) => date && formatDate(date)}
        />
        <Table.Column
          title="Rejected On"
          dataIndex="rejectedOn"
          render={(date) => date && formatDate(date)}
        />
        <Table.Column title="Status" dataIndex="status" render={(status) => formatEnums(status)} />
        <Table.Column
          title="Actions"
          render={(d: Request) => {
            const actionItem = viewItem(d);
            return (
              <div className="flex">
                {actionItem && (
                  <Button
                    className="mr-5"
                    size="small"
                    onClick={() => {
                      actionItem.action();
                    }}
                  >
                    {actionItem.label}
                  </Button>
                )}
                {d.status === RequestStatus.Pending && (
                  <Spin spinning={updateRequestLoading}>
                    <Popconfirm
                      title="Are you sure you want to reject this request?"
                      placement="bottomLeft"
                      onConfirm={() => {
                        updateRequest(d, RequestStatus.Rejected);
                      }}
                    >
                      <Button size="small" danger>
                        Reject
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      title="Are you sure you want to approve this request?"
                      placement="bottomLeft"
                      onConfirm={() => {
                        updateRequest(d, RequestStatus.Approved);
                      }}
                    >
                      <Button className="ml-5 !bg-green-500 !text-white" size="small">
                        Approve
                      </Button>
                    </Popconfirm>
                  </Spin>
                )}
              </div>
            );
          }}
        />
      </Table>
    </main>
  );
}

export default Requests;
