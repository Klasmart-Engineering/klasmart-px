"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = exports.validateFile = void 0;
const errors_1 = require("./errors");
const isSpreadsheetEmpty = (data) => data.length <= 1;
const findDuplicateValues = (target, actual) => actual.filter((c, i, arr) => target.has(c) && arr.indexOf(c) !== i);
const findMissingValues = (target, actual) => {
    const actualSet = new Set(actual);
    return [...target].filter(column => !actualSet.has(column));
};
function validateFile(file, data, localization) {
    if (isSpreadsheetEmpty(data)) {
        return new errors_1.EmptyFileError(file.name, localization?.emptyFileError);
    }
}
exports.validateFile = validateFile;
function validateData(data, localization, columns) {
    if (!columns) {
        return [];
    }
    const actualColumns = data[0];
    const requiredColumns = new Set(columns.filter(c => c.required).map(c => c.text));
    const expectedColumns = new Set(columns.map(c => c.text));
    if (!actualColumns) {
        return [...requiredColumns].map(column => new errors_1.MissingColumnError(column, localization?.missingColumnError));
    }
    return [
        ...findDuplicateValues(expectedColumns, actualColumns).map(column => new errors_1.DuplicateColumnError(column, localization?.duplicateColumnError)),
        ...findMissingValues(requiredColumns, actualColumns).map(column => new errors_1.MissingColumnError(column, localization?.missingColumnError)),
    ];
}
exports.validateData = validateData;
