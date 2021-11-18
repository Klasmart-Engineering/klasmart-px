"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColorClick_1 = __importDefault(require("./ColorClick"));
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        padding: theme.spacing(2),
    },
}));
function ColorSwatches(props) {
    const { selectedColor, colors, className, onClick, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Grid, { container: true, spacing: 1, className: (0, clsx_1.default)(classes.root, className) }, colors.map((color, i) => (react_1.default.createElement(core_1.Grid, { key: `color-${i}`, item: true },
        react_1.default.createElement(ColorClick_1.default, { color: color, isSelected: color === selectedColor, onClick: onClick }))))));
}
exports.default = ColorSwatches;
