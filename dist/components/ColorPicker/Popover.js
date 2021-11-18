"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColorSwatches_1 = __importDefault(require("../ColorPicker/ColorSwatches"));
const SaturationPicker_1 = __importDefault(require("../ColorPicker/SaturationPicker"));
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const POPOVER_WIDTH = 216;
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        width: POPOVER_WIDTH,
        overflow: `hidden`,
    },
    swatchesAddon: {
        paddingTop: 0,
    },
}));
function default_1(props) {
    const { open, anchorEl, color, colors = [], hideCanvas, onChange, onClose, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Popover, { open: open, anchorEl: anchorEl, anchorOrigin: {
            vertical: `bottom`,
            horizontal: `left`,
        }, transformOrigin: {
            vertical: `top`,
            horizontal: `left`,
        }, onClose: onClose },
        react_1.default.createElement("div", { className: classes.root },
            !hideCanvas && (react_1.default.createElement(SaturationPicker_1.default, { width: POPOVER_WIDTH, color: color, onChange: onChange })),
            colors.length > 0 && (react_1.default.createElement(ColorSwatches_1.default, { className: !hideCanvas ? classes.swatchesAddon : undefined, selectedColor: color, colors: colors, onClick: onChange })))));
}
exports.default = default_1;
