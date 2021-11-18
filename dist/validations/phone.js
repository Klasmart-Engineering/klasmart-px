"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneRegex = void 0;
exports.phoneRegex = /^\+[1-9]\d{6,14}$/;
exports.default = (errorMessage) => (input) => {
    if (input === `` || input === undefined || input === null)
        return true;
    return exports.phoneRegex.test(input) || (errorMessage ?? `Invalid phone number`);
};
