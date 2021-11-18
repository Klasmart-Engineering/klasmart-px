"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const SIZE = 24;
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        width: SIZE,
        height: SIZE,
        borderRadius: theme.spacing(0.5),
        position: `relative`,
        boxShadow: `0 0 1px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)`,
        flex: `0 0 ${SIZE}px`,
    },
    selectIcon: {
        position: `absolute`,
    },
}));
function ColorClick(props) {
    const { color, isSelected, className, onClick, } = props;
    const classes = useStyles();
    const theme = (0, core_1.useTheme)();
    const iconColor = theme.palette.getContrastText(color);
    return (react_1.default.createElement(core_1.ButtonBase, { className: (0, clsx_1.default)(classes.root, className), style: {
            backgroundColor: color,
        }, onClick: () => onClick?.(color) }, isSelected && (react_1.default.createElement(icons_1.Check, { className: classes.selectIcon, style: {
            color: iconColor,
        } }))));
}
exports.default = ColorClick;
