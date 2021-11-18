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
exports.CheckboxDropdownValue = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    menuButton: {
        minWidth: 24,
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
}));
var CheckboxDropdownValue;
(function (CheckboxDropdownValue) {
    CheckboxDropdownValue["ALL"] = "all";
    CheckboxDropdownValue["ALL_PAGES"] = "all-pages";
    CheckboxDropdownValue["NONE"] = "none";
    CheckboxDropdownValue["PAGE"] = "page";
})(CheckboxDropdownValue = exports.CheckboxDropdownValue || (exports.CheckboxDropdownValue = {}));
function BaseTableCheckboxDropdown(props) {
    const { indeterminate, checked, disabled, hasGroups, hideSelectAll, localization, onSelectAllClick, onSelectAllPageClick, } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const standardActions = [
        ...hideSelectAll ? [] : [
            {
                label: localization?.allPages ?? `All pages`,
                value: CheckboxDropdownValue.ALL_PAGES,
            },
        ],
        {
            label: localization?.thisPage ?? `This page`,
            value: CheckboxDropdownValue.PAGE,
        },
        {
            label: localization?.none ?? `None`,
            value: CheckboxDropdownValue.NONE,
        },
    ];
    const actions = hasGroups ? [
        ...hideSelectAll ? [] : [
            {
                label: localization?.allGroupsPages ?? `All groups & pages`,
                value: CheckboxDropdownValue.ALL,
            },
        ],
        ...standardActions,
    ] : standardActions;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row" },
        react_1.default.createElement(core_1.Checkbox, { checked: checked, disabled: disabled, indeterminate: indeterminate, inputProps: {
                "aria-label": `select all on page`,
            }, onChange: onSelectAllPageClick }),
        react_1.default.createElement(core_1.Button, { className: classes.menuButton, onClick: handleClick },
            react_1.default.createElement(icons_1.ArrowDropDown, { color: "action" })),
        react_1.default.createElement(core_1.Popover, { keepMounted: true, anchorEl: anchorEl, open: open, anchorOrigin: {
                vertical: `bottom`,
                horizontal: `right`,
            }, transformOrigin: {
                vertical: `top`,
                horizontal: `right`,
            }, onClose: handleClose },
            react_1.default.createElement(core_1.MenuList, null, actions.map((action, i) => (react_1.default.createElement(core_1.MenuItem, { key: `menu-item-${i}`, onClick: (e) => {
                    onSelectAllClick(e, action.value);
                    handleClose();
                } },
                react_1.default.createElement(core_1.Typography, { variant: "body2" }, action.label))))))));
}
exports.default = BaseTableCheckboxDropdown;
