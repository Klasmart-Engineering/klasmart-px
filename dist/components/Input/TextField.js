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
exports.inputTypes = void 0;
const LoadingIndicator_1 = __importDefault(require("./LoadingIndicator"));
const shared_1 = require("./shared");
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    disabledText: {
        color: theme.palette.action.active,
    },
}));
exports.inputTypes = [
    `text`,
    `number`,
    `password`,
    `date`,
    `datetime-local`,
    `email`,
    `time`,
    `month`,
    `tel`,
    `url`,
    `week`,
];
function TextField(props) {
    const { hideHelperText, value, validations, error: controlledError, onChange, onError, onValidate, className, type, readOnly, prependInner, appendInner, variant = `outlined`, loading, ...rest } = props;
    const classes = useStyles();
    const isControlledError = () => controlledError !== undefined;
    const getErrorState = (value, validations) => controlledError ?? (0, shared_1.getErrorText)(value, validations);
    const [value_, setValue] = (0, react_1.useState)(value ?? ``);
    const [error_, setError] = (0, react_1.useState)((0, shared_1.getErrorText)(value, validations));
    const updateValue = (value) => {
        const validationError = (0, shared_1.getErrorText)(value, validations);
        setValue(value);
        if (!isControlledError()) {
            setError(validationError);
        }
        const masterError = getErrorState(value, validations);
        onChange?.(value);
        onValidate?.(!masterError);
        onError?.(masterError);
    };
    const handleChange = (event) => {
        const newValue = type === `number` ? parseInt(event.currentTarget.value) : event.currentTarget.value;
        updateValue(newValue);
    };
    (0, react_1.useEffect)(() => {
        onChange?.(value_);
    }, []);
    (0, react_1.useEffect)(() => {
        const masterError = getErrorState(value, validations);
        onValidate?.(!masterError);
        onError?.(masterError);
    }, [controlledError]);
    (0, react_1.useEffect)(() => {
        if (value !== value_) {
            updateValue(value);
        }
    }, [value]);
    return (react_1.default.createElement(core_1.TextField, { className: className, variant: variant, value: value_, error: isControlledError() ? true : !!error_, helperText: hideHelperText ? undefined : (isControlledError() ? controlledError : error_) || ` `, type: type, InputProps: {
            className: (0, clsx_1.default)({
                [classes.disabledText]: readOnly,
            }),
            readOnly,
            startAdornment: prependInner,
            endAdornment: (react_1.default.createElement(react_1.default.Fragment, null,
                appendInner,
                react_1.default.createElement(LoadingIndicator_1.default, { loading: loading, variant: variant }))),
        }, onChange: handleChange, ...rest }));
}
exports.default = TextField;
TextField.displayName = `pxTextField`;
