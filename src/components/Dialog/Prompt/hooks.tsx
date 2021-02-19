import PromptContext from './Context';
import { useContext } from 'react';

export const usePrompt = () => useContext(PromptContext);
