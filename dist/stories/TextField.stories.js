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
exports.ExampleInForm = exports.Primary = void 0;
const TextField_1 = __importStar(require("../components/Input/TextField"));
const utils_1 = require("../utils");
const validations_1 = __importDefault(require("../validations"));
const Button_stories_1 = require("./Button.stories");
const react_1 = __importStar(require("react"));
exports.default = {
    title: `TextField`,
    component: TextField_1.default,
};
const Template = (args) => react_1.default.createElement(TextField_1.default, { ...args });
exports.Primary = Template.bind({});
exports.Primary.args = {
    fullWidth: true,
    type: `text`,
    label: `Label`,
    value: `Value`,
    disabled: false,
    placeholder: `Placeholder`,
    loading: false,
    variant: `outlined`,
};
exports.Primary.argTypes = {
    type: {
        options: TextField_1.inputTypes,
        control: {
            type: `radio`,
        },
    },
    variant: {
        options: [
            `filled`,
            `standard`,
            `outlined`,
        ],
        control: {
            type: `radio`,
        },
    },
};
const ExampleInForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await (0, utils_1.sleep)(1000);
        setIsValid(false);
        setServerError(`Computer says no`);
    };
    const handleChange = (newValue) => {
        setValue(newValue);
        if (serverError)
            setServerError(undefined);
    };
    const [value, setValue] = (0, react_1.useState)(``);
    const [isValid, setIsValid] = (0, react_1.useState)(true);
    const [serverError, setServerError] = (0, react_1.useState)(undefined);
    return (react_1.default.createElement("form", { style: {
            display: `grid`,
            gridGap: `10px`,
        }, onSubmit: handleSubmit },
        react_1.default.createElement(TextField_1.default, { label: `Country Code`, value: value, error: serverError, validations: [validations_1.default.required(), validations_1.default.max(3)], onChange: handleChange, onValidate: setIsValid }),
        react_1.default.createElement(Button_stories_1.Primary, { label: `Submit`, type: `submit`, disabled: !isValid })));
};
exports.ExampleInForm = ExampleInForm;
