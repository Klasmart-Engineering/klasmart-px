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
const IconButton_1 = __importDefault(require("../Button/IconButton"));
const ListMenu_1 = __importDefault(require("./ListMenu"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        position: `relative`,
        display: `inline-block`,
    },
    fileCounter: {
        color: `white`,
        position: `absolute`,
        left: `50%`,
        top: `60%`,
        transform: `translate(-50%, -50%)`,
        pointerEvents: `none`,
    },
}));
const MAX_SHOW_COUNT = 9;
function FileCounterIconButton(props) {
    const { files, menuTitle, hideDownloadActions, } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(IconButton_1.default, { disabled: files.length === 0, icon: icons_1.InsertDriveFile, size: "small", onClick: handleClick }),
        files.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Typography, { className: classes.fileCounter, variant: "caption" }, files.length > MAX_SHOW_COUNT ? `${MAX_SHOW_COUNT}+` : files.length),
            react_1.default.createElement(ListMenu_1.default, { anchorEl: anchorEl, files: files, open: open, title: menuTitle, hideActions: hideDownloadActions, onClose: handleClose })))));
}
exports.default = FileCounterIconButton;
