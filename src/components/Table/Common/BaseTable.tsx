import {
    MenuAction,
    MoreMenuLocalization,
} from "../../MoreMenu";
import BaseTableBody,
{ BodyLocalization } from "./Body";
import {
    CheckboxDropdownLocalization,
    CheckboxDropdownValue,
} from "./CheckboxDropdown";
import { ColumnSelectorLocalization } from "./ColumnSelector";
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
    PaginationLocalization,
    ROWS_PER_PAGE,
} from "./Pagination/shared";
import BaseTableSearch,
{ SearchLocalization } from "./Search";
import BaseTableToolbar, {
    ToolbarAction,
    ToolbarLocalization,
    ToolbarSelectAction,
} from "./Toolbar";
import {
    createStyles,
    Divider,
    makeStyles,
    Table,
    TableContainer,
    Theme,
} from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) => createStyles({}));

function descendingComparator<T> (a: T[keyof T], b: T[keyof T], locale?: string, collatorOptions?: Intl.CollatorOptions) {
    if ((typeof a === `string` && typeof b === `string`) || (a instanceof String && b instanceof String)) {
        const aValue = a as Extract<T[keyof T], string>;
        const bValue = b as Extract<T[keyof T], string>;
        return bValue.localeCompare(aValue, locale, collatorOptions);
    } else {
        if (b < a) return -1;
        if (b > a) return 1;
    }
    return 0;
}

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
        const result = String(value).match(regexp);
        return !!result;
    });
}

function rowSearch <T> (searchableColumns: TableColumn<T>[], row: T, searchValue: string) {
    if (searchValue.length === 0 || searchableColumns.length === 0) return true;
    return searchableColumns.some((column) => column.search?.(row[column.id], searchValue) ?? defaultSearch(row[column.id], searchValue));
}

const isValidSubgroup = (subgroup: string, subgroups: SubgroupTab[]) => subgroups.find((s) => String(s.value) === subgroup);

export type SelectMode = `single` | `multiple`;

export interface TableLocalization {
    toolbar?: ToolbarLocalization;
    search?: SearchLocalization;
    groupTabs?: GroupTabsLocalization;
    head?: HeadLocalization;
    columnSelector?: ColumnSelectorLocalization;
    checkboxDropdown?: CheckboxDropdownLocalization;
    body?: BodyLocalization;
    rowMoreMenu?: MoreMenuLocalization;
    pagination?: PaginationLocalization;
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
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    total?: number;
    noGroupTotal?: number;
    hideSelectStatus?: boolean;
    selectMode?: SelectMode;
    onSelected?: (rows: T[Extract<keyof T, string>][]) => void;
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
        rowsPerPage = ROWS_PER_PAGE,
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
        localization,
        locale,
        collatorOptions,
        total,
        noGroupTotal,
        hideSelectStatus,
        PaginationComponent,
        onChange,
        onSelected,
    } = props;

    const classes = useStyles();

    const persistentColumnIds = columns.filter((c) => c.persistent).map(({ id }) => id);
    const selectedColumnIds = columns.filter(({ hidden }) => !hidden).map(({ id }) => id);
    const searchableColumns = columns.filter((c) => !c.disableSearch);
    const groupableColumns: GroupSelectMenuItem<T>[] = columns.filter((c) => c.groups).map(({ id, label }) => ({
        id,
        label,
    }));

    const [ order_, setOrder ] = useState<Order>([ `asc`, `desc` ].includes(order ?? ``) ? order as Order : `desc`);
    const [ orderBy_, setOrderBy ] = useState(columns.find((column) => column.id === orderBy)?.id ?? idField);
    const [ groupBy_, setGroupBy ] = useState(columns.find((column) => column.id === groupBy)?.id);
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy);
    const [ selectedRowIds_, setSelectedRowIds ] = useState<T[Extract<keyof T, string>][]>(selectedRows ?? []);
    const [ selectedColumnIds_, setSelectedColumnIds ] = useState(union(selectedColumnIds, persistentColumnIds));
    const [ search_, setSearch ] = useState(search ?? ``);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => {
        const isAsc = orderBy_ === property && order_ === `asc`;
        setOrder(isAsc ? `desc` : `asc`);
        setOrderBy(property);
    };

    const handleSelectAllRowsClick = (event: React.MouseEvent<HTMLLIElement>, value: CheckboxDropdownValue) => {
        switch (value) {
        case `all`: {
            const newSelecteds = filteredSortedRows.map((n) => n[idField]);
            setSelectedRowIds(newSelecteds);
            return;
        }
        case `allPages`: {
            const newSelecteds = filteredSortedGroupedRows.map((n) => n[idField]);
            setSelectedRowIds(selectedRowIds_.concat(newSelecteds));
            return;
        }
        case `none`: {
            setSelectedRowIds([]);
            return;
        }
        case `page`: {
            const pageRows = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
            setSelectedRowIds(union(selectedRowIds_, pageRows));
            return;
        }
        }
    };

    const handleSelectAllRowsPageClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageRowIds = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
        if (!event.target.checked) {
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
    const filteredColumns = columns.filter(({ id }) => isColumnSelected(id)).filter(({ secret }) => !secret);
    const filteredSortedRows = stableSort(rows, getComparator(order_, orderBy_, customSort, locale, collatorOptions)).filter(filterRowsBySearch);

    const subgroups_ = useMemo<SubgroupTab[]>(() => {
        const column = columns[columns.findIndex((c) => c.id === groupBy_)];
        return column?.groups?.map((group) => ({
            text: group.text,
            value: group.value,
            count: group.count ?? filteredSortedRows.filter(filterRowsBySubgroup(groupBy_, String(group.value))).length,
        })) ?? [];
    }, [
        rows,
        columns,
        groupBy_,
        search,
    ]);

    const filteredSortedGroupedRows = filteredSortedRows.filter((groupBy_ && subgroupBy_ !== undefined && (!subgroups_.length || isValidSubgroup(subgroupBy_, subgroups_)))
        ? filterRowsBySubgroup(groupBy_, subgroupBy_)
        : () => true);

    const filteredSortedGroupedSlicedRows = (localPageStartSlice || localPageEndSlice) ? filteredSortedGroupedRows.slice(localPageStartSlice, localPageEndSlice) : filteredSortedGroupedRows;
    const filteredSortedGroupedSlicedSelectedRows = filteredSortedGroupedSlicedRows.filter(filterRowsBySelected);

    const hasSearchColumns = !!searchableColumns?.length;
    const showSelectables_ = !!(selectActions?.length || showSelectables);
    const hasGroups = !!groupableColumns?.length;
    const columnCount = columns.length + (showSelectables_ ? 1 : 0) + 1; // +1 for row actions column

    const showToolbar = !!localization?.toolbar?.title || !!primaryAction || !!secondaryActions?.length || !!selectActions?.length;

    useEffect(() => {
        setSearch(search ?? ``);
    }, [ search ]);

    useEffect(() => {
        setSubgroupBy(subgroupBy);
    }, [ subgroupBy ]);

    useEffect(() => {
        setGroupBy(columns.find((column) => column.id === groupBy)?.id);
    }, [ groupBy ]);

    useEffect(() => {
        onSelected?.(selectedRowIds_);
    }, [ selectedRowIds_ ]);

    useEffect(() => {
        setOrder([ `asc`, `desc` ].includes(order ?? ``) ? order as Order : `asc`);
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
            rows: filteredSortedGroupedRows.map((row) => pick(row, selectedColumnIds_)),
            selectedRows: selectedRowIds_,
            rowsPerPage: rowsPerPage,
            total: total ?? filteredSortedGroupedRows.length,
            search: search_,
            order: order_,
            orderBy: orderBy_,
            groupBy: groupBy_,
            subgroupBy: subgroupBy_,
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
    ]);

    return (
        <>
            {showToolbar && <>
                <BaseTableToolbar
                    hideSelectStatus={hideSelectStatus}
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                    selectActions={selectActions}
                    selectedRows={selectedRowIds_}
                    localization={localization?.toolbar}
                />
                <Divider />
            </>}
            {hasSearchColumns && <>
                <BaseTableSearch
                    value={search_}
                    localization={localization?.search}
                    onChange={handleChangeSearch}
                />
                <Divider />
            </>}
            {hasGroups && <>
                <BaseTableGroupTabs
                    allCount={noGroupTotal ?? filteredSortedRows.length}
                    groupBy={groupBy_}
                    groups={groupableColumns}
                    subgroupBy={subgroupBy_}
                    subgroups={subgroups_}
                    localization={localization?.groupTabs}
                    onSelectGroup={handleSelectGroup}
                    onSelectSubgroup={handleSelectSubgroup}
                />
                <Divider />
            </>}
            <TableContainer>
                <Table>
                    <BaseTableHead
                        selectMode={selectMode}
                        numSelected={filteredSortedGroupedSlicedSelectedRows.length}
                        order={order_}
                        orderBy={orderBy_}
                        rowCount={filteredSortedGroupedSlicedRows.length}
                        columns={columns}
                        loading={loading}
                        selected={selectedColumnIds_}
                        showSelectables={showSelectables_}
                        hasGroups={hasGroups}
                        localization={localization?.head}
                        checkboxDropdownLocalization={localization?.checkboxDropdown}
                        columnSelectorLocalization={localization?.columnSelector}
                        onSelectAllClick={handleSelectAllRowsClick}
                        onSelectAllPageClick={handleSelectAllRowsPageClick}
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
                        localization={localization?.body}
                        rowMoreMenuLocalization={localization?.rowMoreMenu}
                        onRowSelect={handleRowSelectClick}
                    />
                </Table>
            </TableContainer>
            {PaginationComponent && PaginationComponent}
        </>
    );
}
