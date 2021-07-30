import { ColumnLocalize } from "./errors";
import { Column, SpreadsheetValidationError } from "./types";
export interface ValidationLocalization {
    emptyFileError?: string;
    duplicateColumnError?: ColumnLocalize;
    missingColumnError?: ColumnLocalize;
}
export declare function validateFile(data: string[][], localization?: ValidationLocalization): string;
export declare function validateData(data: string[][], localization?: ValidationLocalization, columns?: Column[]): SpreadsheetValidationError[];
