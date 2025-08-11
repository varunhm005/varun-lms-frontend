const { VITE_GRAPHQL_ENDPOINT } = import.meta.env;

export const env = {
  graphqlUrl: VITE_GRAPHQL_ENDPOINT as string,
  companyId: 1,
  isDev: import.meta.env.DEV === true,
};
