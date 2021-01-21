import { useContext } from 'react';
import AlertContext from './Context';

export const useAlert = () => useContext(AlertContext);
