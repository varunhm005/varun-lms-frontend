import { PropsWithChildren } from 'react';
import ConformContextProvider from './conform-context';
import FirebaseContextProvider from './firebase-user-context';
import { MessageProvider } from './message-context';

export default function Context(props: PropsWithChildren) {
  const { children } = props;
  return (
    <ConformContextProvider>
      <MessageProvider>
        <FirebaseContextProvider>{children}</FirebaseContextProvider>
      </MessageProvider>
    </ConformContextProvider>
  );
}
