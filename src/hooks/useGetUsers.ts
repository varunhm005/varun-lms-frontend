import { RoleNames, getDefaultUserFilter } from '../configs/filters';
import { OrderBy, useGetUsersOnlyQuery } from '../graphql/@generated/graphql';
import StorageService from '../services/StorageService';
import { useGetUserRoleName } from './auth-hook';
import { useGetRoles } from './useGetRoles';

export const useGetLineManagers = () => {
  const { data } = useGetRoles();
  const role = data?.userRoles?.data?.find((r) => r?.name === 'Line Manager')?.id;
  const users = useGetUsersOnlyQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 10000,
      },
      filter: {
        roleId: role ? +role : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  return users;
};
export const useStudents = () => {
  const { data } = useGetRoles();
  const roleName = useGetUserRoleName();

  const role = data?.userRoles?.data
    ?.filter((r) => (['Students', 'Line Manager'] satisfies RoleNames[]).includes(r!.name! as any))
    .map((r) => Number(r?.id));
  const users = useGetUsersOnlyQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 10000,
        orderField: 'name',
        orderBy: OrderBy.Asc,
      },
      filter: {
        roles: role,
        ...getDefaultUserFilter(roleName),
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  return users;
};
export const useGetFaculties = () => {
  const { data } = useGetRoles();

  const role = data?.userRoles?.data?.find((r) => r?.name === 'Faculty')?.id;
  const users = useGetUsersOnlyQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 10000,
      },
      filter: {
        roleId: role ? +role : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  return users;
};
export const useStudentsUnderFaculty = () => {
  const users = useGetUsersOnlyQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 10000,
      },
      filter: {
        managerFirebaseId: StorageService.getUserId(),
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  return users;
};
