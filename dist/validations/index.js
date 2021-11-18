"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = exports.phone = exports.notEquals = exports.min = exports.max = exports.letternumeric = exports.equals = exports.emailOrPhone = exports.email = exports.beforeDate = exports.alphanumeric = exports.afterDate = void 0;
const afterDate_1 = __importDefault(require("./afterDate"));
exports.afterDate = afterDate_1.default;
const alphanumeric_1 = __importDefault(require("./alphanumeric"));
exports.alphanumeric = alphanumeric_1.default;
const beforeDate_1 = __importDefault(require("./beforeDate"));
exports.beforeDate = beforeDate_1.default;
const email_1 = __importDefault(require("./email"));
exports.email = email_1.default;
const emailOrPhone_1 = __importDefault(require("./emailOrPhone"));
exports.emailOrPhone = emailOrPhone_1.default;
const equals_1 = __importDefault(require("./equals"));
exports.equals = equals_1.default;
const letternumeric_1 = __importDefault(require("./letternumeric"));
exports.letternumeric = letternumeric_1.default;
const max_1 = __importDefault(require("./max"));
exports.max = max_1.default;
const min_1 = __importDefault(require("./min"));
exports.min = min_1.default;
const notEquals_1 = __importDefault(require("./notEquals"));
exports.notEquals = notEquals_1.default;
const phone_1 = __importDefault(require("./phone"));
exports.phone = phone_1.default;
const required_1 = __importDefault(require("./required"));
exports.required = required_1.default;
const validations = {
    alphanumeric: alphanumeric_1.default,
    email: email_1.default,
    emailOrPhone: emailOrPhone_1.default,
    equals: equals_1.default,
    letternumeric: letternumeric_1.default,
    max: max_1.default,
    min: min_1.default,
    notEquals: notEquals_1.default,
    phone: phone_1.default,
    required: required_1.default,
    afterDate: afterDate_1.default,
    beforeDate: beforeDate_1.default,
};
exports.default = validations;
