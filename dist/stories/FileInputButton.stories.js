"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const FileInputButton_1 = __importDefault(require("../components/Button/FileInputButton"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `FileInputButton`,
    component: FileInputButton_1.default,
};
const Template = (args) => react_1.default.createElement(FileInputButton_1.default, { ...args });
exports.Primary = Template.bind({});
exports.Primary.args = {
    accept: [
        `image/jpg`,
        `image/jpeg`,
        `image/png`,
    ],
    label: `Select Image`,
    errorMessages: {
        noFileError: `No File Found`,
        fileSizeTooBigError: `The maximum file size is 2MB`,
        wrongFileTypeUploadError: `This image file must be in the correct format`,
    },
    onFileChange: (file) => {
        console.log(file);
    },
    onError: (error) => console.log(error),
};
