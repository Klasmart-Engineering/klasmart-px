"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimStrings = void 0;
const lodash_1 = require("lodash");
const EXCESSIVE_STRINGS_REGEX = /\s+/g;
const trimStrings = (input) => {
    if (input === undefined || input === null)
        return input;
    if (Array.isArray(input))
        return input.map((value) => (0, exports.trimStrings)(value));
    if ((0, lodash_1.isPlainObject)(input))
        return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, (0, exports.trimStrings)(value)]));
    if (typeof input !== `string`)
        return input;
    return input.trim().replace(EXCESSIVE_STRINGS_REGEX, ` `);
};
exports.trimStrings = trimStrings;
