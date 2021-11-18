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
const CircularProgress_1 = __importDefault(require("../Progress/CircularProgress"));
const utils_1 = require("../Progress/utils");
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    extendedText: {
        marginLeft: theme.spacing(1),
    },
    rounded: {
        borderRadius: 24,
    },
}));
const getTextColor = (color, variant, theme) => {
    if (variant === `contained`) {
        if (!color || !COLORS.includes(color))
            return `white`;
        return theme.palette[color].main !== theme.palette[color].contrastText
            ? theme.palette[color].contrastText
            : `white`;
    }
    if (variant === `outlined`) {
        if (!color)
            return `black`;
        if (!COLORS.includes(color))
            return color;
        return theme.palette[color].contrastText;
    }
    if (!color)
        return `black`;
    if (COLORS.includes(color))
        return theme.palette[color].contrastText;
    return color;
};
const getBackgroundColor = (color, variant, theme) => {
    if (!color || variant !== `contained`)
        return;
    if (COLORS.includes(color))
        return theme.palette[color].main;
    return color;
};
const getBorderColor = (color, variant, theme) => {
    if (!color || variant !== `outlined`)
        return;
    if (COLORS.includes(color))
        return theme.palette[color].main;
    return color;
};
const COLORS = [
    `primary`,
    `secondary`,
    `error`,
    `warning`,
    `info`,
    `success`,
];
function Button(props) {
    const { className, label, type, variant, color, disabled, tooltip, onClick, rounded, icon: Icon, ...rest } = props;
    const classes = useStyles();
    const loadingClasses = (0, utils_1.useButtonLoadingStyles)();
    const theme = (0, core_1.useTheme)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const textColor_ = getTextColor(color, variant, theme);
    const backgroundColor_ = getBackgroundColor(color, variant, theme);
    const borderColor_ = getBorderColor(color, variant, theme);
    color && COLORS.includes(color) ? theme.palette[color].main : color;
    const handleClick = async (event) => {
        setLoading(true);
        let error;
        try {
            await onClick?.(event);
        }
        catch (err) {
            error = err;
        }
        setLoading(false);
        if (error)
            throw error;
    };
    return (react_1.default.createElement(core_1.Tooltip, { title: tooltip ?? `` },
        react_1.default.createElement("span", null,
            react_1.default.createElement(core_1.Button, { variant: variant, type: type, style: {
                    color: !disabled ? textColor_ : undefined,
                    backgroundColor: !disabled ? backgroundColor_ : undefined,
                    borderColor: !disabled ? borderColor_ : undefined,
                }, disabled: disabled, className: (0, clsx_1.default)(className, {
                    [loadingClasses.buttonLoading]: loading,
                    [classes.rounded]: rounded,
                }), onClick: handleClick, ...rest },
                react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", className: (0, clsx_1.default)({
                        [loadingClasses.buttonLoadingContent]: loading,
                    }) },
                    Icon && react_1.default.createElement(Icon, null),
                    react_1.default.createElement(core_1.Typography, { noWrap: true, variant: "inherit", className: (0, clsx_1.default)({
                            [classes.extendedText]: Icon && label,
                        }) }, label)),
                loading && react_1.default.createElement(CircularProgress_1.default, null)))));
}
exports.default = Button;
