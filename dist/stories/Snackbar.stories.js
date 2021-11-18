"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snackbar = void 0;
const index_1 = require("../index");
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `Snackbar`,
};
const SnackbarButton = () => {
    const { enqueueSnackbar } = (0, index_1.useSnackbar)();
    return (react_1.default.createElement(index_1.Button, { color: "primary", variant: "contained", label: "Show snackbar", onClick: () => {
            enqueueSnackbar(`Woop woop`);
        } }));
};
const SnackbarContainer = (props) => {
    return (react_1.default.createElement(index_1.SnackbarProvider, { ...props },
        react_1.default.createElement(SnackbarButton, null)));
};
const Template = (args) => react_1.default.createElement(SnackbarContainer, { ...args });
exports.Snackbar = Template.bind({});
exports.Snackbar.args = {
    variant: `success`,
    closeButtonLabel: `Dismiss`,
};
exports.Snackbar.argTypes = {
    variant: {
        options: [
            `default`,
            `error`,
            `info`,
            `success`,
            `warning`,
        ],
        control: {
            type: `radio`,
        },
    },
};
