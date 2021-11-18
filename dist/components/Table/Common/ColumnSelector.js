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
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    toolbar: {
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 56,
        backgroundColor: theme.palette.type === `light` ? (0, core_1.alpha)(`#000000`, 0.04) : (0, core_1.alpha)(`#FFFFFF`, 0.08),
    },
    title: {
        fontWeight: 600,
    },
    list: {
        paddingTop: 0,
    },
    columnItemContainer: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    persistentText: {
        color: theme.palette.grey[600],
    },
    persistentIcon: {
        color: theme.palette.grey[400],
    },
}));
function BaseTableColumnSelector(props) {
    const { columns, selected, localization, onColumnChange, } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isSelected = (column) => selected.indexOf(column) !== -1;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Tooltip, { title: localization?.addButton ?? `Add columns` },
            react_1.default.createElement(core_1.IconButton, { "aria-label": localization?.addButton ?? `Add columns`, "aria-haspopup": "true", onClick: handleClick },
                react_1.default.createElement(icons_1.Add, null))),
        react_1.default.createElement(core_1.Popover, { keepMounted: true, anchorEl: anchorEl, open: open, anchorOrigin: {
                vertical: `bottom`,
                horizontal: `left`,
            }, transformOrigin: {
                vertical: `top`,
                horizontal: `left`,
            }, onClose: handleClose },
            react_1.default.createElement(core_1.Toolbar, { className: classes.toolbar },
                react_1.default.createElement(core_1.Typography, { variant: "body2", className: classes.title }, localization?.listTitle ?? `Select columns`)),
            react_1.default.createElement(core_1.List, { className: classes.list },
                react_1.default.createElement(core_1.Divider, null),
                columns.filter((column) => !column.secret).map((column, i) => (react_1.default.createElement(react_1.Fragment, { key: `list-item-${i}` },
                    i !== 0 && react_1.default.createElement(core_1.Divider, null),
                    react_1.default.createElement(core_1.ListItem, { className: classes.columnItemContainer, onClick: !column.persistent ? () => onColumnChange(column.id) : undefined },
                        react_1.default.createElement(core_1.Checkbox, { role: "checkbox", checked: isSelected(column.id), disabled: column.persistent }),
                        react_1.default.createElement(core_1.Typography, { variant: "body2", className: (0, clsx_1.default)({
                                [classes.persistentText]: column.persistent,
                            }) }, column.label),
                        column.persistent &&
                            react_1.default.createElement(core_1.ListItemSecondaryAction, null,
                                react_1.default.createElement(icons_1.Lock, { className: classes.persistentIcon, fontSize: "small" }))))))))));
}
exports.default = BaseTableColumnSelector;
