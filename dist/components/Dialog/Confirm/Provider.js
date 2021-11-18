"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(require("./Context"));
const Dialog_1 = __importDefault(require("./Dialog"));
const react_1 = __importStar(require("react"));
const DEFAULT_OPTIONS = {
    content: `Are you sure?`,
    title: `Confirm`,
    okLabel: `OK`,
    cancelLabel: `Cancel`,
    maxWidth: `xs`,
};
function ConfirmDialogProvider(props) {
    const { children, ...userDefaultOptions } = props;
    const [options, setOptions] = (0, react_1.useState)({
        ...DEFAULT_OPTIONS,
        ...userDefaultOptions,
    });
    const [resolves, setResolve] = (0, react_1.useState)([]);
    const confirm = (0, react_1.useCallback)((options) => {
        const dialogOptions = {
            ...DEFAULT_OPTIONS,
            ...userDefaultOptions,
            ...options,
        };
        return new Promise((resolve) => {
            setResolve([resolve]);
            setOptions(dialogOptions);
        });
    }, []);
    const handleClose = (value) => {
        resolves[0]?.(value);
        setResolve([]);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Context_1.default.Provider, { value: confirm }, children),
        react_1.default.createElement(Dialog_1.default, { open: resolves.length === 1, onClose: handleClose, ...options })));
}
exports.default = ConfirmDialogProvider;
