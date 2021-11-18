"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorText = void 0;
const getErrorText = (value, validations) => validations?.map((validation) => validation(value)).find((result) => result !== true);
exports.getErrorText = getErrorText;
