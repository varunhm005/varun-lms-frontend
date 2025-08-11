/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
// Create a context file in src/context/message-context.tsx:

import { message } from 'antd';
import { TypeOpen } from 'antd/es/message/interface';
import React, { PropsWithChildren, createContext, useMemo } from 'react';

export const MessageContext = createContext<{
  success: TypeOpen;
  error: TypeOpen;
  info: TypeOpen;
  warning: TypeOpen;
  loading: TypeOpen;
  destroy: (key?: React.Key | undefined) => void;
}>({} as any);

export function MessageProvider({ children }: PropsWithChildren) {
  const [messageApi, contextHolder] = message.useMessage();

  const _message = useMemo(() => {
    return {
      success: messageApi.success,
      error: messageApi.error,
      info: messageApi.info,
      warning: messageApi.warning,
      loading: messageApi.loading,
      destroy: messageApi.destroy,
    };
  }, [messageApi]);

  return (
    <MessageContext.Provider value={_message}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}

export const useMessage = () => React.useContext(MessageContext);
