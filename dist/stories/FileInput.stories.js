"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Base_1 = __importDefault(require("../components/Input/File/Base"));
const utils_1 = require("../utils");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `FileInput`,
    component: Base_1.default,
};
const handleFileUpload = async (file) => {
    console.log(`start`, file.name);
    await (0, utils_1.sleep)(2000);
    console.log(`stop`, file.name);
};
const Template = (args) => (react_1.default.createElement(Base_1.default, { ...args, onFileUpload: handleFileUpload }));
exports.Main = Template.bind({});
exports.Main.args = {
    maxFileSize: 500_000,
    accept: `text/csv`,
};
