"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimStrings = exports.stringToColor = exports.sleep = exports.nameToInitials = exports.getContrastColor = void 0;
const getContrastColor_1 = __importDefault(require("./getContrastColor"));
exports.getContrastColor = getContrastColor_1.default;
const nameToInitials_1 = __importDefault(require("./nameToInitials"));
exports.nameToInitials = nameToInitials_1.default;
const objectCleaner_1 = require("./objectCleaner");
Object.defineProperty(exports, "trimStrings", { enumerable: true, get: function () { return objectCleaner_1.trimStrings; } });
const sleep_1 = __importDefault(require("./sleep"));
exports.sleep = sleep_1.default;
const stringToColor_1 = __importDefault(require("./stringToColor"));
exports.stringToColor = stringToColor_1.default;
const utils = {
    getContrastColor: getContrastColor_1.default,
    nameToInitials: nameToInitials_1.default,
    stringToColor: stringToColor_1.default,
    sleep: sleep_1.default,
    trimStrings: objectCleaner_1.trimStrings,
};
exports.default = utils;
