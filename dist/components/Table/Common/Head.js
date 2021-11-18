"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IconButton_1 = __importDefault(require("../../Button/IconButton"));
const CheckboxDropdown_1 = __importDefault(require("./CheckboxDropdown"));
const ColumnSelector_1 = __importDefault(require("./ColumnSelector"));
const shared_1 = require("./Pagination/shared");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    container: {
        backgroundColor: theme.palette.type === `light` ? (0, core_1.alpha)(`#000000`, 0.04) : (0, core_1.alpha)(`#FFFFFF`, 0.08),
    },
    hoverHeader: {
        height: 53,
        padding: theme.spacing(0, 2),
        "&:hover": {
            backgroundColor: theme.palette.type === `light` ? (0, core_1.alpha)(`#000000`, 0.04) : (0, core_1.alpha)(`#FFFFFF`, 0.08),
        },
    },
    removeButton: {
        opacity: 0,
        transition: `opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        "$hoverHeader:hover &": {
            opacity: 1,
        },
    },
    infoIcon: {
        marginLeft: theme.spacing(1),
    },
    infoIconReverse: {
        marginRight: theme.spacing(1),
    },
}));
function BaseTableHead(props) {
    const { selectMode, order, orderBy, numSelected, rowCount, onRequestSort, columns, selected, loading, showSelectables, hasGroups, checkboxDropdownLocalization, columnSelectorLocalization, hideSelectAll, localization, onSelectAllClick, onSelectAllPageClick, onColumnChange, } = props;
    const classes = useStyles();
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (react_1.default.createElement(core_1.TableHead, null,
        react_1.default.createElement(core_1.TableRow, { className: classes.container },
            showSelectables &&
                react_1.default.createElement(core_1.TableCell, { padding: "checkbox" }, selectMode === `multiple` && (react_1.default.createElement(CheckboxDropdown_1.default, { hasGroups: hasGroups, hideSelectAll: hideSelectAll, disabled: loading, indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, localization: checkboxDropdownLocalization, onSelectAllPageClick: onSelectAllPageClick, onSelectAllClick: onSelectAllClick }))),
            columns
                .filter((column) => selected.indexOf(column.id) !== -1)
                .filter((column) => !column.secret)
                .map((column) => {
                const paddingStyle = column.align === `right`
                    ? {
                        paddingLeft: 0,
                    } : {
                    paddingRight: 0,
                };
                const flexDirection = column.align === `right` ? `row-reverse` : `row`;
                const isAlignCenter = column.align === `center`;
                return ((react_1.default.createElement(core_1.TableCell, { key: column.id, align: column.align, sortDirection: orderBy === column.id ? order : false, className: classes.hoverHeader, style: paddingStyle },
                    react_1.default.createElement(core_1.Box, { display: "flex", justifyContent: "space-between", flexDirection: flexDirection },
                        isAlignCenter && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("span", { style: {
                                    width: 44,
                                } }),
                            react_1.default.createElement(core_1.Box, { flex: "1" }))),
                        react_1.default.createElement(core_1.TableSortLabel, { disabled: column.disableSort, active: orderBy === column.id, direction: orderBy === column.id ? order : shared_1.DEFAULT_SORT_ORDER, style: {
                                flexDirection,
                            }, "data-testid": `${column.id}SortHandler`, onClick: createSortHandler(column.id) },
                            react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: flexDirection },
                                column.label,
                                column.tooltip && (react_1.default.createElement(core_1.Tooltip, { title: column.tooltip },
                                    react_1.default.createElement(icons_1.Info, { color: "action", className: (0, clsx_1.default)({
                                            [classes.infoIcon]: column.align !== `right`,
                                            [classes.infoIconReverse]: column.align === `right`,
                                        }) }))))),
                        isAlignCenter && react_1.default.createElement(core_1.Box, { flex: "1" }),
                        react_1.default.createElement(IconButton_1.default, { disabled: column.persistent, className: classes.removeButton, iconSize: "small", tooltip: !column.persistent ? localization?.hideColumnButton ?? `Hide column` : undefined, icon: column.persistent ? icons_1.Lock : icons_1.Close, onClick: () => onColumnChange(column.id) })))));
            }),
            react_1.default.createElement(core_1.TableCell, { padding: "checkbox" },
                react_1.default.createElement(ColumnSelector_1.default, { columns: columns, selected: selected, localization: columnSelectorLocalization, onColumnChange: onColumnChange })))));
}
exports.default = BaseTableHead;
