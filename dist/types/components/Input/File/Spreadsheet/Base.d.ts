/// <reference types="react" />
export declare type AcceptSpreadsheetTypes = ``;
export interface SpreadsheetValidtionError {
    row?: number;
    column?: string;
    message: string;
}
export interface Props {
    accept?: string | string[];
    maxSize?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadError?: string;
    uploadSuccessMessage?: string;
    typeRejectedError?: string;
    spreadsheetInvalidData?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    onFileUpload: (file: File) => Promise<void>;
    onFileUploadError?: (error: any) => SpreadsheetValidtionError[];
}
export default function (props: Props): JSX.Element;
