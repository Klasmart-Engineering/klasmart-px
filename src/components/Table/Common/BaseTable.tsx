
import {
    MenuAction,
    MoreMenuLocalization,
} from "../../MoreMenu";
import BaseTableBody,
{ BodyLocalization } from "./Body";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import
{
    Filter,
    FilterLocalization,
    TableFilter,
} from './Filter/Filters';
import
{ SearchLocalization } from "./Filter/Search";
import TableFilterSection from "./Filter/Section";
import BaseTableGroupTabs,
{
    GroupSelectMenuItem,
    GroupTabsLocalization,
    SubgroupTab,
} from "./GroupTabs";
import BaseTableHead,
{
    CustomSort,
    HeadLocalization,
    Order,
    TableColumn,
} from "./Head";
import BaseTableLoading from "./Loading";
import {
    DEFAULT_ROWS_PER_PAGE,
    DEFAULT_SORT_ORDER,
    PaginationLocalization,
} from "./Pagination/shared";
import BaseTableToolbar, {
    ToolbarAction,
    ToolbarLocalization,
    ToolbarSelectAction,
} from "./Toolbar";
import {
    Paper,
    Table,
    TableContainer,
} from "@mui/material";
import {
    escapeRegExp,
    isEqual,
    pick,
    union,
} from "lodash";
import React,
{
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";

const descendingComparator = <T,>(a: T[keyof T], b: T[keyof T], locale?: string, collatorOptions?: Intl.CollatorOptions) => {
    if ((typeof a === `string` && typeof b === `string`) || (a instanceof String && b instanceof String)) {
        const aValue = a as Extract<T[keyof T], string>;
        const bValue = b as Extract<T[keyof T], string>;
        return bValue.localeCompare(aValue, locale, collatorOptions);
    } else {
        if (b < a) return -1;
        if (b > a) return 1;
    }
    return 0;
};

function getComparator<T> (order: Order, orderBy: keyof T, customSort?: CustomSort<T>, locale?: string, collatorOptions?: Intl.CollatorOptions): (a: T, b: T) => number {
    const reverseOrder = order === `desc` ? 1 : -1;
    const sort = customSort ?? descendingComparator;
    return (a, b) => reverseOrder * sort(a[orderBy], b[orderBy], locale, collatorOptions);
}

function stableSort<T> (array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((row, index) => [ row, index ] as [T, number]);
    const ROW = 0;
    const INDEX = 1;
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[ROW], b[ROW]);
        if (order !== 0) return order;
        return a[INDEX] - b[INDEX];
    });
    return stabilizedThis.map((el) => el[ROW]);
}

function defaultSearch <T> (value: T[Extract<keyof T, string>], searchValue: string) {
    const values = Array.isArray(value) ? value : [ value ];
    const regexp = new RegExp(escapeRegExp(searchValue.trim()), `gi`);
    return values.some((value) => {
        const result = String(value)
            .match(regexp);
        return !!result;
    });
}

function rowSearch <T> (searchableColumns: TableColumn<T>[], row: T, searchValue: string) {
    if (searchValue.length === 0 || searchableColumns.length === 0) return true;
    return searchableColumns.some((column) => column.search?.(row[column.id], searchValue) ?? defaultSearch(row[column.id], searchValue));
}

const isValidSubgroup = (subgroup: string, subgroups: SubgroupTab[]) => subgroups.find((s) => String(s.value) === subgroup);

export type SelectMode = `single` | `multiple`;

export interface TableLocalization extends
    ToolbarLocalization,
    SearchLocalization,
    GroupTabsLocalization,
    HeadLocalization,
    ColumnSelectorLocalization,
    CheckboxDropdownLocalization,
    BodyLocalization,
    MoreMenuLocalization,
    PaginationLocalization,
    FilterLocalization {
    }

export interface BaseTableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    selectedRows: T[Extract<keyof T, string>][];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    rowsPerPage: number;
    total: number;
    filters?: Filter[];
}

export interface BaseProps<T> {
    columns: TableColumn<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: string;
    order?: string;
    groupBy?: string;
    subgroupBy?: string;
    rowActions?: (row: T) => MenuAction<T>[];
    rows: T[];
    selectedRows?: T[Extract<keyof T, string>][];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | { value: number; label: string }>;
    search?: string;
    showSelectables?: boolean;
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectActions?: ToolbarSelectAction<T>[];
    loading?: boolean;
    filterValueLoading?: boolean;
    hideAllGroupTab?: boolean;
    hideNoGroupOption?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    total?: number;
    noGroupTotal?: number;
    hideSelectStatus?: boolean;
    selectMode?: SelectMode;
    filters?: TableFilter<T>[];
    onSelected?: (rows: T[Extract<keyof T, string>][]) => void;
    onFilterInputValueChange?: (columnId: string, operator: string, value: string) => void;

}

export interface Props<T> extends BaseProps<T> {
    PaginationComponent?: ReactNode;
    localPageStartSlice?: number;
    localPageEndSlice?: number;
    onChange: (baseTableData: BaseTableData<T>) => void;
}

export default function BaseTable<T> (props: Props<T>) {
    const {
        columns,
        idField,
        order,
        orderBy,
        groupBy,
        subgroupBy,
        rows = [],
        rowsPerPage = DEFAULT_ROWS_PER_PAGE,
        selectedRows,
        localPageStartSlice,
        localPageEndSlice,
        search,
        showSelectables,
        selectMode = `multiple`,
        primaryAction,
        rowActions,
        secondaryActions,
        selectActions,
        loading,
        hideAllGroupTab,
        hideNoGroupOption,
        localization,
        locale,
        collatorOptions,
        total,
        noGroupTotal,
        hideSelectStatus,
        PaginationComponent,
        filters,
        filterValueLoading,
        onChange,
        onSelected,
        onFilterInputValueChange,
    } = props;

    const fallbackGroupBy = hideNoGroupOption ? columns.find((column) => column.groups)?.id : undefined;
    const persistentColumnIds = columns.filter((c) => c.persistent)
        .map(({ id }) => id);
    const selectedColumnIds = columns.filter(({ hidden }) => !hidden)
        .map(({ id }) => id);
    const searchableColumns = columns.filter((c) => !c.disableSearch);
    const groupableColumns: GroupSelectMenuItem<T>[] = columns.filter((c) => c.groups)
        .map(({ id, label }) => ({
            id,
            label,
        }));

    const [ order_, setOrder ] = useState<Order>([ `asc`, `desc` ].includes(order ?? ``) ? order as Order : `desc`);
    const [ orderBy_, setOrderBy ] = useState(columns.find((column) => column.id === orderBy)?.id ?? idField);
    const [ groupBy_, setGroupBy ] = useState(columns.find((column) => column.id === groupBy)?.id ?? fallbackGroupBy);
    const fallbackSubgroupBy = hideAllGroupTab ? columns.find((column) => column.id === groupBy_)?.groups?.[0]?.value?.toString() : undefined;
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy ?? fallbackSubgroupBy);
    const [ selectedRowIds_, setSelectedRowIds ] = useState<T[Extract<keyof T, string>][]>(selectedRows ?? []);
    const [ selectedColumnIds_, setSelectedColumnIds ] = useState(union(selectedColumnIds, persistentColumnIds));
    const [ search_, setSearch ] = useState(search ?? ``);
    const [ filters_, setFilters ] = useState<Filter[]>([]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => {
        const isAsc = orderBy_ === property && order_ === `asc`;
        setOrder(isAsc ? `desc` : `asc`);
        setOrderBy(property);
    };

    const handleSelectAllRowsClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const pageRowIds = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
        if (!checked) {
            setSelectedRowIds(selectedRowIds_.filter((rowId) => !(pageRowIds).includes(rowId)));
            return;
        }
        setSelectedRowIds(union(selectedRowIds_, pageRowIds));
    };

    const handleRowSelectClick = (event: React.MouseEvent<unknown>, rowId: T[Extract<keyof T, string>]) => {
        if (selectMode === `single`) {
            setSelectedRowIds([ rowId ]);
            return;
        }
        const selectedIndex = selectedRowIds_.indexOf(rowId);
        let newSelected: T[Extract<keyof T, string>][] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRowIds_, rowId);
        } else {
            newSelected = selectedRowIds_.filter((id) => id !== rowId);
        }
        setSelectedRowIds(newSelected);
    };

    const handleColumnSelectClick = (columnId: Extract<keyof T, string>) => {
        const selectedIndex = selectedColumnIds_.indexOf(columnId);
        let newSelected: Extract<keyof T, string>[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedColumnIds_, columnId);
        } else {
            newSelected = selectedColumnIds_.filter((id) => id !== columnId);
        }
        setSelectedColumnIds(newSelected);
    };

    const handleSelectGroup = (group: Extract<keyof T, string> | undefined) => {
        setGroupBy(group);
    };

    const handleSelectSubgroup = (subgroup: string | undefined) => {
        setSubgroupBy(subgroup);
    };

    const handleChangeSearch = (value: string) => {
        setSearch(value);
    };

    const isColumnSelected = (column: Extract<keyof T, string>) => selectedColumnIds_.indexOf(column) !== -1;

    const filterRowsBySearch = (row: T) => search_ ? rowSearch(searchableColumns, row, search_) : true;
    const filterRowsBySelected = (row: T) => selectedRowIds_.includes(row[idField]);
    const filterRowsBySubgroup = (group?: keyof T, subgroup?: string | number | boolean) => (row: T) => {
        if (!group || subgroup === undefined || !groupableColumns.find((column) => column.id === group)) return false;
        const value = row[group];
        const groupedValues = Array.isArray(value) ? value as unknown as any[] : [ value ];
        return groupedValues.some((value) => String(value) === subgroup);
    };

    const customSort = columns[columns.findIndex((c) => c.id === orderBy_)].sort;
    const filteredColumns = columns.filter(({ id }) => isColumnSelected(id))
        .filter(({ secret }) => !secret);
    const filteredSortedRows = total ? rows : stableSort(rows, getComparator(order_, orderBy_, customSort, locale, collatorOptions))
        .filter(filterRowsBySearch);

    const subgroups_ = useMemo<SubgroupTab[]>(() => {
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
    const columnCount = columns.length + (showSelectables_ ? 1 : 0) + 1; // +1 for row actions column

    const showToolbar = !!localization?.title || !!primaryAction || !!secondaryActions?.length || hasSearchColumns;

    useEffect(() => {
        setSearch(search ?? ``);
    }, [ search ]);

    useEffect(() => {
        if (loading) return;
        setSubgroupBy(subgroupBy ?? fallbackSubgroupBy);
    }, [
        subgroupBy,
        groupBy_,
        columns,
    ]);

    useEffect(() => {
        setGroupBy(columns.find((column) => column.id === groupBy)?.id ?? fallbackGroupBy);
    }, [ groupBy ]);

    useEffect(() => {
        onSelected?.(selectedRowIds_);
    }, [ selectedRowIds_ ]);

    useEffect(() => {
        setOrder([ `asc`, `desc` ].includes(order ?? ``) ? order as Order : DEFAULT_SORT_ORDER);
    }, [ order ]);

    useEffect(() => {
        setOrderBy(columns.find((column) => column.id === orderBy)?.id ?? idField);
    }, [ orderBy ]);

    useEffect(() => {
        if (isEqual(selectedRows, selectedRowIds_)) return;
        setSelectedRowIds(selectedRows ?? []);
    }, [ selectedRows ]);

    useEffect(() => {
        onChange({
            columns: selectedColumnIds_,
            rows: total ? rows : filteredSortedGroupedRows.map((row) => pick(row, selectedColumnIds_)),
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

    return (
        <>
            {showToolbar && (
                <BaseTableToolbar
                    hideSelectStatus={hideSelectStatus}
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                    selectedRows={selectedRowIds_}
                    localization={{
                        numSelected: localization?.numSelected,
                        title: localization?.title,
                    }}
                />
            )}
            {hasGroups && (
                <BaseTableGroupTabs
                    allCount={noGroupTotal ?? filteredSortedRows.length}
                    hideAllGroupTab={hideAllGroupTab}
                    hideNoGroupOption={hideNoGroupOption}
                    groupBy={groupBy_}
                    groups={groupableColumns}
                    subgroupBy={subgroupBy_}
                    subgroups={subgroups_}
                    localization={{
                        selectLabel: localization?.selectLabel,
                        selectNone: localization?.selectNone,
                        tabAll: localization?.tabAll,
                    }}
                    onSelectGroup={handleSelectGroup}
                    onSelectSubgroup={handleSelectSubgroup}
                />
            )}
            <TableFilterSection
                selectMode={selectMode}
                numSelected={filteredSortedGroupedSlicedSelectedRows.length}
                rowCount={filteredSortedGroupedSlicedRows.length}
                searchValue={search_}
                filters={filters}
                selectedRows={selectedRowIds_}
                selectedFilters={filters_}
                selectActions={selectActions}
                filterValueLoading={filterValueLoading}
                onSearchChange={handleChangeSearch}
                onFilterChange={setFilters}
                onFilterInputValueChange={onFilterInputValueChange}
                onSelectAllClick={handleSelectAllRowsClick}
            />
            <Paper variant="outlined">
                <TableContainer>
                    <Table>
                        <BaseTableHead
                            order={order_}
                            orderBy={orderBy_}
                            columns={columns}
                            selected={selectedColumnIds_}
                            localization={{
                                hideColumnButton: localization?.hideColumnButton,
                            }}
                            showSelectables={showSelectables_}
                            onRequestSort={handleRequestSort}
                            onColumnChange={handleColumnSelectClick}
                        />
                        <BaseTableLoading
                            loading={loading}
                            columnCount={columnCount}
                        />
                        <BaseTableBody
                            selectMode={selectMode}
                            columns={filteredColumns}
                            columnCount={columnCount}
                            showSelectables={showSelectables_}
                            idField={idField}
                            loading={loading}
                            rows={filteredSortedGroupedSlicedRows}
                            rowActions={rowActions}
                            selectedRows={selectedRowIds_}
                            localization={{
                                moreMenuButton: localization?.moreMenuButton,
                                noData: localization?.noData,
                            }}
                            onRowSelect={handleRowSelectClick}
                        />
                    </Table>
                </TableContainer>
                {PaginationComponent}
            </Paper>
        </>
    );
}
