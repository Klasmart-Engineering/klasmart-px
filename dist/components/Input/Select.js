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
const LoadingIndicator_1 = __importDefault(require("./LoadingIndicator"));
const shared_1 = require("./shared");
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        "& .MuiTypography-body1": {
            lineHeight: `inherit`,
        },
        "& .MuiListItemText-root": {
            margin: 0,
            overflow: `hidden`,
        },
    },
    sectionHeader: {
        padding: theme.spacing(1, 2, 0),
        fontWeight: 600,
        textTransform: `uppercase`,
    },
}));
function Select(props) {
    const { className, label, items, sections, value, selectAllLabel, noDataLabel, hideHelperText, multiple, validations, itemText = (item) => String(item), itemValue = (item) => String(item), variant = `outlined`, readOnly, prependInner, appendInner, onBlur, onFocus, onChange, onError, onValidate, loading, ...rest } = props;
    const classes = useStyles();
    const [value_, setValue] = (0, react_1.useState)(multiple && !Array.isArray(value) ? [value] : value);
    const [error_, setError] = (0, react_1.useState)((0, shared_1.getErrorText)(value, validations));
    const selectAllItems = [...items, ...sections?.filter((section) => !section.ignoreSelectAll).flatMap((section) => section.items) ?? []];
    const allItems = [...items, ...sections?.flatMap((section) => section.items) ?? []];
    const getToggleSelectAll = (values) => values.length !== selectAllItems.length ? selectAllItems.map(itemValue) : [];
    const updateValue = (value) => {
        if (Array.isArray(value) && value.includes(``)) {
            value = getToggleSelectAll(value.filter((v) => v));
        }
        const error = (0, shared_1.getErrorText)(value, validations);
        setValue(value);
        setError(error);
        onChange?.(value);
        onValidate?.(!error);
        onError?.(error);
    };
    const handleChange = (event, child) => {
        const value = event.target.value;
        updateValue(value);
    };
    (0, react_1.useEffect)(() => {
        if (Array.isArray(value) && Array.isArray(value_)) {
            const newValue = [...value].sort((a, b) => a.localeCompare(b));
            const oldValue = [...value_].sort((a, b) => a.localeCompare(b));
            if ((0, lodash_1.isEqual)(newValue, oldValue))
                return;
        }
        if ((0, lodash_1.isEqual)(value, value_))
            return;
        updateValue(value);
    }, [value]);
    (0, react_1.useEffect)(() => {
        onChange?.(value_);
        onValidate?.(!error_);
        onError?.(error_);
    }, []);
    const menuItems = items.map((item) => (react_1.default.createElement(core_1.MenuItem, { key: itemValue(item), value: itemValue(item) },
        multiple && Array.isArray(value_) &&
            react_1.default.createElement(core_1.ListItemIcon, null,
                react_1.default.createElement(core_1.Checkbox, { checked: !!value_.find((v) => v === itemValue(item)) })),
        react_1.default.createElement(core_1.ListItemText, null, itemText(item)))));
    if (sections?.length) {
        const allSectionElements = sections.flatMap((section, i) => {
            const sectionElements = [
                ...section.items.map((item) => (react_1.default.createElement(core_1.MenuItem, { key: itemValue(item), value: itemValue(item) },
                    multiple && Array.isArray(value_) &&
                        react_1.default.createElement(core_1.ListItemIcon, null,
                            react_1.default.createElement(core_1.Checkbox, { checked: !!value_.find((v) => v === itemValue(item)) })),
                    react_1.default.createElement(core_1.ListItemText, null, itemText(item))))),
                ...(i !== sections.length - 1 || !items.length) ? [] : [react_1.default.createElement(core_1.Divider, { key: `section-divider-${i}` })],
            ];
            if (section.header) {
                sectionElements.unshift((react_1.default.createElement(core_1.Typography, { key: `section-header-${i}`, variant: "caption", color: "textSecondary", component: "div", className: classes.sectionHeader }, section.header)));
            }
            return sectionElements;
        });
        menuItems.unshift(...allSectionElements);
    }
    if (multiple && Array.isArray(value_)) {
        const selectAllSectionItems = (sections?.filter((section) => !section.ignoreSelectAll).flatMap((section) => section.items) ?? []);
        const currentSelectAllValues = [...items, ...selectAllSectionItems].filter((item) => !!value_.find((v) => v === itemValue(item)));
        menuItems.unshift(...[
            (react_1.default.createElement(core_1.MenuItem, { key: "selectAll", value: "" },
                react_1.default.createElement(core_1.ListItemIcon, null,
                    react_1.default.createElement(core_1.Checkbox, { checked: selectAllItems.every((item) => !!value_.find((v) => v === itemValue(item))), indeterminate: currentSelectAllValues.length > 0 && currentSelectAllValues.length < selectAllItems.length })),
                react_1.default.createElement(core_1.ListItemText, null, selectAllLabel ?? `Select All`))),
            (react_1.default.createElement(core_1.Divider, { key: "divider" })),
        ]);
    }
    return (react_1.default.createElement(core_1.TextField, { select: true, "data-testid": `${label}SelectTextField`, className: (0, clsx_1.default)(className, classes.root), label: label, variant: variant, helperText: hideHelperText ? undefined : (error_ ?? ` `), error: !!error_, inputProps: {
            "data-testid": `${label}SelectTextInput`,
        }, InputProps: {
            readOnly,
            startAdornment: prependInner,
            endAdornment: (react_1.default.createElement(react_1.default.Fragment, null,
                appendInner,
                react_1.default.createElement(LoadingIndicator_1.default, { loading: loading, variant: variant }))),
        }, SelectProps: {
            multiple,
            renderValue: Array.isArray(value_) && !value_.includes(``)
                ? (value) => value_.map((v) => {
                    const item = allItems.find((item) => itemValue(item) === v);
                    if (!item)
                        return ``;
                    return itemText(item);
                }).join(`, `)
                : undefined,
            value: multiple && !Array.isArray(value_) ? [value_] : value_,
            onBlur,
            onChange: handleChange,
            onFocus,
        }, ...rest }, !allItems.length || !menuItems.length
        ? (react_1.default.createElement(core_1.MenuItem, { disabled: true },
            react_1.default.createElement(core_1.ListItemText, null, noDataLabel ?? `No items`)))
        : menuItems));
}
exports.default = Select;
