"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function DialogContent(props) {
    const { content } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.DialogContent, null, typeof content === `string`
        ? react_1.default.createElement(core_1.DialogContentText, null, content)
        : content));
}
exports.default = DialogContent;
