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
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    content: {
        marginTop: 48,
        [theme.breakpoints.up(`sm`)]: {
            marginTop: 64,
        },
    },
}));
const Motion = react_1.default.forwardRef((props, ref) => (react_1.default.createElement(core_1.Grow, { ref: ref, style: {
        transformOrigin: `100% 0 0`,
    }, ...props })));
function FullScreenDialog(props) {
    const { open, action, title, header: Header, footer: Footer, children, onClose, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Dialog, { fullScreen: true, TransitionComponent: Motion, open: open, onClose: onClose },
        react_1.default.createElement(core_1.AppBar, null,
            react_1.default.createElement(core_1.Toolbar, null,
                react_1.default.createElement(core_1.IconButton, { edge: "start", color: "inherit", "aria-label": "close", onClick: onClose },
                    react_1.default.createElement(icons_1.Close, null)),
                react_1.default.createElement(core_1.Typography, { variant: "h6", className: classes.title }, title),
                action &&
                    react_1.default.createElement(Button_1.default, { label: action.label, variant: "contained", color: "primary", disabled: action.disabled, onClick: action.onClick }))),
        Header &&
            react_1.default.createElement("div", { className: classes.content }, Header),
        react_1.default.createElement(core_1.DialogContent, { className: !Header ? classes.content : undefined }, children),
        Footer));
}
exports.default = FullScreenDialog;
