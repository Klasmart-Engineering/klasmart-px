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
const layout_1 = require("../../utils/layout");
const CircularProgress_1 = __importDefault(require("../Progress/CircularProgress"));
const utils_1 = require("../Progress/utils");
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    extendedText: {
        marginLeft: theme.spacing(1),
    },
}));
function Fab(props) {
    const { icon: Icon, label, color, disabled, variant, responsiveExtended, tooltip, onClick, className, } = props;
    const classes = useStyles();
    const loadingClasses = (0, utils_1.useButtonLoadingStyles)();
    const theme = (0, core_1.useTheme)();
    const breakpoint = (0, layout_1.useWidth)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const textColor_ = (color && !disabled) ? (theme.palette[color].main !== theme.palette[color].contrastText ? theme.palette[color].contrastText : `white`) : undefined;
    const variant_ = variant ?? ((responsiveExtended?.includes(breakpoint)) ? `extended` : `circular`);
    const tooltip_ = tooltip ?? (variant_ === `circular` ? (label ?? ``) : ``);
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
    return (react_1.default.createElement(core_1.Tooltip, { title: tooltip_ },
        react_1.default.createElement("span", null,
            react_1.default.createElement(core_1.Fab, { variant: variant_, disabled: disabled, className: (0, clsx_1.default)(className, {
                    [loadingClasses.buttonLoading]: loading,
                }), style: {
                    backgroundColor: (color && !disabled) ? theme.palette[color].main : undefined,
                    color: !disabled ? textColor_ : undefined,
                }, onClick: handleClick },
                variant_ === `extended`
                    ? (react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", className: (0, clsx_1.default)({
                            [loadingClasses.buttonLoadingContent]: loading,
                        }) },
                        Icon && react_1.default.createElement(Icon, null),
                        react_1.default.createElement(core_1.Typography, { noWrap: true, variant: "button", className: (0, clsx_1.default)({
                                [classes.extendedText]: Icon && label,
                            }) }, label)))
                    : Icon
                        ? (react_1.default.createElement(Icon, { className: (0, clsx_1.default)({
                                [loadingClasses.buttonLoadingContent]: loading,
                            }) }))
                        : react_1.default.createElement("span", null),
                loading && react_1.default.createElement(CircularProgress_1.default, null)))));
}
exports.default = Fab;
