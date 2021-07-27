import { ColumnLocalize, SpreadsheetValidationError } from "./errors";
import { Column } from "./types";
export interface ValidationLocalization {
    emptyFileError?: string;
    duplicateColumnError?: ColumnLocalize;
    missingColumnError?: ColumnLocalize;
}
export declare function validateFile(data: string[][], localization?: ValidationLocalization): string;
export declare function validateData(data: string[][], localization?: ValidationLocalization, columns?: Column[]): SpreadsheetValidationError[];
