import { useContext } from 'react';
import { ConfirmContext } from './conform-context';
import { MessageContext } from './message-context';

export const useMessage = () => useContext(MessageContext);
export const useConfirm = () => useContext(ConfirmContext);
