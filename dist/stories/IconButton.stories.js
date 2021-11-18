"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primary = void 0;
const IconButton_1 = __importDefault(require("../components/Button/IconButton"));
const colors_1 = require("../types/colors");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `IconButton`,
    component: IconButton_1.default,
};
const Template = (args) => react_1.default.createElement(IconButton_1.default, { ...args });
exports.Primary = Template.bind({});
exports.Primary.args = {
    color: `primary`,
    icon: icons_1.Home,
};
exports.Primary.argTypes = {
    color: {
        control: {
            type: `select`,
        },
        options: [
            ...colors_1.BASE_COLORS,
            ...colors_1.COMMON_COLORS,
            ...colors_1.THEME_COLORS,
            ...colors_1.STATUS_COLORS,
            ...colors_1.ACTION_COLORS,
        ],
    },
    icon: {
        control: null,
    },
};
