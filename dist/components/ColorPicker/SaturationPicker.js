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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const react_color_1 = require("react-color");
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function SaturationPicker(props) {
    const { color, width, onChange, } = props;
    const classes = useStyles();
    const [color_, setColor] = (0, react_1.useState)(color);
    (0, react_1.useEffect)(() => {
        setColor(color);
    }, [color]);
    return (react_1.default.createElement(react_color_1.ChromePicker, { disableAlpha: true, color: color_, styles: {
            disableAlpha: {
                color: {
                    width: 0,
                },
            },
            default: {
                swatch: {
                    display: `none`,
                },
                picker: {
                    width,
                    borderRadius: 0,
                    boxShadow: `none`,
                },
            },
        }, onChange: (colorResult) => setColor(colorResult.hex), onChangeComplete: (colorResult) => onChange(colorResult.hex) }));
}
exports.default = SaturationPicker;
