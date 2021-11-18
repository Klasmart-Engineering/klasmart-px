"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterButton = void 0;
const CounterIconButton_1 = __importDefault(require("../components/File/CounterIconButton"));
const utils_1 = require("../utils");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `FileIcon`,
    component: CounterIconButton_1.default,
};
const Template = (args) => react_1.default.createElement(CounterIconButton_1.default, { ...args });
exports.CounterButton = Template.bind({});
const handleDownloadImage = async () => {
    await (0, utils_1.sleep)(2000);
    console.log(`nice`);
};
exports.CounterButton.args = {
    hideDownloadActions: false,
    menuTitle: `Submissions`,
    files: [
        {
            name: `nice.txt`,
            onDownloadClick: handleDownloadImage,
        },
        {
            name: `list.pdf`,
            onDownloadClick: handleDownloadImage,
        },
        {
            name: `woopwoop this is a long text lets go.png`,
            onDownloadClick: handleDownloadImage,
        },
    ],
};
exports.CounterButton.argTypes = {};
