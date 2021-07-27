/// <reference types="react" />
import { SpreadsheetValidationError } from "./errors";
import { Column } from "./types";
import { ValidationLocalization } from "./validate";
export { Column, SpreadsheetValidationError, };
export interface Props {
    accept?: string | string[];
    maxFileSize?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadError?: string;
    uploadSuccessMessage?: string;
    typeRejectedError?: string;
    maxFilesError?: string;
    spreadsheetInvalidData?: string;
    allValidationsPassedMessage?: string;
    validationInProgressMessage?: string;
    previewNotAvailableMessage?: string;
    isDryRunEnabled?: boolean;
    columns?: Column[];
    validationLocalization?: ValidationLocalization;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    numValidationsFailedMessage?: (num: number) => string;
    onFileUpload: (file: File, isDryRun: boolean) => Promise<void>;
    onFileUploadError?: (error: any, isDryRun: boolean) => SpreadsheetValidationError[];
}
export default function (props: Props): JSX.Element;
