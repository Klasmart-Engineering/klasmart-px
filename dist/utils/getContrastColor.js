"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const defaultContrastColorOptions = {
    contrastThreshold: 11,
    darkColor: `#000`,
    lightColor: `#fff`,
};
function getContrastColor(background, options) {
    const contrastColorOptions = {
        ...defaultContrastColorOptions,
        ...options,
    };
    return (0, styles_1.getContrastRatio)(background, contrastColorOptions.darkColor) >= contrastColorOptions.contrastThreshold
        ? contrastColorOptions.darkColor
        : contrastColorOptions.lightColor;
}
exports.default = getContrastColor;
