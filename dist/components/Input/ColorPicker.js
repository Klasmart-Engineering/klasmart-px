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
const ColorClick_1 = __importDefault(require("../ColorPicker/ColorClick"));
const DefaultButton_1 = __importDefault(require("../ColorPicker/DefaultButton"));
const Popover_1 = __importDefault(require("../ColorPicker/Popover"));
const TextField_1 = __importDefault(require("./TextField"));
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const FALLBACK_COLOR = `#fff`;
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    filledTextFieldColorClick: {
        marginTop: theme.spacing(2),
    },
    standardTextFieldDefaultButton: {
        marginBottom: 2,
    },
}));
function default_1(props) {
    const { defaultColor, value: color, colors = [], label = `Color`, defaultButtonLabel, hideCanvas, variant, fullWidth, hideHelperText, onChange, onValidate, onError, } = props;
    const [color_, setColor] = (0, react_1.useState)(color);
    const [anchorEl, setAnchorEl] = react_1.default.useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleResetClick = () => {
        setColor(``);
    };
    (0, react_1.useEffect)(() => {
        setColor(color);
    }, [color]);
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Box, { onClick: handleClick },
            react_1.default.createElement(TextField_1.default, { readOnly: true, hideHelperText: hideHelperText, fullWidth: fullWidth, variant: variant, label: label, value: color_, prependInner: (react_1.default.createElement(core_1.Box, { marginRight: 1 },
                    react_1.default.createElement(ColorClick_1.default, { color: color_ || defaultColor || FALLBACK_COLOR, className: variant === `filled` ? classes.filledTextFieldColorClick : undefined }))), appendInner: (defaultColor && color_ && color_ !== defaultColor) && (react_1.default.createElement(DefaultButton_1.default, { label: defaultButtonLabel, color: defaultColor, className: classes.standardTextFieldDefaultButton, onClick: handleResetClick })), onChange: onChange, onValidate: onValidate, onError: onError })),
        react_1.default.createElement(Popover_1.default, { open: open, anchorEl: anchorEl, color: color_ || defaultColor || FALLBACK_COLOR, hideCanvas: hideCanvas, colors: colors, onChange: setColor, onClose: handleClose })));
}
exports.default = default_1;
