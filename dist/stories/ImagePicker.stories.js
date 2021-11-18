"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const ImagePicker_1 = __importDefault(require("../components/ImagePicker/ImagePicker"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `ImagePicker`,
    component: ImagePicker_1.default,
};
const Template = (args) => react_1.default.createElement(ImagePicker_1.default, { ...args });
exports.Primary = Template.bind({});
exports.Primary.args = {
    isZoomDisabled: false,
    isRotationDisabled: false,
    imageToBeCropped: `https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000`,
    dialogTitle: `Crop it, baby`,
    isCropperOpen: true,
    zoomLabel: `Zoom`,
    rotateLabel: `Rotate`,
    cancelLabel: `Cancel`,
    okLabel: `OK`,
    aspect: 4 / 3,
    onImageCropComplete: ((image) => {
        console.log(image.file);
    }),
};
