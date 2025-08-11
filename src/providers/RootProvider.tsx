import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';
import Context from '../context';
import { client } from '../graphql/client';
import AntdProvider from './AntdProvider';
import AppErrorBoundary from './AppErrorBoundary';

export default function RootProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <AppErrorBoundary>
      <AntdProvider>
        <Context>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </Context>
      </AntdProvider>
    </AppErrorBoundary>
  );
}
