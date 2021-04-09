/// <reference types="react" />
export interface SelectedFile {
    key: string;
    file: File;
    error?: string;
}
export interface Props {
    accept?: string;
    maxSize?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    typeRejectedError?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    onFileUpload: (file: File) => void;
}
export default function FileInput(props: Props): JSX.Element;
