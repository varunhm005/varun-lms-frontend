import { CourseFilter, UserFilter } from '../graphql/@generated/graphql';
import StorageService from '../services/StorageService';
import { consoleDebug } from '../utils/utils';

export type RoleNames = 'Admin' | 'Faculty' | 'Students' | 'Line Manager' | '';

export const getDefaultUserFilter = (role: RoleNames): UserFilter => {
  consoleDebug(role, 'role');

  // if (role === 'Line Manager') {
  //   return {
  //     managerFirebaseId: StorageService.getUserId(),
  //   };
  // }

  return {};
};

export const getDefaultcourseFilter = (userRole: RoleNames): CourseFilter => {
  if (userRole === 'Faculty') {
    return { instructorId: StorageService.getProfileId() };
  }

  return {};
};
