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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function MoreMenu(props) {
    const { actions, item, localization, } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Tooltip, { title: localization?.moreMenuButton ?? `More actions` },
            react_1.default.createElement(core_1.IconButton, { "aria-label": localization?.moreMenuButton ?? `More actions`, "aria-haspopup": "true", onClick: handleClick },
                react_1.default.createElement(icons_1.MoreVert, null))),
        react_1.default.createElement(core_1.Popover, { anchorEl: anchorEl, open: open, anchorOrigin: {
                vertical: `bottom`,
                horizontal: `left`,
            }, transformOrigin: {
                vertical: `top`,
                horizontal: `left`,
            }, onClose: handleClose },
            react_1.default.createElement(core_1.MenuList, null, actions?.length && actions.map((action, i) => (react_1.default.createElement(core_1.MenuItem, { key: `menu-item-${i}`, disabled: action.disabled, onClick: () => {
                    action.onClick(item);
                    handleClose();
                } },
                action.icon &&
                    react_1.default.createElement(core_1.ListItemIcon, null,
                        react_1.default.createElement(action.icon, null)),
                react_1.default.createElement(core_1.Typography, { variant: "body2" }, action.label))))))));
}
exports.default = MoreMenu;
