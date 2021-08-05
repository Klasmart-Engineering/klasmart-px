import { ColumnLocalize, FilenameLocalize } from "./errors";
import { Column, SpreadsheetValidationError } from "./types";
export interface ValidationLocalization {
    emptyFileError?: FilenameLocalize;
    duplicateColumnError?: ColumnLocalize;
    missingColumnError?: ColumnLocalize;
}
export declare function validateFile(file: File, data: string[][], localization?: ValidationLocalization): SpreadsheetValidationError | undefined;
export declare function validateData(data: string[][], localization?: ValidationLocalization, columns?: Column[]): SpreadsheetValidationError[];
