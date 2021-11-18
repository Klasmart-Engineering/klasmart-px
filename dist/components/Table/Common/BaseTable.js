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
const Body_1 = __importDefault(require("./Body"));
const CheckboxDropdown_1 = require("./CheckboxDropdown");
const Filters_1 = __importDefault(require("./Filter/Filters"));
const GroupTabs_1 = __importDefault(require("./GroupTabs"));
const Head_1 = __importDefault(require("./Head"));
const Loading_1 = __importDefault(require("./Loading"));
const shared_1 = require("./Pagination/shared");
const Search_1 = __importDefault(require("./Search"));
const Toolbar_1 = __importDefault(require("./Toolbar"));
const core_1 = require("@material-ui/core");
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function descendingComparator(a, b, locale, collatorOptions) {
    if ((typeof a === `string` && typeof b === `string`) || (a instanceof String && b instanceof String)) {
        const aValue = a;
        const bValue = b;
        return bValue.localeCompare(aValue, locale, collatorOptions);
    }
    else {
        if (b < a)
            return -1;
        if (b > a)
            return 1;
    }
    return 0;
}
function getComparator(order, orderBy, customSort, locale, collatorOptions) {
    const reverseOrder = order === `desc` ? 1 : -1;
    const sort = customSort ?? descendingComparator;
    return (a, b) => reverseOrder * sort(a[orderBy], b[orderBy], locale, collatorOptions);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((row, index) => [row, index]);
    const ROW = 0;
    const INDEX = 1;
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[ROW], b[ROW]);
        if (order !== 0)
            return order;
        return a[INDEX] - b[INDEX];
    });
    return stabilizedThis.map((el) => el[ROW]);
}
function defaultSearch(value, searchValue) {
    const values = Array.isArray(value) ? value : [value];
    const regexp = new RegExp((0, lodash_1.escapeRegExp)(searchValue.trim()), `gi`);
    return values.some((value) => {
        const result = String(value).match(regexp);
        return !!result;
    });
}
function rowSearch(searchableColumns, row, searchValue) {
    if (searchValue.length === 0 || searchableColumns.length === 0)
        return true;
    return searchableColumns.some((column) => column.search?.(row[column.id], searchValue) ?? defaultSearch(row[column.id], searchValue));
}
const isValidSubgroup = (subgroup, subgroups) => subgroups.find((s) => String(s.value) === subgroup);
function BaseTable(props) {
    const { columns, idField, order, orderBy, groupBy, subgroupBy, rows = [], rowsPerPage = shared_1.DEFAULT_ROWS_PER_PAGE, selectedRows, localPageStartSlice, localPageEndSlice, search, showSelectables, selectMode = `multiple`, primaryAction, rowActions, secondaryActions, selectActions, loading, hideSelectAll, hideAllGroupTab, hideNoGroupOption, localization, locale, collatorOptions, total, noGroupTotal, hideSelectStatus, PaginationComponent, onChange, onSelected, filters, } = props;
    const classes = useStyles();
    const fallbackGroupBy = hideNoGroupOption ? columns.find((column) => column.groups)?.id : undefined;
    const persistentColumnIds = columns.filter((c) => c.persistent).map(({ id }) => id);
    const selectedColumnIds = columns.filter(({ hidden }) => !hidden).map(({ id }) => id);
    const searchableColumns = columns.filter((c) => !c.disableSearch);
    const groupableColumns = columns.filter((c) => c.groups).map(({ id, label }) => ({
        id,
        label,
    }));
    const [order_, setOrder] = (0, react_1.useState)([`asc`, `desc`].includes(order ?? ``) ? order : `desc`);
    const [orderBy_, setOrderBy] = (0, react_1.useState)(columns.find((column) => column.id === orderBy)?.id ?? idField);
    const [groupBy_, setGroupBy] = (0, react_1.useState)(columns.find((column) => column.id === groupBy)?.id ?? fallbackGroupBy);
    const fallbackSubgroupBy = hideAllGroupTab ? columns.find((column) => column.id === groupBy_)?.groups?.[0]?.value?.toString() : undefined;
    const [subgroupBy_, setSubgroupBy] = (0, react_1.useState)(subgroupBy ?? fallbackSubgroupBy);
    const [selectedRowIds_, setSelectedRowIds] = (0, react_1.useState)(selectedRows ?? []);
    const [selectedColumnIds_, setSelectedColumnIds] = (0, react_1.useState)((0, lodash_1.union)(selectedColumnIds, persistentColumnIds));
    const [search_, setSearch] = (0, react_1.useState)(search ?? ``);
    const [filters_, setFilters] = (0, react_1.useState)([]);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy_ === property && order_ === `asc`;
        setOrder(isAsc ? `desc` : `asc`);
        setOrderBy(property);
    };
    const handleSelectAllRowsClick = (event, value) => {
        switch (value) {
            case CheckboxDropdown_1.CheckboxDropdownValue.ALL: {
                const newSelecteds = filteredSortedRows.map((n) => n[idField]);
                setSelectedRowIds(newSelecteds);
                return;
            }
            case CheckboxDropdown_1.CheckboxDropdownValue.ALL_PAGES: {
                const newSelecteds = filteredSortedGroupedRows.map((n) => n[idField]);
                setSelectedRowIds(selectedRowIds_.concat(newSelecteds));
                return;
            }
            case CheckboxDropdown_1.CheckboxDropdownValue.NONE: {
                setSelectedRowIds([]);
                return;
            }
            case CheckboxDropdown_1.CheckboxDropdownValue.PAGE: {
                const pageRows = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
                setSelectedRowIds((0, lodash_1.union)(selectedRowIds_, pageRows));
                return;
            }
        }
    };
    const handleSelectAllRowsPageClick = (event) => {
        const pageRowIds = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
        if (!event.target.checked) {
            setSelectedRowIds(selectedRowIds_.filter((rowId) => !(pageRowIds).includes(rowId)));
            return;
        }
        setSelectedRowIds((0, lodash_1.union)(selectedRowIds_, pageRowIds));
    };
    const handleRowSelectClick = (event, rowId) => {
        if (selectMode === `single`) {
            setSelectedRowIds([rowId]);
            return;
        }
        const selectedIndex = selectedRowIds_.indexOf(rowId);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRowIds_, rowId);
        }
        else {
            newSelected = selectedRowIds_.filter((id) => id !== rowId);
        }
        setSelectedRowIds(newSelected);
    };
    const handleColumnSelectClick = (columnId) => {
        const selectedIndex = selectedColumnIds_.indexOf(columnId);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedColumnIds_, columnId);
        }
        else {
            newSelected = selectedColumnIds_.filter((id) => id !== columnId);
        }
        setSelectedColumnIds(newSelected);
    };
    const handleSelectGroup = (group) => {
        setGroupBy(group);
    };
    const handleSelectSubgroup = (subgroup) => {
        setSubgroupBy(subgroup);
    };
    const handleChangeSearch = (value) => {
        setSearch(value);
    };
    const isColumnSelected = (column) => selectedColumnIds_.indexOf(column) !== -1;
    const filterRowsBySearch = (row) => search_ ? rowSearch(searchableColumns, row, search_) : true;
    const filterRowsBySelected = (row) => selectedRowIds_.includes(row[idField]);
    const filterRowsBySubgroup = (group, subgroup) => (row) => {
        if (!group || subgroup === undefined || !groupableColumns.find((column) => column.id === group))
            return false;
        const value = row[group];
        const groupedValues = Array.isArray(value) ? value : [value];
        return groupedValues.some((value) => String(value) === subgroup);
    };
    const customSort = columns[columns.findIndex((c) => c.id === orderBy_)].sort;
    const filteredColumns = columns.filter(({ id }) => isColumnSelected(id)).filter(({ secret }) => !secret);
    const filteredSortedRows = total ? rows : stableSort(rows, getComparator(order_, orderBy_, customSort, locale, collatorOptions)).filter(filterRowsBySearch);
    const subgroups_ = (0, react_1.useMemo)(() => {
        const column = columns[columns.findIndex((c) => c.id === groupBy_)];
        return column?.groups?.map((group) => ({
            text: group.text,
            value: group.value,
            count: group.count === true ? filteredSortedRows.filter(filterRowsBySubgroup(groupBy_, String(group.value))).length : group.count,
        })) ?? [];
    }, [
        rows,
        columns,
        groupBy_,
        search,
    ]);
    const filteredSortedGroupedRows = total
        ? filteredSortedRows
        : filteredSortedRows.filter((groupBy_ && subgroupBy_ !== undefined && (!subgroups_.length || isValidSubgroup(subgroupBy_, subgroups_)))
            ? filterRowsBySubgroup(groupBy_, subgroupBy_)
            : () => true);
    const filteredSortedGroupedSlicedRows = (localPageStartSlice || localPageEndSlice) ? filteredSortedGroupedRows.slice(localPageStartSlice, localPageEndSlice) : filteredSortedGroupedRows;
    const filteredSortedGroupedSlicedSelectedRows = filteredSortedGroupedSlicedRows.filter(filterRowsBySelected);
    const hasSearchColumns = !!searchableColumns?.length;
    const showSelectables_ = !!(selectActions?.length || showSelectables);
    const hasGroups = !!groupableColumns?.length;
    const columnCount = columns.length + (showSelectables_ ? 1 : 0) + 1;
    const showToolbar = !!localization?.toolbar?.title || !!primaryAction || !!secondaryActions?.length || !!selectActions?.length;
    (0, react_1.useEffect)(() => {
        setSearch(search ?? ``);
    }, [search]);
    (0, react_1.useEffect)(() => {
        if (loading)
            return;
        setSubgroupBy(subgroupBy ?? fallbackSubgroupBy);
    }, [
        subgroupBy,
        groupBy_,
        columns,
    ]);
    (0, react_1.useEffect)(() => {
        setGroupBy(columns.find((column) => column.id === groupBy)?.id ?? fallbackGroupBy);
    }, [groupBy]);
    (0, react_1.useEffect)(() => {
        onSelected?.(selectedRowIds_);
    }, [selectedRowIds_]);
    (0, react_1.useEffect)(() => {
        setOrder([`asc`, `desc`].includes(order ?? ``) ? order : shared_1.DEFAULT_SORT_ORDER);
    }, [order]);
    (0, react_1.useEffect)(() => {
        setOrderBy(columns.find((column) => column.id === orderBy)?.id ?? idField);
    }, [orderBy]);
    (0, react_1.useEffect)(() => {
        if ((0, lodash_1.isEqual)(selectedRows, selectedRowIds_))
            return;
        setSelectedRowIds(selectedRows ?? []);
    }, [selectedRows]);
    (0, react_1.useEffect)(() => {
        onChange({
            columns: selectedColumnIds_,
            rows: total ? rows : filteredSortedGroupedRows.map((row) => (0, lodash_1.pick)(row, selectedColumnIds_)),
            selectedRows: selectedRowIds_,
            rowsPerPage: rowsPerPage,
            total: total ?? filteredSortedGroupedRows.length,
            search: search_,
            order: order_,
            orderBy: orderBy_,
            groupBy: groupBy_,
            subgroupBy: subgroupBy_,
            filters: filters_,
        });
    }, [
        selectedColumnIds_,
        rows,
        selectedRowIds_,
        rowsPerPage,
        search_,
        order_,
        orderBy_,
        groupBy_,
        subgroupBy_,
        filters_,
    ]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        showToolbar && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Toolbar_1.default, { hideSelectStatus: hideSelectStatus, primaryAction: primaryAction, secondaryActions: secondaryActions, selectActions: selectActions, selectedRows: selectedRowIds_, localization: localization?.toolbar }),
            react_1.default.createElement(core_1.Divider, null))),
        hasSearchColumns && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Search_1.default, { value: search_, localization: localization?.search, onChange: handleChangeSearch }),
            react_1.default.createElement(core_1.Divider, null))),
        filters?.length && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Filters_1.default, { filters: filters, onChange: setFilters }),
            react_1.default.createElement(core_1.Divider, null))),
        hasGroups && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(GroupTabs_1.default, { allCount: noGroupTotal ?? filteredSortedRows.length, hideAllGroupTab: hideAllGroupTab, hideNoGroupOption: hideNoGroupOption, groupBy: groupBy_, groups: groupableColumns, subgroupBy: subgroupBy_, subgroups: subgroups_, localization: localization?.groupTabs, onSelectGroup: handleSelectGroup, onSelectSubgroup: handleSelectSubgroup }),
            react_1.default.createElement(core_1.Divider, null))),
        react_1.default.createElement(core_1.TableContainer, null,
            react_1.default.createElement(core_1.Table, null,
                react_1.default.createElement(Head_1.default, { selectMode: selectMode, numSelected: filteredSortedGroupedSlicedSelectedRows.length, order: order_, orderBy: orderBy_, rowCount: filteredSortedGroupedSlicedRows.length, columns: columns, loading: loading, selected: selectedColumnIds_, showSelectables: showSelectables_, hasGroups: hasGroups, hideSelectAll: hideSelectAll, localization: localization?.head, checkboxDropdownLocalization: localization?.checkboxDropdown, columnSelectorLocalization: localization?.columnSelector, onSelectAllClick: handleSelectAllRowsClick, onSelectAllPageClick: handleSelectAllRowsPageClick, onRequestSort: handleRequestSort, onColumnChange: handleColumnSelectClick }),
                react_1.default.createElement(Loading_1.default, { loading: loading, columnCount: columnCount }),
                react_1.default.createElement(Body_1.default, { selectMode: selectMode, columns: filteredColumns, columnCount: columnCount, showSelectables: showSelectables_, idField: idField, loading: loading, rows: filteredSortedGroupedSlicedRows, rowActions: rowActions, selectedRows: selectedRowIds_, localization: localization?.body, rowMoreMenuLocalization: localization?.rowMoreMenu, onRowSelect: handleRowSelectClick }))),
        PaginationComponent && PaginationComponent));
}
exports.default = BaseTable;
