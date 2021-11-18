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
const react_1 = __importStar(require("react"));
const react_easy_crop_1 = __importDefault(require("react-easy-crop"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    cropContainer: {
        position: `relative`,
        height: 400,
    },
}));
function ImageCropper(props) {
    const [crop, setCrop] = (0, react_1.useState)({
        x: 0,
        y: 0,
    });
    const classes = useStyles();
    const { img, zoom, rotation, aspect = 4 / 3, onCropComplete, } = props;
    return (react_1.default.createElement("div", { className: classes.cropContainer },
        react_1.default.createElement(react_easy_crop_1.default, { restrictPosition: false, image: img, crop: crop, zoom: zoom, rotation: rotation, aspect: aspect, onCropChange: setCrop, onCropComplete: onCropComplete })));
}
exports.default = ImageCropper;
