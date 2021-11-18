"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (min, errorMessage) => (input) => {
    let inputMin;
    if (Array.isArray(input)) {
        inputMin = input.length;
    }
    else if (typeof input === `number`) {
        inputMin = input;
    }
    else {
        inputMin = String(input.trim()).length;
    }
    return inputMin >= min || (errorMessage ?? `Minimum ${min}`);
};
