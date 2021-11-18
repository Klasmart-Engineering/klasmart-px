"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphanumericRegex = void 0;
exports.alphanumericRegex = /^[^\W_]*$/;
exports.default = (errorMessage) => (input) => exports.alphanumericRegex.test(input ?? ``) || (errorMessage ?? `Only alphanumeric characters are valid`);
