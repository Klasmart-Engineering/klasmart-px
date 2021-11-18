"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrors = exports.mockOnParseFile = exports.previewColumnIndex = exports.mockData = exports.mockFile = void 0;
const assert_1 = __importDefault(require("assert"));
exports.mockFile = new File([``], `mockFile.csv`);
exports.mockData = [
    [
        `City`,
        `Country`,
        `Population`,
        `Is Capital`,
    ],
    [
        `Tokyo`,
        `Japan`,
        `37977000`,
        `Yes`,
    ],
    [
        `Seoul`,
        `South Korea`,
        `21794000`,
        `Yes`,
    ],
    [
        `Barcelona`,
        `Spain`,
        `4588000`,
        `No`,
    ],
    [
        `London`,
        `England`,
        `10979000`,
        `Yes`,
    ],
];
const mockDataColumns = new Map(exports.mockData[0].map((value, i) => [value, i]));
function previewColumnIndex(name) {
    const index = mockDataColumns.get(name);
    (0, assert_1.default)(index !== undefined);
    return index + 1;
}
exports.previewColumnIndex = previewColumnIndex;
const mockOnParseFile = (file) => {
    return Promise.resolve(exports.mockData);
};
exports.mockOnParseFile = mockOnParseFile;
exports.validationErrors = {
    general: {
        message: `General error`,
    },
    column: {
        column: `City`,
        message: `Column error`,
    },
    row: {
        row: 2,
        message: `Row error`,
    },
    field: {
        row: 3,
        column: `Population`,
        message: `Field error`,
    },
};
