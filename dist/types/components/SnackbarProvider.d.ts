/// <reference types="react" />
import { SnackbarProviderProps } from 'notistack';
interface Props extends SnackbarProviderProps {
    closeButtonText?: string;
}
export default function BaseSnackbarProvider(props: Props): JSX.Element;
export {};
