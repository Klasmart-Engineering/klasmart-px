
import {
    ColumnLocalize,
    DuplicateColumnError,
    EmptyFileError,
    FilenameLocalize,
    MissingColumnError,
} from "./errors";
import {
    Column,
    SpreadsheetValidationError,
} from "./types";

export interface ValidationLocalization {
    emptyFileError?: FilenameLocalize;
    duplicateColumnError?: ColumnLocalize;
    missingColumnError?: ColumnLocalize;
}

const isSpreadsheetEmpty = (data: string[][]) => data.length <= 1;

const findDuplicateValues = (target: Set<string>, actual: string[]) => actual.filter((c, i, arr) => target.has(c) && arr.indexOf(c) !== i);

const findMissingValues = (target: Set<string>, actual: string[]) => {
    const actualSet = new Set(actual);
    return [ ...target ].filter(column => !actualSet.has(column));
};

export function validateFile (file: File, data: string[][], localization?: ValidationLocalization): SpreadsheetValidationError | undefined {
    if (isSpreadsheetEmpty(data)) {
        return new EmptyFileError(file.name, localization?.emptyFileError);
    }
}

export function validateData (data: string[][], localization?: ValidationLocalization, columns?: Column[]): SpreadsheetValidationError[] {
    if (!columns) {
        return [];
    }
    const actualColumns = data[0];

    const requiredColumns = new Set(columns.filter(c => c.required)
        .map(c => c.text));
    const expectedColumns = new Set(columns.map(c => c.text));

    if (!actualColumns) {
        return [ ...requiredColumns ].map(column => new MissingColumnError(column, localization?.missingColumnError));
    }
    return [
        // eslint-disable-next-line array-element-newline
        ...findDuplicateValues(expectedColumns, actualColumns)
            .map(column => new DuplicateColumnError(column, localization?.duplicateColumnError)),
        ...findMissingValues(requiredColumns, actualColumns)
            .map(column => new MissingColumnError(column, localization?.missingColumnError)),
    ];
}
