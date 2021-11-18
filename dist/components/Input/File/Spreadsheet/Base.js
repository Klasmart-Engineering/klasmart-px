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
const CircularProgress_1 = __importDefault(require("../../../Progress/CircularProgress"));
const Dropzone_1 = __importDefault(require("../Dropzone"));
const SelectedFileRow_1 = __importDefault(require("../SelectedFileRow"));
const Preview_1 = __importDefault(require("./Preview"));
const validate_1 = require("./validate");
const ValidationDetails_1 = __importDefault(require("./ValidationDetails"));
const core_1 = require("@material-ui/core");
const papaparse_1 = __importDefault(require("papaparse"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        height: `100%`,
        width: `100%`,
    },
    dropzoneContainer: {
        height: 400,
        width: `100%`,
    },
    selectedFileContainer: {
        width: `100%`,
        margin: theme.spacing(2),
    },
    previewContainer: {
        display: `flex`,
        width: `100%`,
        height: `100%`,
        position: `relative`,
    },
    uploadInProgress: {
        backgroundColor: (0, core_1.alpha)(theme.palette.grey[500], 0.65),
        position: `absolute`,
        left: 0,
        top: 0,
        width: `100%`,
        height: `100%`,
    },
    previewFile: {
        flex: 1,
    },
    previewNotAvailble: {
        flex: 1,
        width: `100%`,
        backgroundColor: theme.palette.grey[200],
    },
}));
function default_1(props) {
    const { accept = `text/csv`, maxFileSize, locales, dropzoneLabel, removeButtonTooltip, uploadButtonTooltip, uploadError, uploadSuccessMessage, spreadsheetInvalidData = `Spreadsheet has invalid data`, allValidationsPassedMessage, validationInProgressMessage, typeRejectedError, maxFilesError, previewNotAvailableMessage = `Preview is not available`, isDryRunEnabled, numValidationsFailedMessage, columns, validationLocalization, exceedsMaxSizeError, onFileUpload, onFileUploadError, } = props;
    const classes = useStyles();
    const [file, setFile] = (0, react_1.useState)();
    const [fileError, setFileError] = (0, react_1.useState)(``);
    const [dryRunError, setDryRunError] = (0, react_1.useState)(``);
    const [errors, setErrors] = (0, react_1.useState)([]);
    const [status, setStatus] = (0, react_1.useState)(`pending`);
    const handleClickUpload = async () => {
        if (!file)
            return;
        setStatus(`uploading`);
        try {
            await onFileUpload(file, false);
        }
        catch (err) {
            const errors = onFileUploadError?.(err, false) ?? [];
            setErrors(errors);
            setStatus(`uploaded`);
            throw err;
        }
        setStatus(`uploaded`);
    };
    const dryRun = async () => {
        if (!file)
            return;
        setStatus(`validating`);
        try {
            await onFileUpload(file, true);
        }
        catch (err) {
            const errors = onFileUploadError?.(err, true) ?? [];
            setErrors(errors);
            setDryRunError(err?.message);
        }
        setStatus(`validated`);
    };
    const handleClickRemove = () => {
        setFile(undefined);
        setStatus(`pending`);
    };
    const handleFileRejected = (file, error) => {
        setFileError(error);
        setFile(file);
    };
    (0, react_1.useEffect)(() => {
        if (file)
            return;
        setFileError(``);
        setDryRunError(``);
        setErrors([]);
    }, [file]);
    (0, react_1.useEffect)(() => {
        if (isDryRunEnabled && status === `parsed` && !(fileError || errors.length)) {
            dryRun();
        }
    }, [
        isDryRunEnabled,
        status,
        fileError,
        errors,
    ]);
    const handleParsingCsv = (file) => new Promise((resolve, reject) => {
        setStatus(`parsing`);
        papaparse_1.default.parse(file, {
            complete: (results) => {
                const { data } = results;
                const fileErr = (0, validate_1.validateFile)(file, data, validationLocalization);
                if (fileErr) {
                    setFileError(fileErr.message);
                }
                else {
                    setErrors((0, validate_1.validateData)(data, validationLocalization, columns));
                }
                setStatus(`parsed`);
                resolve(data);
            },
            error: (error) => {
                setStatus(`parsed`);
                reject(error);
            },
        });
    });
    if (!file)
        return (react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center", justifyContent: "center", flex: "1", className: classes.root },
            react_1.default.createElement("div", { className: classes.dropzoneContainer },
                react_1.default.createElement(Dropzone_1.default, { maxFiles: 1, accept: accept, maxSize: maxFileSize, label: dropzoneLabel, typeRejectedError: typeRejectedError, maxFilesError: maxFilesError, exceedsMaxSizeError: exceedsMaxSizeError, onFileRejected: handleFileRejected, onFileAdded: setFile }))));
    return (react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", flex: "1", className: classes.root },
        react_1.default.createElement(core_1.Paper, { className: classes.selectedFileContainer },
            react_1.default.createElement(SelectedFileRow_1.default, { file: file, locales: locales, uploadSuccessMessage: uploadSuccessMessage, uploadButtonTooltip: uploadButtonTooltip, uploadErrorMessage: uploadError, removeButtonTooltip: removeButtonTooltip, areActionsDisabled: status === `validating`, error: errors.length ? spreadsheetInvalidData : fileError || dryRunError, onClickRemove: handleClickRemove, onClickUpload: handleClickUpload }),
            !(fileError || status === `pending` || status === `parsing`) && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.Divider, null),
                react_1.default.createElement(ValidationDetails_1.default, { errors: errors, status: errors.length ? `failed` : status === `validating` ? `in-progress` : `passed`, allValidationsPassedMessage: allValidationsPassedMessage, validationInProgressMessage: validationInProgressMessage, numValidationsFailedMessage: numValidationsFailedMessage })))),
        fileError
            ? (react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", className: classes.previewNotAvailble },
                react_1.default.createElement(core_1.Typography, { color: "textSecondary" }, previewNotAvailableMessage)))
            : (react_1.default.createElement(core_1.Box, { className: classes.previewContainer },
                react_1.default.createElement(Preview_1.default, { className: classes.previewFile, file: file, errors: errors, onParseFile: handleParsingCsv }),
                react_1.default.createElement(core_1.Fade, { in: (status === `uploading` || status === `validating`) },
                    react_1.default.createElement("div", { className: classes.uploadInProgress, "data-testid": "uploading-overlay" },
                        react_1.default.createElement(CircularProgress_1.default, { size: 64, color: `white` })))))));
}
exports.default = default_1;
