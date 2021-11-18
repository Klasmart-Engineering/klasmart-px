"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failingValidation = exports.passingValidation = exports.VALIDATION_FAILED_MESSAGE = void 0;
exports.VALIDATION_FAILED_MESSAGE = `Validation Failed`;
const passingValidation = (input) => true;
exports.passingValidation = passingValidation;
const failingValidation = (input) => exports.VALIDATION_FAILED_MESSAGE;
exports.failingValidation = failingValidation;
