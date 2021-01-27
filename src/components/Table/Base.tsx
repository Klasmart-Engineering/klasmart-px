import React,
{
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    createStyles,
    Divider,
    makeStyles,
    Table,
    TableContainer,
    Theme,
} from "@material-ui/core";
import BaseTableToolbar,
{
    ToolbarAction,
    ToolbarLocalization,
} from "./Toolbar";
import BaseTableSearch from "./Search";
import BaseTableHead,
{
    CustomGroup,
    CustomSort,
    HeadLocalization,
    Order,
    TableColumn,
} from "./Head";
import BaseTableLoading from "./Loading";
import {
    MenuAction,
    MoreMenuLocalization,
} from "../MoreMenu";
import BaseTablePagination,
{ PaginationLocalization } from "./Pagination";
import BaseTableGroupTabs,
{
    GroupSelectMenuItem,
    GroupTabsLocalization,
    SubgroupTab,
} from "./GroupTabs";
import {
    clamp,
    escapeRegExp,
    pick,
    union,
    uniq,
} from "lodash";
import {
    CheckboxDropdownLocalization,
    CheckboxDropdownValue,
} from "./CheckboxDropdown";
import { SearchLocalization } from "./Search";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import BaseTableBody,
{ BodyLocalization } from "./Body";

function descendingComparator<T>(a: T[keyof T], b: T[keyof T], locale?: string, collatorOptions?: Intl.CollatorOptions) {
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

function getComparator<T>(order: Order, orderBy: keyof T, customSort?: CustomSort<T>, locale?: string, collatorOptions?: Intl.CollatorOptions): (a: T, b: T) => number {
    const reverseOrder = order === `desc` ? 1 : -1;
    const sort = customSort ?? descendingComparator;
    return (a, b) => reverseOrder * sort(a[orderBy], b[orderBy], locale, collatorOptions);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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

function defaultSearch <T>(value: T[Extract<keyof T, string>], searchValue: string) {
    const values = Array.isArray(value) ? value : [ value ];
    const regexp = new RegExp(escapeRegExp(searchValue.trim()), `gi`);
    return values.some((value) => {
        const result = String(value).match(regexp);
        return !!result;
    });
}

function rowSearch <T>(searchableColumns: TableColumn<T>[], row: T, searchValue: string) {
    if (searchValue.length === 0 || searchableColumns.length === 0) return true;
    return searchableColumns.some((column) => column.search?.(row[column.id], searchValue) ?? defaultSearch(row[column.id], searchValue));
}

const isValidGroup = <T,>(group: keyof T, groups?: GroupSelectMenuItem<T>[]) => !!(group && groups?.find((g) => g.id === group) ? group : undefined);

const isValidSubgroup = <T,>(subgroup: string, subgroups?: SubgroupTab<T>[]) => (subgroup !== undefined && subgroups?.find((s) => s.text === subgroup) ? subgroup : undefined) !== undefined;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: `100%`,
        },
    }),
);

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

export interface TableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    page: number;
    rowsPerPage: number;
}

interface Props<T> {
    columns: TableColumn<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: Extract<keyof T, string>;
    order?: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    rowActions?: (row: T) => MenuAction<T>[];
    rows: T[];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | { value: number; label: string }>;
    page?: number;
    search?: string;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    onChange?: (data: TableData<T>) => void;
}

export default function BaseTable<T>(props: Props<T>) {
    const {
        columns,
        idField,
        order,
        orderBy,
        groupBy,
        subgroupBy,
        rows = [],
        rowsPerPage,
        rowsPerPageOptions = [
            10,
            25,
            50,
        ],
        page,
        search,
        primaryAction,
        rowActions,
        secondaryActions,
        selectActions,
        loading,
        localization,
        locale,
        collatorOptions,
        onChange,
    } = props;

    const classes = useStyles();

    const persistentColumnIds = columns.filter((c) => c.persistent).map(({ id }) => id);
    const selectedColumnIds = columns.filter(({ hidden }) => !hidden).map(({ id }) => id);
    const searchableColumns = columns.filter((c) => !c.disableSearch);
    const groupableColumns: GroupSelectMenuItem<T>[] = columns.filter((c) => c.groupable || c.groupText || c.groupSort || c.groups).map(({ id, label }) => ({
        id,
        label,
    }));

    const [ order_, setOrder ] = useState(order ?? `asc`);
    const [ orderBy_, setOrderBy ] = useState(orderBy ?? idField);
    const [ groupBy_, setGroupBy ] = useState(groupBy);
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy);
    const [ selectedRows_, setSelectedRows ] = useState<T[Extract<keyof T, string>][]>([]);
    const [ selectedColumns_, setSelectedColumns ] = useState(union(selectedColumnIds, persistentColumnIds));
    const [ page_, setPage ] = useState(page ?? 0);
    const [ rowsPerPage_, setRowsPerPage ] = useState(rowsPerPage ?? 10);
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
            setSelectedRows(newSelecteds);
            return;
        }
        case `allPages`: {
            const newSelecteds = filteredSortedGroupedRows.map((n) => n[idField]);
            setSelectedRows(selectedRows_.concat(newSelecteds));
            return;
        }
        case `none`: {
            setSelectedRows([]);
            return;
        }
        case `page`: {
            const pageRows = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
            setSelectedRows(union(selectedRows_, pageRows));
            return;
        }
        }
    };

    const handleSelectAllRowsPageClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pageRows = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
        if (!event.target.checked) {
            setSelectedRows(selectedRows_.filter((rowId) => !(pageRows).includes(rowId)));
            return;
        }
        setSelectedRows(union(selectedRows_, pageRows));
    };

    const handleRowSelectClick = (event: React.MouseEvent<unknown>, rowId: T[Extract<keyof T, string>]) => {
        const selectedIndex = selectedRows_.indexOf(rowId);
        let newSelected: T[Extract<keyof T, string>][] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows_, rowId);
        } else {
            newSelected = selectedRows_.filter((id) => id !== rowId);
        }
        setSelectedRows(newSelected);
    };

    const handleColumnSelectClick = (event: React.MouseEvent<unknown>, columnId: Extract<keyof T, string>) => {
        const selectedIndex = selectedColumns_.indexOf(columnId);
        let newSelected: Extract<keyof T, string>[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedColumns_, columnId);
        } else {
            newSelected = selectedColumns_.filter((id) => id !== columnId);
        }
        setSelectedColumns(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectGroup = (group: keyof T | undefined) => {
        setGroupBy(group);
    };

    const handleSelectSubgroup = (subgroup: string | undefined) => {
        setSubgroupBy(subgroup);
        setPage(0);
    };

    const handleChangeSearch = (value: string) => {
        setSearch(value);
        setPage(0);
    };

    const isColumnSelected = (column: Extract<keyof T, string>) => selectedColumns_.indexOf(column) !== -1;

    const filterRowsBySearch = (row: T) => search_ ? rowSearch(searchableColumns, row, search_) : true;
    const filterRowsBySelected = (row: T) => selectedRows_.includes(row[idField]);
    const filterRowsBySubgroup = (group?: keyof T, subgroup?: string, customGroupText?: CustomGroup<T>) => (row: T) => {
        if (!group || subgroup === undefined) return false;
        const value = customGroupText?.(row[group]) ?? row[group];
        const groupedValues = Array.isArray(value) ? value as unknown as any[] : [ value ];
        return groupedValues.some((value) => value === subgroup);
    };

    const customSort = columns[columns.findIndex((c) => c.id === orderBy_)].sort;
    const customGroupText = columns[columns.findIndex((c) => c.id === groupBy_)]?.groupText;

    const filteredColumns = columns.filter(({ id }) => isColumnSelected(id));
    const filteredColumnIds = filteredColumns.map(({ id }) => id);

    const filteredSortedRows = stableSort(rows, getComparator(order_, orderBy_, customSort, locale, collatorOptions))
        .filter(filterRowsBySearch);

    const subgroups_ = useMemo<SubgroupTab<T>[]>(() => {
        const column = columns[columns.findIndex((c) => c.id === groupBy_)];
        return (column?.groups ?? stableSort(groupBy_ && isValidGroup(groupBy_, groupableColumns)
            ? uniq(rows.flatMap((row) => {
                const value = customGroupText?.(row[groupBy_]) ?? row[groupBy_];
                return Array.isArray(value) ? value : [ value ];
            })).map((value) => ({
                text: String(value),
            }))
            : [], getComparator(`asc`, `text`, column?.groupSort, locale, collatorOptions),
        )).map(({ text }) => ({
            text,
            count: filteredSortedRows.filter(filterRowsBySubgroup(groupBy_, text, customGroupText)).length,
        }));
    }, [
        rows,
        groupBy_,
        search_,
    ]);
    const filteredSortedGroupedRows = filteredSortedRows.filter((groupBy_ && subgroupBy_ !== undefined && isValidSubgroup(subgroupBy_, subgroups_)) ? filterRowsBySubgroup(groupBy_, subgroupBy_, customGroupText) : () => true);
    const filteredSortedSelectedRows = filteredSortedRows.filter(filterRowsBySelected);
    const filteredSortedGroupedSelectedRows = filteredSortedGroupedRows.filter(filterRowsBySelected);
    const filteredSortedGroupedSlicedRows = filteredSortedGroupedRows.slice(page_ * rowsPerPage_, page_ * rowsPerPage_ + rowsPerPage_);
    const filteredSortedGroupedSlicedSelectedRows = filteredSortedGroupedSlicedRows.filter(filterRowsBySelected);

    const hasSearchColumns = !!searchableColumns?.length;
    const hasRowActions = !!rowActions;
    const hasSelectActions = !!selectActions?.length;
    const hasGroups = !!groupableColumns?.length;
    const columnCount = columns.length + (hasRowActions ? 1 : 0) + (hasSelectActions ? 1 : 0);
    const showToolbar = !!localization?.toolbar?.title || !!primaryAction || !!secondaryActions?.length || !!selectActions?.length;
    const lastPage = Math.ceil(filteredSortedGroupedRows.length / rowsPerPage_) - 1;

    const tableData: TableData<T> = {
        columns: filteredColumnIds,
        rows: (filteredSortedGroupedSelectedRows.length === 0 ? filteredSortedGroupedRows : filteredSortedGroupedSelectedRows).map((row) => pick(row, filteredColumnIds)),
        search: search_,
        order: order_,
        orderBy: orderBy_,
        page: page_,
        rowsPerPage: rowsPerPage_,
        groupBy: groupBy_,
        subgroupBy: subgroupBy_,
    };

    useEffect(() => {
        // set start page when loading finishes
        if (loading) return;
        const newPage = clamp(page ?? page_, 0, lastPage);
        if (newPage === page_) return;
        setPage(clamp(page ?? page_, 0, lastPage));
    }, [ rows ]);

    useEffect(() => {
        // clamp page
        const newPage = clamp(page_, 0, lastPage);
        if (newPage === page_) return;
        setPage(clamp(page_, 0, lastPage));
    }, [ page_ ]);

    useEffect(() => {
        onChange?.(tableData);
    }, [ tableData ]);

    return (
        <div className={classes.root}>
            {showToolbar && <>
                <BaseTableToolbar
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                    selectActions={selectActions}
                    numSelected={filteredSortedSelectedRows.length}
                    tableData={tableData}
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
                    allCount={filteredSortedRows.length}
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
                        numSelected={filteredSortedGroupedSlicedSelectedRows.length}
                        order={order_}
                        orderBy={orderBy_}
                        rowCount={filteredSortedGroupedSlicedRows.length}
                        columns={columns}
                        selected={selectedColumns_}
                        hasSelectActions={hasSelectActions}
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
                        columns={filteredColumns}
                        columnCount={columnCount}
                        hasSelectActions={hasSelectActions}
                        idField={idField}
                        rows={filteredSortedGroupedSlicedRows}
                        rowActions={rowActions}
                        selectedRows={selectedRows_}
                        localization={localization?.body}
                        rowMoreMenuLocalization={localization?.rowMoreMenu}
                        onRowSelect={handleRowSelectClick}
                    />
                </Table>
            </TableContainer>
            <BaseTablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={filteredSortedGroupedRows.length}
                rowsPerPage={rowsPerPage_}
                page={page_}
                localization={localization?.pagination}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}
