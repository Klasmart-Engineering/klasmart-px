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

export type ColumnLocalize = (columnName: string) => string;

export type FilenameLocalize = (fileName: string) => string;

export class EmptyFileError implements FileError {
    message: string;

    constructor(fileName: string, localize?: FilenameLocalize) {
        this.message = localize?.(fileName) ?? `${fileName} must contain at least one data row`;
    }
}

export class MissingColumnError implements GeneralError {
    // NB: As the column doesn't exist in the spreadsheet, this isn't a ColumnError
    // We want it to be a general error (which will be displayed in the top left corner of the preview)
    message: string

    constructor(column: string, localize?: ColumnLocalize) {
        this.message = localize?.(column) ?? `Missing column ${column}`;
    }
}

export class DuplicateColumnError implements ColumnError {
    column: string
    message: string

    constructor(column: string, localize?: ColumnLocalize) {
        this.message = localize?.(column) ?? `Duplicate column ${column}`;
        this.column = column;
    }
}
