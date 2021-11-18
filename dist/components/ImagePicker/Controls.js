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
const CropRotate_1 = __importDefault(require("@material-ui/icons/CropRotate"));
const PhotoSizeSelectLarge_1 = __importDefault(require("@material-ui/icons/PhotoSizeSelectLarge"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    controls: {
        backgroundColor: (0, core_1.lighten)(theme.palette.primary.main, 0.9),
        color: theme.palette.grey[600],
        display: `flex`,
        alignItems: `stretch`,
        justifyContent: `center`,
        flexDirection: `column`,
        padding: theme.spacing(1, 0),
    },
    control: {
        display: `flex`,
        flex: 1,
        padding: theme.spacing(0, 3),
    },
    slider: {
        color: theme.palette.primary.main,
    },
    actionButtons: {
        display: `flex`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-evenly`,
    },
    actionButtonActive: {
        color: theme.palette.primary.main,
    },
    actionButton: {
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `space-between`,
        "&:hover": {
            cursor: `pointer`,
        },
    },
}));
var EditImageActionType;
(function (EditImageActionType) {
    EditImageActionType["ROTATE"] = "Rotate";
    EditImageActionType["ZOOM"] = "Zoom";
})(EditImageActionType || (EditImageActionType = {}));
function Controls(props) {
    const { zoom, rotation, isZoomDisabled, isRotationDisabled, zoomLabel = `Zoom`, rotateLabel = `Rotate`, onZoomChange, onRotationChange, } = props;
    const [editImageAction, selectEditImageAction] = (0, react_1.useState)(isZoomDisabled ? EditImageActionType.ROTATE : EditImageActionType.ZOOM);
    const classes = useStyles();
    const zoomMarks = [
        {
            value: 0.1,
            label: `0.1x`,
        },
        {
            value: 1,
            label: `1x`,
        },
        {
            value: 2,
            label: `2x`,
        },
        {
            value: 3,
            label: `3x`,
        },
    ];
    const rotationMarks = [
        {
            value: -180,
            label: `-180°`,
        },
        {
            value: 0,
            label: `0°`,
        },
        {
            value: 180,
            label: `180°`,
        },
    ];
    const actions = [
        ...!isZoomDisabled
            ? [
                {
                    label: zoomLabel,
                    icon: react_1.default.createElement(PhotoSizeSelectLarge_1.default, null),
                    control: (react_1.default.createElement(core_1.Slider, { value: zoom, min: 0.1, max: 3, step: 0.1, marks: zoomMarks, valueLabelDisplay: "auto", valueLabelFormat: (value) => `${value}x`, "aria-labelledby": editImageAction, classes: {
                            root: classes.slider,
                        }, onChange: (e, zoom) => onZoomChange(Number(zoom)) })),
                    onClick: () => selectEditImageAction(EditImageActionType.ZOOM),
                },
            ] : [],
        ...!isRotationDisabled
            ? [
                {
                    label: rotateLabel,
                    icon: react_1.default.createElement(CropRotate_1.default, null),
                    control: (react_1.default.createElement(core_1.Slider, { value: rotation, min: -180, max: 180, step: 1, marks: rotationMarks, track: false, valueLabelDisplay: "auto", valueLabelFormat: (value) => `${value}°`, "aria-labelledby": editImageAction, classes: {
                            root: classes.slider,
                        }, onChange: (e, rotation) => onRotationChange(Number(rotation)) })),
                    onClick: () => selectEditImageAction(EditImageActionType.ROTATE),
                },
            ] : [],
    ];
    return (react_1.default.createElement("div", { className: classes.controls },
        react_1.default.createElement("div", { className: classes.control }, actions.find((action) => editImageAction === action.label)?.control),
        actions.length > 1 && (react_1.default.createElement("div", { className: classes.actionButtons }, actions.map((action) => (react_1.default.createElement("div", { key: action.label, className: (0, clsx_1.default)(classes.actionButton, {
                [classes.actionButtonActive]: editImageAction === action.label,
            }), onClick: action.onClick },
            action.icon,
            action.label)))))));
}
exports.default = Controls;
