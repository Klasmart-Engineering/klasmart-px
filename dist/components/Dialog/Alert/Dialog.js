"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("../../Button/Button"));
const DialogContent_1 = __importDefault(require("../DialogContent"));
const DialogTitle_1 = __importDefault(require("../DialogTitle"));
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function AlertDialog(props) {
    const { variant, open, title, content, hideIcon, okLabel, onClose, ...rest } = props;
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Dialog, { fullWidth: true, open: open, onClose: () => onClose(), ...rest },
            react_1.default.createElement(DialogTitle_1.default, { title: title, variant: variant, hideIcon: hideIcon }),
            react_1.default.createElement(DialogContent_1.default, { content: content }),
            react_1.default.createElement(core_1.DialogActions, null,
                react_1.default.createElement(Button_1.default, { color: "primary", label: okLabel, onClick: () => onClose(true) })))));
}
exports.default = AlertDialog;
