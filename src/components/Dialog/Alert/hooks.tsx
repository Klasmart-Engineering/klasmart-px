import AlertContext from './Context';
import { useContext } from 'react';

export const useAlert = () => useContext(AlertContext);
