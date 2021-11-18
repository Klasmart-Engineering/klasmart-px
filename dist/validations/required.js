"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (errorMessage) => (input) => (input !== null && input !== undefined && String(input).trim() !== ``) || (errorMessage ?? `Required`);
