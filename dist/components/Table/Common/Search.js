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
const IconButton_1 = __importDefault(require("../../Button/IconButton"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        height: 53,
        position: `relative`,
    },
    textField: {
        height: `100%`,
        "& .MuiInput-underline:before": {
            display: `none`,
        },
        "& .MuiInput-underline:after": {
            display: `none`,
        },
        "& .MuiInputBase-root": {
            height: `inherit`,
        },
        "& input": {
            height: `inherit`,
            padding: 0,
            margin: theme.spacing(0, 8),
        },
    },
    iconRowContainer: {
        height: `100%`,
        position: `absolute`,
        left: 0,
        top: 0,
        padding: theme.spacing(0, 0.5),
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        width: `100%`,
        pointerEvents: `none`,
        alignItems: `center`,
    },
    iconContainer: {
        padding: theme.spacing(0, 1.5),
        height: theme.spacing(3),
        color: theme.palette.grey[600],
    },
    actionIcon: {
        pointerEvents: `auto`,
    },
}));
const DEBOUNCE_DELAY = 300;
function BaseTableSearch(props) {
    const { value, localization, onChange, } = props;
    const classes = useStyles();
    const [value_, setValue] = (0, react_1.useState)(value ?? ``);
    const [debouncedValue] = (0, use_debounce_1.useDebounce)(value_, DEBOUNCE_DELAY);
    (0, react_1.useEffect)(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);
    const handleOnChange = (value) => {
        setValue(value);
    };
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(core_1.TextField, { fullWidth: true, className: classes.textField, placeholder: localization?.placeholder ?? `Search`, value: value_, onChange: (e) => handleOnChange(e.currentTarget.value) }),
        react_1.default.createElement(core_1.Box, { className: classes.iconRowContainer },
            react_1.default.createElement("div", { className: classes.iconContainer },
                react_1.default.createElement(icons_1.Search, { color: "action" })),
            value_ && (react_1.default.createElement(IconButton_1.default, { className: classes.actionIcon, icon: icons_1.Clear, tooltip: localization?.clear ?? `Clear search`, onClick: () => handleOnChange(``) })))));
}
exports.default = BaseTableSearch;
