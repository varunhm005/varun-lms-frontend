/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorInfo, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/error/error-fallback';

interface Props extends PropsWithChildren {}

function AppErrorBoundary(props: Props) {
  const { children } = props;
  const logError = (_error: Error, _info: ErrorInfo) => {
    // Do something with the error, e.g. log to an external API
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      {children}
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
