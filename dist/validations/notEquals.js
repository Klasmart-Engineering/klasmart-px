"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.default = (value, errorMessage) => (input) => !(0, lodash_1.isEqual)(input, value) || (errorMessage ?? `This is an invalid value`);
