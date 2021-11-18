"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("../Button/Button"));
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function ResetColorButton(props) {
    const { color, label = `Default`, className, onClick, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(Button_1.default, { size: "small", color: color, className: className, variant: "contained", label: label, onClick: onClick }));
}
exports.default = ResetColorButton;
