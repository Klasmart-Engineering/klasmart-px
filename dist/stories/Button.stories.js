"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondaryText = exports.Text = exports.SecondaryOutlined = exports.Outlined = exports.Secondary = exports.Primary = void 0;
const Button_1 = __importDefault(require("../components/Button/Button"));
const getContrastColor_1 = __importDefault(require("../utils/getContrastColor"));
const styles_1 = require("@material-ui/core/styles");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `Button`,
    component: Button_1.default,
};
const organizationColor = `#FFE`;
const secondaryOrganizationColor = `#F00`;
const palette = {
    primary: {
        contrastText: (0, getContrastColor_1.default)(organizationColor, {
            lightColor: organizationColor,
        }),
        main: organizationColor,
        light: (0, styles_1.lighten)(organizationColor, 0.9),
        dark: (0, styles_1.darken)(organizationColor, 0.75),
    },
    secondary: {
        contrastText: (0, getContrastColor_1.default)(secondaryOrganizationColor, {
            lightColor: secondaryOrganizationColor,
        }),
        main: secondaryOrganizationColor,
        light: (0, styles_1.lighten)(secondaryOrganizationColor, 0.9),
        dark: (0, styles_1.darken)(secondaryOrganizationColor, 0.75),
    },
};
const theme = (0, styles_1.createTheme)({
    palette,
});
const Template = (args) => react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
    react_1.default.createElement(Button_1.default, { ...args }));
exports.Primary = Template.bind({});
exports.Primary.args = {
    rounded: true,
    color: `primary`,
    variant: `contained`,
    label: `Button`,
};
exports.Secondary = Template.bind({});
exports.Secondary.args = {
    rounded: true,
    color: `secondary`,
    variant: `contained`,
    label: `Button`,
};
exports.Outlined = Template.bind({});
exports.Outlined.args = {
    rounded: true,
    color: `primary`,
    variant: `outlined`,
    label: `Button`,
};
exports.SecondaryOutlined = Template.bind({});
exports.SecondaryOutlined.args = {
    rounded: true,
    color: `secondary`,
    variant: `outlined`,
    label: `Button`,
};
exports.Text = Template.bind({});
exports.Text.args = {
    rounded: true,
    color: `primary`,
    variant: `text`,
    label: `Button`,
};
exports.SecondaryText = Template.bind({});
exports.SecondaryText.args = {
    rounded: true,
    color: `secondary`,
    variant: `text`,
    label: `Button`,
};
