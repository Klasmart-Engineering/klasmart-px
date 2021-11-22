/// <reference types="react" />
import { SpreadsheetValidationError } from './types';
declare type ValidationFailedCallback = (num: number) => string;
export declare const validationStatuses: readonly ["in-progress", "passed", "failed"];
export declare type ValidationStatus = typeof validationStatuses[number];
export interface Props {
    errors: SpreadsheetValidationError[];
    status: ValidationStatus;
    allValidationsPassedMessage?: string;
    validationInProgressMessage?: string;
    numValidationsFailedMessage?: ValidationFailedCallback;
}
export default function ValidationDetails(props: Props): JSX.Element;
export {};
