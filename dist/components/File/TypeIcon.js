"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        position: `relative`,
        display: `inline-block`,
    },
    fileIcon: {
        marginRight: theme.spacing(1.5),
    },
    fileExtensionLabel: {
        position: `absolute`,
        right: 12,
        bottom: 9,
        color: theme.palette.common.white,
        padding: theme.spacing(1 / 8, 3 / 8),
        lineHeight: 1.1,
        borderRadius: theme.spacing(0.5),
        fontSize: 11,
        whiteSpace: `nowrap`,
        overflow: `hidden`,
        textOverflow: `ellipsis`,
        maxWidth: theme.spacing(4),
    },
}));
function FileTypeIcon(props) {
    const { fileType, className } = props;
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.root, className) },
        react_1.default.createElement(icons_1.InsertDriveFile, { color: "disabled", className: classes.fileIcon, fontSize: "large" }),
        fileType && (react_1.default.createElement(core_1.Typography, { variant: "caption", className: classes.fileExtensionLabel, style: {
                backgroundColor: (0, utils_1.stringToColor)(fileType, {
                    saturation: 70,
                }),
            } }, fileType))));
}
exports.default = FileTypeIcon;
