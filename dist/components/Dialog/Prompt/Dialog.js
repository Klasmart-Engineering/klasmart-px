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
const Button_1 = __importDefault(require("../../Button/Button"));
const TextField_1 = __importDefault(require("../../Input/TextField"));
const DialogContent_1 = __importDefault(require("../DialogContent"));
const DialogTitle_1 = __importDefault(require("../DialogTitle"));
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function ConfirmDialog(props) {
    const { variant, open, title, hideIcon, label, placeholder, inputType, okLabel, cancelLabel, content, validations, onClose, ...rest } = props;
    const classes = useStyles();
    const [value, setValue] = (0, react_1.useState)(``);
    const [isValid, setIsValid] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => setValue(``), [open]);
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isValid)
            return;
        onClose(value);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Dialog, { fullWidth: true, open: open, onClose: () => onClose(), ...rest },
            react_1.default.createElement(DialogTitle_1.default, { title: title, variant: variant, hideIcon: hideIcon }),
            content && react_1.default.createElement(DialogContent_1.default, { content: content }),
            react_1.default.createElement(core_1.DialogContent, null,
                react_1.default.createElement("form", { onSubmit: handleSubmit },
                    react_1.default.createElement(TextField_1.default, { autoFocus: true, fullWidth: true, label: label, placeholder: placeholder, type: inputType, value: value, validations: validations, onChange: setValue, onValidate: setIsValid }))),
            react_1.default.createElement(core_1.DialogActions, null,
                react_1.default.createElement(Button_1.default, { label: cancelLabel, color: "primary", onClick: () => onClose(false) }),
                react_1.default.createElement(Button_1.default, { label: okLabel, type: "submit", color: "primary", disabled: !isValid, onClick: () => onClose(value) })))));
}
exports.default = ConfirmDialog;
