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
exports.ExampleInFormLoading = exports.Primary = void 0;
const Select_1 = __importDefault(require("../components/Input/Select"));
const utils_1 = require("../utils");
const Button_stories_1 = require("./Button.stories");
const react_1 = __importStar(require("react"));
exports.default = {
    title: `Select`,
    component: Select_1.default,
};
const Template = (args) => react_1.default.createElement(Select_1.default, { ...args });
exports.Primary = Template.bind({});
exports.Primary.args = {
    fullWidth: true,
    label: `Label`,
    value: `Value`,
    disabled: false,
    loading: false,
    placeholder: `Placeholder`,
    variant: `outlined`,
    items: [
        `This`,
        `Is`,
        `A`,
        `Value`,
    ],
};
exports.Primary.argTypes = {
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
const ExampleInFormLoading = () => {
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
    const [items, setItems] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [isValid, setIsValid] = (0, react_1.useState)(true);
    const [serverError, setServerError] = (0, react_1.useState)(undefined);
    (() => {
        setTimeout(() => {
            setItems([
                `one`,
                `two`,
                `three`,
            ]);
        }, 3000);
        setTimeout(() => {
            setValue(`two`);
            setLoading(false);
        }, 5000);
    })();
    return (react_1.default.createElement("form", { style: {
            display: `grid`,
            gridGap: `10px`,
        }, onSubmit: handleSubmit },
        react_1.default.createElement(Select_1.default, { label: `Value`, value: value, items: items, loading: loading, onChange: handleChange, onValidate: setIsValid }),
        react_1.default.createElement(Button_stories_1.Primary, { label: `Submit`, type: `submit`, disabled: !isValid })));
};
exports.ExampleInFormLoading = ExampleInFormLoading;
