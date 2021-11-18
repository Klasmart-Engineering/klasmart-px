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
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        "& .MuiStepLabel-label.MuiStepLabel-active": {
            fontWeight: 600,
        },
        "& .MuiStepLabel-labelContainer": {
            textAlign: `left`,
        },
    },
    iconContainer: {
        position: `relative`,
        width: 24,
        height: 24,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
    },
    iconLayer: {
        position: `absolute`,
    },
    stepEditIconBackground: {
        color: theme.palette.primary.main,
    },
}));
const getStepIndex = (index, steps) => steps.length === 0 ? 0 : (0, lodash_1.clamp)(index, 0, steps.length - 1);
const showCustomStepIcon = (step, editable) => {
    if (step.error)
        return false;
    if (editable)
        return true;
    return !!step.icon;
};
const StepEditIcon = () => {
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.iconContainer },
        react_1.default.createElement("svg", { className: (0, clsx_1.default)(`MuiSvgIcon-root MuiStepIcon-root`, classes.iconLayer, classes.stepEditIconBackground), focusable: "false", viewBox: "0 0 24 24", "aria-hidden": "true" },
            react_1.default.createElement("circle", { cx: "12", cy: "12", r: "12" })),
        react_1.default.createElement(icons_1.Edit, { className: classes.iconLayer, fontSize: "small", htmlColor: "white" })));
};
const CustomStepIcon = (props) => {
    const theme = (0, core_1.useTheme)();
    const { editable: showEditableIcon, icon: Icon, active, } = props;
    if (showEditableIcon)
        return react_1.default.createElement(StepEditIcon, null);
    if (!Icon)
        return null;
    return (react_1.default.createElement(Icon, { htmlColor: active ? theme.palette.secondary.main : theme.palette.grey[500] }));
};
const OptionalLabel = (props) => {
    const { step, optionalLabel } = props;
    if (step.optional)
        return (react_1.default.createElement(core_1.Typography, { variant: "caption", color: "textSecondary" }, optionalLabel ?? `Optional`));
    return null;
};
function Stepper(props) {
    const { step, steps, editable, optionalLabel, onChange, onValidate, onError, } = props;
    const classes = useStyles();
    const [stepIndex, setStepIndex] = (0, react_1.useState)(getStepIndex(step, steps));
    const handleClick = (index) => {
        setStepIndex(index);
    };
    (0, react_1.useEffect)(() => {
        setStepIndex(getStepIndex(step, steps));
    }, [step, steps]);
    (0, react_1.useEffect)(() => {
        const error = steps.map((step) => step.error).find((error) => error);
        onChange?.(stepIndex);
        onValidate?.(!error);
        onError?.(error);
    }, [stepIndex]);
    return (react_1.default.createElement(core_1.Stepper, { activeStep: stepIndex, nonLinear: editable, className: classes.root }, steps.map((step, index) => {
        const completed = index < stepIndex;
        const showEditableIcon = editable || completed;
        const customIconProps = showCustomStepIcon(step, showEditableIcon)
            ? {
                icon: (react_1.default.createElement(CustomStepIcon, { icon: step.icon, editable: showEditableIcon, active: index <= stepIndex })),
            }
            : {};
        return (react_1.default.createElement(core_1.Step, { key: `step-${index}` },
            react_1.default.createElement(core_1.StepButton, { active: stepIndex === index, completed: editable || completed, optional: react_1.default.createElement(OptionalLabel, { step: step, optionalLabel: optionalLabel }), onClick: () => { handleClick(index); }, ...customIconProps },
                react_1.default.createElement(core_1.StepLabel, { error: !!step.error }, step.label))));
    })));
}
exports.default = Stepper;
