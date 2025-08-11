import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Form, Input, Table, TablePaginationConfig } from 'antd';
import { FilterValue, SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChangePasswordModal } from '../../components/users/change-password-modal';
import { ImportUsers } from '../../components/users/ImportUsers';
import { configs } from '../../configs/configs';
import { getDefaultUserFilter } from '../../configs/filters';
import { route } from '../../constants/routes';
import { urlQueryKeys } from '../../constants/url-query-keys';
import {
  EmployeeStatus,
  OrderBy,
  User,
  UserRole,
  useGetUsersQuery,
} from '../../graphql/@generated/graphql';
import { useGetUserRoleName } from '../../hooks/auth-hook';
import { useParsedUrlQuery, useUrlQueryParam } from '../../hooks/useUrlQueries';
import { formatDate, formatEnums, getFilterDirection } from '../../utils/utils';

export default function Faculties() {
  const roleName = useGetUserRoleName();
  const [filters] = useState(getDefaultUserFilter(roleName));
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const { page, size, sort, sortDirection, status, query } = useParsedUrlQuery<{
    page: string;
    size: string;
    sort: string;
    sortDirection: SortOrder;
    status: EmployeeStatus[];
    query: string;
  }>();

  const { setQueryParams: updateQueryParams } = useUrlQueryParam();

  const { data, loading } = useGetUsersQuery({
    variables: {
      pagingInput: {
        page: Number(page || configs.defaultPage),
        size: Number(size || configs.defaultPageSize),
        orderBy: getFilterDirection(sortDirection) || OrderBy.Asc,
        orderField: sort,
      },
      filter: {
        ...filters,
        search: query,
        status: status as EmployeeStatus[],
      },
    },
  });

  const onSearch = (value: string) => {
    updateQueryParams({
      [urlQueryKeys.query]: value,
    });
  };

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    _sorter: SorterResult<User>
  ) => {
    const { current, pageSize } = _pagination;

    updateQueryParams({
      [urlQueryKeys.page]: current,
      [urlQueryKeys.size]: pageSize,
      [urlQueryKeys.sort]: _sorter.field || null,
      [urlQueryKeys.sortDirection]: _sorter.order ?? null,
      [urlQueryKeys.status]: _filters.status || null,
    });
  };

  return (
    <main className="p-6 text-left">
      <Card
        title="Users"
        size="small"
        bordered
        extra={[
          <div className="my-2 flex gap-6">
            <ImportUsers />
            <Link key="Add User" to={`/${route.facultyRegistration}`}>
              <Button icon={<PlusOutlined />} type="primary" className="btn btn-primary px-4">
                Add User
              </Button>
            </Link>
          </div>,
        ]}
      >
        <div className="p-2 pb-0">
          <Form.Item>
            <Input.Search defaultValue={query} placeholder="Search" onSearch={onSearch} />
          </Form.Item>
        </div>
        <Table
          columns={[
            {
              title: 'Id No',
              dataIndex: 'idNumber',
              key: 'idNumber',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter: true,
              sortDirections: ['ascend', 'descend'],
              sortOrder: sort === 'name' ? sortDirection : null,
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
            {
              title: 'Created On',
              dataIndex: 'createdAt',
              sorter: true,
              render: (value: string) => formatDate(value),
              sortDirections: ['ascend', 'descend'],
              sortOrder: sort === 'createdAt' ? sortDirection : null,
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
              render: (value: UserRole) => {
                return <span>{value?.name}</span>;
              },
            },
            {
              title: 'Manager',
              dataIndex: 'manager',
              key: 'manager',
              render: (value: User) => {
                return <span>{value?.name}</span>;
              },
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: formatEnums,
              filters: [
                { text: 'Active', value: EmployeeStatus.Active },
                { text: 'Inactive', value: EmployeeStatus.Inactive },
              ],
              filteredValue: status,
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record: User) => (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'change-password',
                        label: 'Change Password',
                        onClick: () => setPasswordUser(record),
                      },
                      {
                        key: 'edit',
                        label: 'Edit',
                        onClick: () =>
                          navigate(`/${route.editUser(record.id.toString())}`, {
                            state: { user: record },
                          }),
                      },
                    ],
                  }}
                  trigger={['click']}
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              ),
            },
          ]}
          dataSource={(data?.users.data || []) as User[]}
          loading={loading}
          onChange={
            handleTableChange as (
              pagination: TablePaginationConfig,
              filters: Record<string, FilterValue | null>,
              sorter: SorterResult<User> | SorterResult<User>[]
            ) => void
          }
          pagination={{
            total: data?.users.paging.totalItems,
            current: Number(page || configs.defaultPage),
            pageSize: Number(size || configs.defaultPageSize),
            showSizeChanger: true,
          }}
          showSorterTooltip
        />
      </Card>

      <ChangePasswordModal
        onCancel={() => {
          setPasswordUser(null);
        }}
        user={passwordUser}
        visible={Boolean(passwordUser)}
      />
    </main>
  );
}
