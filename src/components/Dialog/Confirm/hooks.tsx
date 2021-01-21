import { useContext } from 'react';
import ConfirmContext from './Context';

export const useConfirm = () => useContext(ConfirmContext);
