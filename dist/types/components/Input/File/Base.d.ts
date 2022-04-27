/// <reference types="react" />
export interface SelectedFile {
    key: string;
    file: File;
    error?: string;
}
export interface Props {
    accept?: string | string[];
    maxFileSize?: number;
    maxFiles?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadError?: string;
    uploadSuccessMessage?: string;
    typeRejectedError?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    onFileUpload: (file: File) => void;
}
export default function FileInput(props: Props): JSX.Element;
