"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IconButton_1 = __importDefault(require("../Button/IconButton"));
const TypeIcon_1 = __importDefault(require("./TypeIcon"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        width: 300,
    },
    downloadIconButton: {
        marginRight: -12,
    },
}));
function FileListMenu(props) {
    const { files, open, anchorEl, title, hideActions, onClose, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Popover, { anchorEl: anchorEl, open: open, anchorOrigin: {
            vertical: `bottom`,
            horizontal: `left`,
        }, transformOrigin: {
            vertical: `top`,
            horizontal: `left`,
        }, onClose: () => onClose() },
        react_1.default.createElement(core_1.List, { dense: true, className: classes.root, subheader: title ? react_1.default.createElement(core_1.ListSubheader, null, title) : undefined }, files.map((file, i) => {
            const fileType = file.name.split(`.`).slice(-1)[0];
            return (react_1.default.createElement(core_1.ListItem, { key: `file-item-${i}` },
                react_1.default.createElement(core_1.ListItemIcon, null,
                    react_1.default.createElement(TypeIcon_1.default, { fileType: fileType })),
                react_1.default.createElement(core_1.Tooltip, { title: file.name },
                    react_1.default.createElement(core_1.Typography, { noWrap: true, variant: "body2" }, file.name)),
                !hideActions && (react_1.default.createElement(core_1.ListItemSecondaryAction, null,
                    react_1.default.createElement(IconButton_1.default, { icon: icons_1.CloudDownload, disabled: !file.onDownloadClick, className: classes.downloadIconButton, onClick: file.onDownloadClick })))));
        }))));
}
exports.default = FileListMenu;
