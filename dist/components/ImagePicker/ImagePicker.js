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
const cropImage_1 = __importDefault(require("../../utils/cropImage"));
const Dialog_1 = __importDefault(require("../Dialog"));
const Controls_1 = __importDefault(require("./Controls"));
const Cropper_1 = __importDefault(require("./Cropper"));
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    noPaddingDialog: {
        padding: `0`,
    },
}));
function ImagePicker(props) {
    const { isZoomDisabled, isRotationDisabled, imageToBeCropped, dialogTitle = `Adjust Image`, isCropperOpen, zoomLabel, rotateLabel, aspect, cancelLabel = `Cancel`, okLabel = `OK`, onCancelCrop, onImageCropComplete, onError, } = props;
    const [rotation, setRotation] = (0, react_1.useState)(0);
    const [zoom, setZoom] = (0, react_1.useState)(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = (0, react_1.useState)({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const [dialogOpen, setDialogOpen] = (0, react_1.useState)(isCropperOpen);
    const classes = useStyles();
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const getCroppedImage = (0, react_1.useCallback)(async () => {
        try {
            const croppedImages = await (0, cropImage_1.default)(imageToBeCropped, croppedAreaPixels, rotation);
            setDialogOpen(false);
            return croppedImages;
        }
        catch (e) {
            onError(e);
        }
    }, [croppedAreaPixels]);
    const handleOnImageCropComplete = async () => {
        const croppedImageStrings = await getCroppedImage();
        if (croppedImageStrings)
            return onImageCropComplete(croppedImageStrings);
    };
    const onZoomChange = (zoomChange) => {
        if (isZoomDisabled)
            return;
        setZoom(zoomChange);
    };
    const onRotationChange = (rotationChange) => {
        if (isRotationDisabled)
            return;
        setRotation(rotationChange);
    };
    (0, react_1.useEffect)(() => {
        setDialogOpen(isCropperOpen);
    }, [isCropperOpen]);
    return (react_1.default.createElement(Dialog_1.default, { open: dialogOpen, title: dialogTitle, actions: [
            {
                label: cancelLabel,
                disabled: false,
                color: `primary`,
                onClick: onCancelCrop,
            },
            {
                label: okLabel,
                disabled: false,
                color: `primary`,
                onClick: handleOnImageCropComplete,
            },
        ], contentClassName: classes.noPaddingDialog, onClose: onCancelCrop, onBackdropClick: onCancelCrop },
        react_1.default.createElement(Cropper_1.default, { img: imageToBeCropped, zoom: zoom, rotation: rotation, aspect: aspect, onCropComplete: onCropComplete }),
        (!isZoomDisabled || !isRotationDisabled) && (react_1.default.createElement(Controls_1.default, { zoom: zoom, rotation: rotation, isZoomDisabled: isZoomDisabled, isRotationDisabled: isRotationDisabled, zoomLabel: zoomLabel, rotateLabel: rotateLabel, onZoomChange: onZoomChange, onRotationChange: onRotationChange }))));
}
exports.default = ImagePicker;
