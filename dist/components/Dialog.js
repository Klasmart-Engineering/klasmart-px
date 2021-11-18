"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("./Button/Button"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    closeButton: {
        position: `absolute`,
        top: 0,
        right: 0,
        margin: theme.spacing(1),
    },
    loading: {
        opacity: 0,
        position: `absolute`,
    },
}));
function BaseDialog(props) {
    const { children, open, title, actions, width = `sm`, contentClassName, onClose, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Dialog, { fullWidth: true, open: open, scroll: "paper", "aria-labelledby": "scroll-dialog-title", maxWidth: width, onClose: onClose },
        react_1.default.createElement(core_1.Tooltip, { title: "Close dialog" },
            react_1.default.createElement(core_1.IconButton, { className: classes.closeButton, onClick: onClose },
                react_1.default.createElement(icons_1.Close, null))),
        react_1.default.createElement(core_1.DialogTitle, { id: "scroll-dialog-title" }, title),
        react_1.default.createElement(core_1.DialogContent, { dividers: true, className: contentClassName }, children),
        react_1.default.createElement(core_1.DialogActions, null,
            actions
                ?.filter((a) => a.align === `left`)
                ?.map((action, i) => (react_1.default.createElement(Button_1.default, { key: `action-${i}`, label: action.label, disabled: action.disabled, color: action.color, onClick: action.onClick }))),
            react_1.default.createElement(core_1.Box, { flex: "1" }),
            actions
                ?.filter((a) => a.align !== `left`)
                ?.map((action, i) => (react_1.default.createElement(Button_1.default, { key: `action-${i}`, label: action.label, disabled: action.disabled, color: action.color, onClick: action.onClick }))))));
}
exports.default = BaseDialog;
