"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.letternumericRegex = void 0;
exports.letternumericRegex = /^[\p{L}\d .'&/,-]*$/gu;
exports.default = (errorMessage) => (input) => {
    return exports.letternumericRegex.test(input ?? ``)
        || (typeof input === `string`
            ? exports.letternumericRegex.test(input.normalize(`NFD`)) || exports.letternumericRegex.test(input.normalize(`NFC`))
            : false)
        || (errorMessage ?? `Only alphanumeric characters are valid`);
};
