"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (max, errorMessage) => (input) => {
    let inputMax;
    if (Array.isArray(input)) {
        inputMax = input.length;
    }
    else if (typeof input === `number`) {
        inputMax = input;
    }
    else {
        inputMax = String(input.trim()).length;
    }
    return inputMax <= max || (errorMessage ?? `Maximum ${max}`);
};
