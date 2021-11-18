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
const Dropzone_1 = __importDefault(require("./Dropzone"));
const SelectedFileRow_1 = __importDefault(require("./SelectedFileRow"));
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    dropzoneContainer: {
        height: 250,
        marginBottom: theme.spacing(3),
    },
    filesContainer: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `column`,
        flex: 1,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[100],
    },
    fileRowContainer: {
        width: `100%`,
    },
    noFilesText: {
        margin: theme.spacing(2, 0),
    },
    uploadableItem: {
        marginBottom: theme.spacing(1),
        width: `100%`,
        "&:last-child": {
            marginBottom: 0,
        },
    },
}));
const getRandomString = (length = 8, maxLength = 36) => Math.random().toString(maxLength).substring(length > maxLength ? maxLength : length);
function FileInput(props) {
    const { accept, maxFileSize, maxFiles, locales, dropzoneLabel, noItemsLabel = `No files selected`, removeButtonTooltip = `Remove file`, uploadButtonTooltip = `Upload file`, uploadError, uploadSuccessMessage = `File successfully uploaded`, typeRejectedError, exceedsMaxSizeError, onFileUpload, } = props;
    const classes = useStyles();
    const [selectedFiles, setSelectedFiles] = (0, react_1.useState)([]);
    const handleFileAdded = (file) => {
        const selectedFile = {
            key: getRandomString(),
            file,
        };
        setSelectedFiles((files) => [...files, selectedFile]);
    };
    const handleFileRejected = (file, error) => {
        const selectedFile = {
            key: getRandomString(),
            file,
            error,
        };
        setSelectedFiles((files) => [...files, selectedFile]);
    };
    const handleFileRemoved = (index) => {
        setSelectedFiles((files) => [...files.slice(0, index), ...files.slice(index + 1, files.length)]);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.dropzoneContainer },
            react_1.default.createElement(Dropzone_1.default, { accept: accept, maxSize: maxFileSize, maxFiles: maxFiles, label: dropzoneLabel, typeRejectedError: typeRejectedError, exceedsMaxSizeError: exceedsMaxSizeError, onFileRejected: handleFileRejected, onFileAdded: handleFileAdded })),
        react_1.default.createElement(core_1.Paper, { elevation: 0, className: classes.filesContainer }, selectedFiles.length > 0
            ? selectedFiles.map((selectedFile, i) => (react_1.default.createElement(core_1.Paper, { key: selectedFile.key, className: classes.fileRowContainer },
                react_1.default.createElement(SelectedFileRow_1.default, { className: classes.uploadableItem, file: selectedFile.file, error: selectedFile.error, locales: locales, removeButtonTooltip: removeButtonTooltip, uploadButtonTooltip: uploadButtonTooltip, uploadErrorMessage: uploadError, uploadSuccessMessage: uploadSuccessMessage, onClickRemove: () => handleFileRemoved(i), onClickUpload: () => onFileUpload(selectedFile.file) }))))
            : (react_1.default.createElement(core_1.Typography, { color: "textSecondary", className: classes.noFilesText }, noItemsLabel)))));
}
exports.default = FileInput;
