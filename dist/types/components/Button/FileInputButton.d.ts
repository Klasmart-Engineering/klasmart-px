/// <reference types="react" />
import { Props as ButtonProps } from './Button';
interface ErrorMessages {
    noFileError: string;
    fileSizeTooBigError: string;
    wrongFileTypeUploadError: string;
}
export interface Props extends ButtonProps {
    accept?: string | string[];
    errorMessages?: ErrorMessages;
    fileSizeLimitInKB?: number;
    onFileChange: (file: File) => void;
    onError?: (error: string) => void;
}
export default function FileInputButton(props: Props): JSX.Element;
export {};
