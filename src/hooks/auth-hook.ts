import { RoleNames } from '../configs/filters';
import {
  ADMIN_PERMISSIONS,
  FACULTY_PERMISSIONS,
  LINE_MANAGER_PERMISSIONS,
  Permissions,
  STUDENT_PERMISSIONS,
} from '../configs/permissions';
import { useGetUserProfileQuery } from '../graphql/@generated/graphql';
import StorageService from '../services/StorageService';

export const useGetUserRoleName = () => {
  const { data: profileData, loading: profileLoading } = useGetUserProfileQuery({
    onCompleted: (data) => {
      const userId = data?.getUserProfile!.id!;
      if (userId) StorageService.setProfileId(userId);
    },
  });

  if (profileLoading) {
    return '';
  }

  return (profileData?.getUserProfile?.role?.name || '') as RoleNames;
};

export const useGetProfile = () => {
  const { data: profileData, loading: profileLoading } = useGetUserProfileQuery({
    onCompleted: (data) => {
      const userId = data?.getUserProfile!.id!;
      if (userId) StorageService.setProfileId(userId);
    },
  });

  if (profileLoading) {
    return null;
  }

  return profileData?.getUserProfile;
};

export const useGetUserPermissions = () => {
  const roleName = useGetUserRoleName();

  let permissions: Permissions[] = [];

  if (roleName === 'Admin') {
    permissions = ADMIN_PERMISSIONS;
  }

  if (roleName === 'Faculty') {
    permissions = FACULTY_PERMISSIONS;
  }

  if (roleName === 'Students') {
    permissions = STUDENT_PERMISSIONS;
  }
  if (roleName === 'Line Manager') {
    permissions = LINE_MANAGER_PERMISSIONS;
  }

  return permissions;
};
