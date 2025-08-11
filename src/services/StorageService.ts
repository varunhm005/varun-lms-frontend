// Storage service will be used to store data in local storage with versioning and encryption

import { consoleDebug } from '../utils/utils';

const VERSION = 'v1';

export default class StorageService {
  static setItem(key: string, value: any) {
    const storageKey = `${VERSION}:${key}`;
    consoleDebug('setItem', storageKey, value);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  static getItem(key: string) {
    const value = localStorage.getItem(`${VERSION}:${key}`);
    return value ? JSON.parse(value) : null;
  }

  static setUserId(userId: string) {
    StorageService.setItem('userId', userId);
  }

  static setProfileId(profileId: number) {
    StorageService.setItem('profileId', profileId);
  }

  static getProfileId() {
    return StorageService.getItem('profileId') || undefined;
  }

  static getUserId() {
    return StorageService.getItem('userId') || undefined;
  }
}
