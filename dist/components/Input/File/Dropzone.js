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
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const react_dropzone_1 = require("react-dropzone");
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        height: `100%`,
        width: `100%`,
        cursor: `pointer`,
        borderRadius: theme.spacing(0.5),
        backgroundColor: theme.palette.grey[200],
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${theme.palette.primary.main.slice(1)}' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");`,
        transition: `background-color 0.4s ease-out`,
        "&:focus": {
            outline: `none`,
            backgroundColor: theme.palette.grey[300],
        },
    },
    dragFile: {
        boxSizing: `border-box`,
        backgroundImage: `none`,
        borderWidth: 2,
        borderStyle: `solid`,
    },
    dragFileAccept: {
        backgroundColor: (0, core_1.lighten)(theme.palette.primary.light, 0.75),
        borderColor: theme.palette.primary.main,
    },
    dragFileReject: {
        backgroundColor: (0, core_1.lighten)(theme.palette.error.light, 0.75),
        borderColor: theme.palette.error.main,
    },
    dropzoneIcon: {
        fontSize: 96,
    },
}));
function Dropzone(props) {
    const { accept, maxSize = Infinity, maxFiles = Infinity, label = `Drag and drop files here, or click to select files`, typeRejectedError = `File type is not supported`, maxFilesError = `Only ${maxFiles} file${maxFiles === 1 ? `` : `s`} can be uploaded at a time`, exceedsMaxSizeError = (fileSize, maxSize) => `File size (${(fileSize / 1000).toFixed(1)} Kb) exceeds max size (${(maxSize / 1000).toFixed(1)} Kb)`, onFileAdded, onFileRejected, } = props;
    const classes = useStyles();
    const onDrop = (0, react_1.useCallback)((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                onFileAdded?.(file);
            };
            reader.readAsArrayBuffer(file);
        });
        rejectedFiles.forEach((rejection) => {
            const errorCode = rejection.errors[0].code;
            const errorMessage = rejection.errors[0].message;
            const fileSize = rejection.file.size;
            switch (errorCode) {
                case `file-invalid-type`:
                    onFileRejected?.(rejection.file, typeRejectedError);
                    break;
                case `file-too-large`:
                    onFileRejected?.(rejection.file, exceedsMaxSizeError(fileSize, maxSize));
                    break;
                case `too-many-files`:
                    onFileRejected?.(rejection.file, maxFilesError);
                    break;
                default:
                    onFileRejected?.(rejection.file, errorMessage);
            }
        });
    }, []);
    const { getInputProps, getRootProps, isDragActive, isDragReject, isDragAccept, } = (0, react_dropzone_1.useDropzone)({
        accept,
        maxSize,
        maxFiles,
        onDrop,
    });
    return (react_1.default.createElement("div", { "data-testid": "dropzone", className: (0, clsx_1.default)(classes.root, {
            [classes.dragFile]: isDragActive,
            [classes.dragFileAccept]: isDragAccept,
            [classes.dragFileReject]: isDragReject,
        }), ...getRootProps() },
        react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
            react_1.default.createElement(icons_1.CloudUpload, { color: "action", className: classes.dropzoneIcon }),
            isDragReject
                ? react_1.default.createElement(core_1.Typography, { color: "error" }, typeRejectedError)
                : react_1.default.createElement(core_1.Typography, { color: "textSecondary" }, label)),
        react_1.default.createElement("input", { ...getInputProps() })));
}
exports.default = Dropzone;
