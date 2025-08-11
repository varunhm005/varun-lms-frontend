import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { env } from '../configs/env';
import { auth } from '../configs/firebase';

const httpLink = createHttpLink({
  uri: env.graphqlUrl,
});

const authLink = setContext(async (_, { headers }) => {
  // Get firebase user token
  const { currentUser } = auth;
  const token = await currentUser?.getIdToken(true);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: env.isDev,
  defaultOptions: {
    mutate: {},
    query: {},
  },
});
