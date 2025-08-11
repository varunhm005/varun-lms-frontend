import { useUserRolesQuery } from '../graphql/@generated/graphql';

export const useGetRoles = () => {
  const roleQuery = useUserRolesQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 100,
      },
    },
  });

  return roleQuery;
};
