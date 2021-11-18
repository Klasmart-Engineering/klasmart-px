"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("./Button/Button"));
const notistack_1 = require("notistack");
const react_1 = __importDefault(require("react"));
function CloseButton(props) {
    const { actionKey, label, } = props;
    const { closeSnackbar } = (0, notistack_1.useSnackbar)();
    return (react_1.default.createElement(Button_1.default, { label: label ?? `Close`, color: "inherit", onClick: () => closeSnackbar(actionKey) }));
}
function BaseSnackbarProvider(props) {
    const { closeButtonLabel, children, ...others } = props;
    return (react_1.default.createElement(notistack_1.SnackbarProvider, { hideIconVariant: true, maxSnack: 3, anchorOrigin: {
            vertical: `bottom`,
            horizontal: `center`,
        }, action: (key) => (react_1.default.createElement(CloseButton, { actionKey: key, label: closeButtonLabel })), ...others }, children));
}
exports.default = BaseSnackbarProvider;
