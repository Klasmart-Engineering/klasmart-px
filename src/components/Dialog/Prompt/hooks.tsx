import { useContext } from 'react';
import PromptContext from './Context';

export const usePrompt = () => useContext(PromptContext);
