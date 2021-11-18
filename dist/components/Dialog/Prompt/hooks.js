"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrompt = void 0;
const Context_1 = __importDefault(require("./Context"));
const react_1 = require("react");
const usePrompt = () => (0, react_1.useContext)(Context_1.default);
exports.usePrompt = usePrompt;
