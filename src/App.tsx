import { Suspense } from 'react';
import FullScreenLoading from './components/loading/FullScreenLoading';
import AppErrorBoundary from './providers/AppErrorBoundary';
import RootProvider from './providers/RootProvider';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <AppErrorBoundary>
      <RootProvider>
        <Suspense fallback={<FullScreenLoading />}>
          <AppRouter />
        </Suspense>
      </RootProvider>
    </AppErrorBoundary>
  );
}
