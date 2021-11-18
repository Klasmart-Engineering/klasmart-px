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
const Button_1 = __importDefault(require("../../../Button/Button"));
const Select_1 = __importDefault(require("../../../Input/Select"));
const TextField_1 = __importDefault(require("../../../Input/TextField"));
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        marginTop: `8px`,
    },
    select: {
        margin: theme.spacing(0.5),
        minWidth: 160,
        maxWidth: 160,
    },
    actionButton: {
        marginLeft: theme.spacing(2),
    },
    actionsContainer: {
        display: `flex`,
        justifyContent: `flex-end`,
        paddingRight: 4,
    },
}));
function TableFilterMenu(props) {
    const { anchorEl, isOpen, editingFilter, tableFilters, localization, onClose, } = props;
    const classes = useStyles();
    const startFilter = {
        columnId: ``,
        operatorValue: ``,
        values: [],
    };
    const [filter, setFilter] = (0, react_1.useState)(editingFilter ?? startFilter);
    const [selectValue, setSelectValue] = (0, react_1.useState)(``);
    const [selectValues, setSelectValues] = (0, react_1.useState)([]);
    const [textFieldValue, setTextFieldValue] = (0, react_1.useState)(``);
    const [validValues, setValidValues] = (0, react_1.useState)(true);
    const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === filter.columnId);
    const columns = tableFilters.map(({ id, label }) => ({
        id,
        label,
    }));
    const operators = tableFilter?.operators ?? [];
    const operator = tableFilter?.operators.find((operator) => operator.value === filter.operatorValue);
    const handleColumnChange = (columnId) => {
        const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === columnId);
        const operator = tableFilter?.operators[0];
        const operatorValue = operator?.value ?? ``;
        setFilter({
            ...filter,
            columnId,
            ...columnId !== filter.columnId
                ? {
                    operatorValue,
                    values: [],
                }
                : {},
        });
        if (columnId !== filter.columnId) {
            setSelectValue(``);
            setSelectValues([]);
            setTextFieldValue(``);
        }
    };
    const handleOperatorChange = (operatorValue) => {
        setFilter({
            ...filter,
            operatorValue,
            ...operatorValue !== filter.operatorValue ? {
                values: [],
            } : {},
        });
        if (operatorValue !== filter.operatorValue) {
            setSelectValue(``);
            setSelectValues([]);
            setTextFieldValue(``);
        }
    };
    const handleSelectValueChange = (value) => {
        setSelectValue(value);
        setFilter({
            ...filter,
            values: [value],
        });
    };
    const handleSelectValuesChange = (values) => {
        setSelectValues(values);
        setFilter({
            ...filter,
            values,
        });
    };
    const handleFreeTextValueChange = (value) => {
        setTextFieldValue(value);
        setFilter({
            ...filter,
            values: [value],
        });
    };
    (0, react_1.useEffect)(() => {
        if (!isOpen)
            return;
        const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === editingFilter?.columnId) ?? tableFilters[0];
        const operator = tableFilter.operators.find((operator) => operator.value === editingFilter?.operatorValue) ?? tableFilter.operators[0];
        const firstValue = editingFilter?.values?.[0] ?? ``;
        const allValues = editingFilter?.values ?? [];
        setSelectValue(firstValue);
        setSelectValues(allValues);
        setTextFieldValue(firstValue);
        setFilter(editingFilter ?? {
            columnId: tableFilter.id,
            operatorValue: operator.value,
            values: operator.options?.length ? allValues : [firstValue],
        });
    }, [editingFilter, isOpen]);
    return (react_1.default.createElement(core_1.Popover, { className: classes.root, anchorEl: anchorEl, open: isOpen, anchorOrigin: {
            vertical: `bottom`,
            horizontal: `left`,
        }, transformOrigin: {
            vertical: `top`,
            horizontal: `left`,
        }, onClose: () => onClose() },
        react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "column", p: 2 },
            react_1.default.createElement("div", null,
                react_1.default.createElement(Select_1.default, { value: filter.columnId, items: columns ?? [], className: classes.select, label: localization?.column ?? `Column`, itemText: (column) => column.label, itemValue: (column) => column.id, onChange: handleColumnChange }),
                react_1.default.createElement(Select_1.default, { value: filter.operatorValue, items: operators, className: classes.select, label: localization?.operator ?? `Operator`, itemText: (operator) => operator.label, itemValue: (operator) => operator.value, onChange: handleOperatorChange }),
                operator?.options?.length ? (!operator?.multipleValues ? (react_1.default.createElement(Select_1.default, { value: selectValue, label: localization?.values ?? `Value`, className: classes.select, items: operator.options, itemText: (item) => item.label, itemValue: (item) => item.value, validations: operator?.validations, onChange: handleSelectValueChange, onValidate: setValidValues })) : (react_1.default.createElement(Select_1.default, { multiple: true, value: selectValues, label: localization?.value ?? `Values`, className: classes.select, items: operator.options, selectAllLabel: localization?.selectAllLabel, itemText: (item) => item.label, itemValue: (item) => item.value, validations: operator?.validations, onChange: handleSelectValuesChange, onValidate: setValidValues }))) : (react_1.default.createElement(TextField_1.default, { value: textFieldValue, label: localization?.value ?? `Value`, className: classes.select, type: "text", autoFocus: !editingFilter, validations: operator?.validations, onChange: handleFreeTextValueChange, onValidate: setValidValues }))),
            react_1.default.createElement(core_1.Grid, { container: true, spacing: 1, justifyContent: "flex-end", className: classes.actionsContainer },
                react_1.default.createElement(core_1.Grid, { item: true },
                    react_1.default.createElement(Button_1.default, { className: classes.actionButton, color: "primary", label: localization?.cancel ?? `Cancel`, onClick: () => onClose() })),
                react_1.default.createElement(core_1.Grid, { item: true },
                    react_1.default.createElement(Button_1.default, { disabled: !validValues, variant: "contained", color: "primary", label: !editingFilter ? (localization?.addFilter ?? `Add Filter`) : (localization?.saveFilter ?? `Save Filter`), onClick: () => onClose(filter) }))))));
}
exports.default = TableFilterMenu;
