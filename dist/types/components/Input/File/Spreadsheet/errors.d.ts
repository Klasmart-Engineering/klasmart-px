import { SpreadsheetValidationError } from "./types";
interface GeneralError extends SpreadsheetValidationError {
    message: string;
}
interface FileError extends SpreadsheetValidationError {
    message: string;
}
interface ColumnError extends SpreadsheetValidationError {
    column: string;
    message: string;
}
export declare type ColumnLocalize = (columnName: string) => string;
export declare type FilenameLocalize = (fileName: string) => string;
export declare class EmptyFileError implements FileError {
    message: string;
    constructor(fileName: string, localize?: FilenameLocalize);
}
export declare class MissingColumnError implements GeneralError {
    message: string;
    constructor(column: string, localize?: ColumnLocalize);
}
export declare class DuplicateColumnError implements ColumnError {
    column: string;
    message: string;
    constructor(column: string, localize?: ColumnLocalize);
}
export {};
