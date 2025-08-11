/* eslint-disable react/jsx-no-constructed-context-values */
import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';
import { createErrorMessage } from '../utils/utils';

export const ConfirmContext = React.createContext<{
  confirm: typeof Modal.confirm;
  info: typeof Modal.info;
  success: typeof Modal.success;
  error: typeof Modal.error;
  warning: typeof Modal.warning;
  showErrorMessage: (err: any) => void;
}>({} as any);

function ConformContextProvider(props: PropsWithChildren) {
  const { children } = props;

  const [modal, contextHolder] = Modal.useModal();

  const showErrorMessage = (err: any) => {
    modal.error({
      content: createErrorMessage(err),
      title: 'Error',
      centered: true,
    });
  };

  return (
    <ConfirmContext.Provider
      value={{
        confirm: modal.confirm,
        info: modal.info,
        success: modal.success,
        error: modal.error,
        warning: modal.warning,
        showErrorMessage,
      }}
    >
      {children}
      {contextHolder}
    </ConfirmContext.Provider>
  );
}

export default ConformContextProvider;

export const useModalContext = () => React.useContext(ConfirmContext);
