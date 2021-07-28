import { SpreadsheetValidationError } from "./types";

interface GeneralError extends SpreadsheetValidationError {
    message: string;
}

interface ColumnError extends SpreadsheetValidationError {
    column: string;
    message: string;
}

export type ColumnLocalize = (columnName: string) => string;

export class MissingColumnError implements GeneralError {
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
