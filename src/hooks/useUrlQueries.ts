import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useUrlQueries<T>() {
  const query = useLocation();

  const { search } = query;

  return React.useMemo(() => {
    const queries = new URLSearchParams(search);
    const result: { [key: string]: string } = {};
    queries.forEach((value, key) => {
      result[key] = value ?? '';
    });

    return result as T;
  }, [search]);
}

export const useParsedUrlQuery = <T>() => {
  const query = useLocation();

  const { search } = query;

  return React.useMemo(() => {
    const queries = new URLSearchParams(search);
    const result: { [key: string]: string } = {};
    queries.forEach((value, key) => {
      try {
        result[key] = value ? JSON.parse(value) : '';
      } catch (error) {
        result[key] = '';
      }
    });

    return result as T;
  }, [search]);
};

// Update query params
export const useUrlQueryParam = <T>() => {
  const navigate = useNavigate();

  const parsedQueries = useParsedUrlQuery<T>();

  const setQueryParams = (params: Partial<T>) => {
    // Update query params with existing params
    const query = new URLSearchParams(window.location.search);

    // Make object from query params
    let queryParams: { [key: string]: string } = {};

    query.forEach((value, key) => {
      queryParams[key] = JSON.parse(value);
    });

    // Update query params with new params
    queryParams = { ...queryParams, ...params };

    // Create url query with query params object
    const newUrlQuery = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      newUrlQuery.set(key, JSON.stringify(value));
    });

    navigate(`?${newUrlQuery.toString()}`, { replace: true });
  };

  return { queryParams: parsedQueries, setQueryParams };
};

export const useUrlState = <T>(key: string, defaultValue: T) => {
  const query = useLocation();

  const { search } = query;

  const navigate = useNavigate();

  const [value, setValue] = React.useState<T>(() => {
    const queries = new URLSearchParams(search);
    const result = queries.get(key);
    if (result) {
      return JSON.parse(result);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    const queries = new URLSearchParams(search);
    const result = queries.get(key);
    if (result) {
      setValue(JSON.parse(result));
    }
  }, [search, key]);

  const updateValue = React.useCallback(
    (newValue: T) => {
      const queries = new URLSearchParams(search);
      queries.set(key, JSON.stringify(newValue));
      navigate(`?${queries.toString()}`, { replace: true });
    },
    [key, search, navigate]
  );

  return [value, updateValue] as const;
};
