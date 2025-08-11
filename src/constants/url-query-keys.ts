export const urlQueryKeys = {
  page: 'page',
  size: 'size',
  query: 'query',
  status: 'status',
  median: 'median',
  type: 'type',
  sort: 'sort',
  sortDirection: 'sortDirection',
  courseId: 'courseId',
};

export type UrlQueryKey = keyof typeof urlQueryKeys;
