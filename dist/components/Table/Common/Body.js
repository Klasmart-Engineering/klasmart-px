"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoreMenu_1 = __importDefault(require("../../MoreMenu"));
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    row: {
        height: 53,
    },
}));
function BaseTableBody(props) {
    const { selectMode, columns, columnCount, showSelectables, idField, loading, rowActions, rows, selectedRows, localization, rowMoreMenuLocalization, onRowSelect, } = props;
    const classes = useStyles();
    const isRowSelected = (idFieldValue) => selectedRows.indexOf(idFieldValue) !== -1;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.TableBody, null,
            rows.length === 0 &&
                react_1.default.createElement(core_1.TableRow, { tabIndex: -1 },
                    react_1.default.createElement(core_1.TableCell, { colSpan: columnCount, align: "center" }, localization?.noData ?? `No results found`)),
            rows.map((row, i) => {
                const isSelected = isRowSelected(row[idField]);
                const labelId = `enhanced-table-checkbox-${i}`;
                return (react_1.default.createElement(core_1.TableRow, { key: row[idField], hover: true, tabIndex: -1, className: classes.row, "data-testid": "tableRow" },
                    showSelectables &&
                        react_1.default.createElement(core_1.TableCell, { padding: "checkbox" }, selectMode === `single`
                            ? (react_1.default.createElement(core_1.Radio, { role: "radio", checked: isSelected, disabled: loading, onClick: (event) => onRowSelect(event, row[idField]) }))
                            : (react_1.default.createElement(core_1.Checkbox, { role: "checkbox", checked: isSelected, disabled: loading, inputProps: {
                                    "aria-labelledby": labelId,
                                }, onClick: (event) => onRowSelect(event, row[idField]) }))),
                    columns.map((column, j) => {
                        const render = column.render?.(row);
                        const element = render ?? row[column.id];
                        return (react_1.default.createElement(core_1.TableCell, { key: `rowCell-${i}-${j}`, id: labelId, scope: "row", align: column.align }, element));
                    }),
                    react_1.default.createElement(core_1.TableCell, { padding: "checkbox" }, rowActions && rowActions(row).length > 0 && (react_1.default.createElement(MoreMenu_1.default, { item: row, actions: rowActions(row), localization: rowMoreMenuLocalization })))));
            }))));
}
exports.default = BaseTableBody;
