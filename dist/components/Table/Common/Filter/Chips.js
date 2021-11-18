"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    chip: {
        margin: theme.spacing(0.5, 0.5),
        minHeight: 32,
        height: `inherit`,
        "& > .MuiChip-label": {
            padding: theme.spacing(7 / 8, 1.5),
        },
    },
    addChip: {
        '& .MuiChip-icon': {
            marginRight: 20,
            marginLeft: 4,
        },
    },
    chipText: {
        whiteSpace: `break-spaces`,
    },
}));
function TableFilterChips(props) {
    const { localization, filters, tableFilters, onClick, onDelete, } = props;
    const classes = useStyles();
    const onChipLabelFallback = (column, operator, value) => (react_1.default.createElement(react_1.default.Fragment, null,
        column,
        ` ${operator.toLowerCase()} `,
        value));
    return (react_1.default.createElement(react_1.default.Fragment, null, filters.map((filter) => {
        const currentFilter = tableFilters?.find((filterElement) => filterElement.id === filter.columnId);
        const operator = currentFilter?.operators?.find((operator) => operator.value === filter.operatorValue);
        const columnText = (react_1.default.createElement(core_1.Typography, { color: "textPrimary", variant: "inherit" }, currentFilter?.label));
        const values = (operator?.options
            ? filter.values.map((value) => operator.options?.find((option) => option.value === value)?.label)
            : filter.values).map((value) => `"${value}"`);
        const valueText = (react_1.default.createElement(core_1.Typography, { color: "textPrimary", variant: "inherit" }, values.map((value, index, values) => (react_1.default.createElement(react_1.default.Fragment, { key: `${value}-${index}` },
            value,
            index < values.length - 2 && (react_1.default.createElement(core_1.Typography, { color: "textSecondary", variant: "inherit" }, `, `)),
            index === values.length - 2 && (react_1.default.createElement(core_1.Typography, { color: "textSecondary", variant: "inherit" }, localization?.chipLabelValueOr ?? ` or `)))))));
        return (react_1.default.createElement(core_1.Chip, { key: filter.columnId, clickable: true, label: (react_1.default.createElement(core_1.Typography, { className: classes.chipText, color: "textSecondary", variant: "inherit" }, operator?.chipLabel?.(columnText, valueText) ?? onChipLabelFallback(columnText, operator.label, valueText))), className: classes.chip, "data-testid": `${filter.columnId}ChipLabel`, onClick: (event) => onClick(event, filter), onDelete: () => onDelete(filter) }));
    })));
}
exports.default = TableFilterChips;
