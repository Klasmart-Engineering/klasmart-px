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
const hooks_1 = require("../../hooks");
const CircularProgress_1 = __importDefault(require("../Progress/CircularProgress"));
const utils_1 = require("../Progress/utils");
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    tooltip: {
        display: `flex`,
    },
}));
const buildStyling = (color, theme) => {
    switch (color) {
        case `action`: return {
            style: {
                color: theme.palette.action.active,
            },
        };
        case `disabled`: return {
            style: {
                color: theme.palette.action.disabled,
            },
        };
        case `white`: return {
            style: {
                color: theme.palette.common.white,
            },
        };
        case `black`: return {
            style: {
                color: theme.palette.common.black,
            },
        };
        case `info`: return {
            style: {
                color: theme.palette.info.main,
            },
        };
        case `success`: return {
            style: {
                color: theme.palette.success.main,
            },
        };
        case `warning`: return {
            style: {
                color: theme.palette.warning.main,
            },
        };
        case `error`: return {
            style: {
                color: theme.palette.error.main,
            },
        };
        default: return {
            color,
        };
    }
};
function IconButton(props) {
    const { icon: Icon, iconSize, tooltip, disabled, color, onClick, className, size, "data-testid": dataTestId, } = props;
    const classes = useStyles();
    const loadingClasses = (0, utils_1.useButtonLoadingStyles)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const theme = (0, core_1.useTheme)();
    const isMounted = (0, hooks_1.useIsMounted)();
    const styling = buildStyling(color, theme);
    const handleClick = async (event) => {
        setLoading(true);
        let error;
        try {
            await onClick?.(event);
        }
        catch (err) {
            error = err;
        }
        if (isMounted()) {
            setLoading(false);
        }
        if (error)
            throw error;
    };
    return (react_1.default.createElement(core_1.Tooltip, { title: tooltip ?? `` },
        react_1.default.createElement("span", { className: classes.tooltip },
            react_1.default.createElement(core_1.IconButton, { disabled: disabled, className: (0, clsx_1.default)(className, {
                    [loadingClasses.buttonLoading]: loading,
                }), size: size, "data-testid": dataTestId, onClick: handleClick, ...styling },
                react_1.default.createElement(Icon, { fontSize: iconSize, className: (0, clsx_1.default)({
                        [loadingClasses.buttonLoadingContent]: loading,
                    }) }),
                loading && react_1.default.createElement(CircularProgress_1.default, null)))));
}
exports.default = IconButton;
