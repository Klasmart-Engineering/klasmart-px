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
const IconButton_1 = __importDefault(require("../../Button/IconButton"));
const TypeIcon_1 = __importDefault(require("../../File/TypeIcon"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        padding: theme.spacing(1, 2),
    },
    fileIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    successText: {
        color: theme.palette.success.main,
    },
    successIcon: {
        margin: theme.spacing(1.5),
        color: theme.palette.success.main,
    },
}));
function SelectedFileRow(props) {
    const { className, file, error, areActionsDisabled, locales, removeButtonTooltip = `Remove file`, uploadButtonTooltip = `Upload file`, uploadErrorMessage, uploadSuccessMessage = `File successfully uploaded`, onClickRemove, onClickUpload, } = props;
    const classes = useStyles();
    const fileSize = (file.size / 1000).toFixed(1);
    const lastModified = Intl.DateTimeFormat(locales, {
        dateStyle: `long`,
    }).format(new Date(file.lastModified));
    const [uploadSuccess, setUploadSuccess] = (0, react_1.useState)(false);
    const [uploadError, setUploadError] = (0, react_1.useState)(``);
    const [uploadLoading, setUploadLoading] = (0, react_1.useState)(false);
    const onClickUpload_ = async () => {
        setUploadSuccess(false);
        setUploadError(``);
        setUploadLoading(true);
        try {
            await onClickUpload?.();
            setUploadSuccess(true);
        }
        catch (err) {
            setUploadError(err?.message);
        }
        setUploadLoading(false);
    };
    const fileExtension = file.name.split(`.`).slice(-1)[0];
    return (react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", alignItems: "center", className: (0, clsx_1.default)(classes.root, className) },
        react_1.default.createElement(TypeIcon_1.default, { fileType: fileExtension }),
        react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "column" },
            react_1.default.createElement(core_1.Typography, null, file.name),
            error || uploadError && (react_1.default.createElement(core_1.Typography, { color: "error", variant: "caption" }, error || uploadErrorMessage || uploadError)),
            uploadSuccess && (react_1.default.createElement(core_1.Typography, { className: classes.successText, variant: "caption" }, uploadSuccessMessage)),
            !error && !uploadError && !uploadSuccess && (react_1.default.createElement(core_1.Typography, { color: "textSecondary", variant: "caption" },
                fileSize,
                " Kb \u2022 ",
                lastModified))),
        react_1.default.createElement(core_1.Box, { flex: 1 }),
        react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", alignItems: "center" },
            onClickRemove && (react_1.default.createElement(IconButton_1.default, { icon: icons_1.Delete, disabled: areActionsDisabled || uploadLoading, tooltip: removeButtonTooltip, onClick: onClickRemove })),
            uploadSuccess
                ? (react_1.default.createElement(icons_1.Check, { "data-testid": "upload-success-icon", className: classes.successIcon }))
                : (react_1.default.createElement(IconButton_1.default, { icon: icons_1.CloudUpload, color: "primary", disabled: areActionsDisabled || !!error || uploadLoading, tooltip: uploadButtonTooltip, onClick: onClickUpload_ })))));
}
exports.default = SelectedFileRow;
