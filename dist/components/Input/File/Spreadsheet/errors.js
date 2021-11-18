"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateColumnError = exports.MissingColumnError = exports.EmptyFileError = void 0;
class EmptyFileError {
    message;
    constructor(fileName, localize) {
        this.message = localize?.(fileName) ?? `${fileName} must contain at least one data row`;
    }
}
exports.EmptyFileError = EmptyFileError;
class MissingColumnError {
    message;
    constructor(column, localize) {
        this.message = localize?.(column) ?? `Missing column ${column}`;
    }
}
exports.MissingColumnError = MissingColumnError;
class DuplicateColumnError {
    column;
    message;
    constructor(column, localize) {
        this.message = localize?.(column) ?? `Duplicate column ${column}`;
        this.column = column;
    }
}
exports.DuplicateColumnError = DuplicateColumnError;
