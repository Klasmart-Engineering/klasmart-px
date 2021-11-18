"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const ColorPicker_1 = __importDefault(require("../components/Input/ColorPicker"));
const colors_1 = require("@material-ui/core/colors");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `ColorPicker`,
    component: ColorPicker_1.default,
};
const Template = (args) => react_1.default.createElement(ColorPicker_1.default, { ...args });
exports.Primary = Template.bind({});
exports.Primary.args = {
    value: `#ff0000`,
    defaultColor: `#ff0000`,
    variant: `outlined`,
    hideCanvas: false,
    colors: [
        colors_1.red[500],
        colors_1.pink[500],
        colors_1.purple[500],
        colors_1.deepPurple[500],
        colors_1.indigo[500],
        colors_1.blue[500],
        colors_1.lightBlue[500],
        colors_1.cyan[500],
        colors_1.teal[500],
        colors_1.green[500],
        colors_1.lightGreen[500],
        colors_1.lime[500],
        colors_1.yellow[500],
        colors_1.amber[500],
        colors_1.orange[500],
        colors_1.deepOrange[500],
        colors_1.brown[500],
        colors_1.grey[500],
        colors_1.common.white,
        colors_1.common.black,
    ],
};
exports.Primary.argTypes = {
    value: {
        control: {
            type: `color`,
        },
    },
    variant: {
        options: [
            `filled`,
            `standard`,
            `outlined`,
        ],
        control: {
            type: `radio`,
        },
    },
};
