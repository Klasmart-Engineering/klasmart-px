"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invalid = exports.Valid = void 0;
const Preview_1 = require("../components/Input/File/Spreadsheet/__mocks__/Preview");
const Preview_2 = __importDefault(require("../components/Input/File/Spreadsheet/Preview"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `Spreadsheet/Preview`,
    component: Preview_2.default,
    args: {
        errors: [],
    },
};
const Template = (args) => (react_1.default.createElement(Preview_2.default, { file: Preview_1.mockFile, onParseFile: Preview_1.mockOnParseFile, ...args }));
exports.Valid = Template.bind({});
exports.Invalid = Template.bind({});
exports.Invalid.args = {
    errors: [
        Preview_1.validationErrors.general,
        Preview_1.validationErrors.column,
        Preview_1.validationErrors.row,
        Preview_1.validationErrors.field,
    ],
};
