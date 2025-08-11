import { OrderBy, useGetCoursesListQuery } from '../graphql/@generated/graphql';
import { useGetProfile, useGetUserRoleName } from './auth-hook';

export default function useGetUserCourses() {
  const userRole = useGetUserRoleName();

  const profile = useGetProfile();
  const data = useGetCoursesListQuery({
    variables: {
      pagingInput: {
        page: 1,
        size: 1000,
        orderBy: OrderBy.Asc,
        orderField: 'name',
      },
      filter: {
        instructorId: userRole === 'Faculty' ? Number(profile!.id) : undefined,
      },
    },
  });
  return data;
}
