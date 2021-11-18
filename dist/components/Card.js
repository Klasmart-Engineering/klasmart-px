"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, styles_1.makeStyles)((theme) => (0, styles_1.createStyles)({
    paperContainer: {
        borderRadius: 12,
        border: `1px solid ${theme.palette.grey[300]}`,
        height: `100%`,
        boxShadow: theme.palette.type === `dark`
            ? `0px 2px 4px -1px rgba(255, 255, 255, 0.25), 0px 4px 5px 0px rgba(255, 255, 255, 0.2), 0px 1px 10px 0px rgba(255, 255, 255, 0.16)`
            : `0px 4px 8px 0px rgba(0, 0, 0, 0.1)`,
    },
}));
function Card(props) {
    const classes = useStyles();
    const { children, className } = props;
    return react_1.default.createElement(core_1.Paper, { className: (0, clsx_1.default)(classes.paperContainer, className) }, children);
}
exports.default = Card;
