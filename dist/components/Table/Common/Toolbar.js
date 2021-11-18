"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("../../Button/Button"));
const Fab_1 = __importDefault(require("../../Button/Fab"));
const IconButton_1 = __importDefault(require("../../Button/IconButton"));
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        borderTopLeftRadius: `inherit`,
        borderTopRightRadius: `inherit`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        "& > *:not(:first-child)": {
            marginLeft: theme.direction === `ltr` ? theme.spacing(2) : undefined,
            marginRight: theme.direction === `rtl` ? theme.spacing(2) : undefined,
        },
    },
    highlight: theme.palette.type === `light`
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: (0, core_1.lighten)(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
        flex: `1 1 100%`,
    },
    primaryActionIcon: {
        marginRight: theme.spacing(1),
    },
}));
function BaseTableToolbar(props) {
    const classes = useStyles();
    const { hideSelectStatus, primaryAction, secondaryActions, selectActions, selectedRows, localization, } = props;
    const numSelected = selectedRows.length;
    return (react_1.default.createElement(core_1.Toolbar, { className: (0, clsx_1.default)(classes.root, {
            [classes.highlight]: !hideSelectStatus && numSelected > 0,
        }) }, !hideSelectStatus && numSelected > 0 ?
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Typography, { className: classes.title, color: "inherit", variant: "subtitle1", component: "div" }, localization?.numSelected?.(numSelected) ?? `${numSelected} selected`),
            selectActions?.map((action, i) => action.icon
                ? (react_1.default.createElement(IconButton_1.default, { key: `select-action-${i}`, icon: action.icon, tooltip: action.label, color: "primary", disabled: action.disabled, onClick: () => action.onClick(selectedRows) }))
                : (react_1.default.createElement(Button_1.default, { key: `select-action-${i}`, label: action.label, color: "primary", disabled: action.disabled, onClick: () => action.onClick(selectedRows) })))) :
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Typography, { variant: "h6", id: "tableTitle", component: "div", className: classes.title }, localization?.title ?? ``),
            secondaryActions?.map((action, i) => action.icon
                ? (react_1.default.createElement(IconButton_1.default, { key: `secondary-action-${i}`, icon: action.icon, tooltip: action.label, color: "primary", disabled: action.disabled, onClick: action.onClick }))
                : (react_1.default.createElement(Button_1.default, { key: `secondary-action-${i}`, label: action.label, color: "primary", disabled: action.disabled, onClick: action.onClick }))),
            primaryAction &&
                react_1.default.createElement(Fab_1.default, { responsiveExtended: [
                        `md`,
                        `lg`,
                        `xl`,
                    ], color: "primary", disabled: primaryAction.disabled, icon: primaryAction.icon, label: primaryAction.label, onClick: primaryAction.onClick }))));
}
exports.default = BaseTableToolbar;
