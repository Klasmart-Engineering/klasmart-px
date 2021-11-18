"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const ValidationDetails_1 = __importStar(require("../components/Input/File/Spreadsheet/ValidationDetails"));
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `Spreadsheet/ValidationDetails`,
    component: ValidationDetails_1.default,
    argTypes: {
        status: {
            options: ValidationDetails_1.validationStatuses,
            control: {
                type: `select`,
            },
        },
    },
};
const Template = (args) => (react_1.default.createElement(core_1.Paper, null,
    react_1.default.createElement(ValidationDetails_1.default, { ...args })));
exports.Main = Template.bind({});
exports.Main.args = {
    errors: [],
    status: `in-progress`,
};
