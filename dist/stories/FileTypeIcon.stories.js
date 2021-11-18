"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const TypeIcon_1 = __importDefault(require("../components/File/TypeIcon"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `FileIcon`,
    component: TypeIcon_1.default,
};
const Template = (args) => react_1.default.createElement(TypeIcon_1.default, { ...args });
exports.Type = Template.bind({});
exports.Type.args = {
    fileType: `png`,
};
exports.Type.argTypes = {};
