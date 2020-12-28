import React,
{
    useEffect,
    useState,
} from "react";
import {
    Checkbox,
    createStyles,
    Divider,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
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
    HeadLocalization,
    Order,
    TableColumn,
} from "./Head";
import BaseTableLoading from "./Loading";
import BaseTableRowMoreMenu,
{
    RowAction,
    RowMoreMenuLocalization,
} from "./RowMoreMenu";
import BaseTablePagination,
{ PaginationLocalization } from "./Pagination";
import BaseTableGroupTabs,
{
    GroupSelectMenuItem,
    GroupTabsLocalization,
    SubgroupTab,
} from "./GroupTabs";
import { pick } from "lodash";
import {
    CheckboxDropdownLocalization,
    CheckboxDropdownValue,
} from "./CheckboxDropdown";
import { SearchLocalization } from "./Search";
import { ColumnSelectorLocalization } from "./ColumnSelector";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
    return order === `desc`
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [ el, index ] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function rowIncludesSearch <T>(searchValue: string, searchFieldValues: (keyof T)[], row: T) {
    if (searchFieldValues.length === 0) return true;
    return searchFieldValues.some((fieldValue) => {
        const value = row[fieldValue];
        const values = Array.isArray(value) ? value : [ value ];
        const regexp = new RegExp(searchValue, `gi`);
        return values.some((value) => {
            const result = String(value).match(regexp);
            return !!result;
        });
    });
}

const getDistinct = (items: any[]) => [ ...Array.from(new Set(items)) ];

const isValidGroup = <T,>(group: keyof T, groups?: GroupSelectMenuItem<T>[]) => !!(group && groups?.find((g) => g.id === group) ? group : undefined);

const isValidSubgroup = <T,>(subgroup: T[keyof T], subgroups?: SubgroupTab<T>[]) => !!(subgroup && subgroups?.find((s) => s.id === subgroup) ? subgroup : undefined);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: `100%`,
        },
        paper: {
            width: `100%`,
            marginBottom: theme.spacing(2),
        },
        row: {
            height: 53,
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
    body?: TableBodyLocalization;
    rowMoreMenu?: RowMoreMenuLocalization;
    pagination?: PaginationLocalization;
}

export interface TableBodyLocalization {
    noData?: string;
}

export interface TableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: T[keyof T];
    page: number;
    rowsPerPage: number;
}

interface Props<T> {
    columns: TableColumn<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: Extract<keyof T, string>;
    order?: Order;
    groupBy?: keyof T;
    subgroupBy?: T[keyof T];
    rowActions?: (row: T) => RowAction<T>[];
    rows: T[];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | { value: number; label: string }>;
    search?: string;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
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
        rows,
        rowsPerPage,
        rowsPerPageOptions = [
            10,
            25,
            50,
        ],
        search = ``,
        primaryAction,
        rowActions,
        secondaryActions,
        selectActions,
        loading,
        localization,
        onChange,
    } = props;

    const classes = useStyles();

    const persistentColumnIds = columns.filter(({ persistent }) => persistent).map(({ id }) => id);
    const searchableColumnIds = columns.filter(({ searchable }) => searchable).map(({ id }) => id);
    const selectedColumnIds = columns.filter(({ hidden }) => !hidden).map(({ id }) => id);
    const groupableColumns: GroupSelectMenuItem<T>[] = columns.filter(({ groupable }) => groupable).map(({ id, label }) => ({
        id,
        label,
    }));

    const [ order_, setOrder ] = useState(order ?? `asc`);
    const [ orderBy_, setOrderBy ] = useState(orderBy ?? idField);
    const [ groupBy_, setGroupBy ] = useState(groupBy);
    const [ subgroups_, setSubgroups ] = useState<SubgroupTab<T>[]>();
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy);
    const [ selectedRows_, setSelectedRows ] = useState<T[Extract<keyof T, string>][]>([]);
    const [ selectedColumns_, setSelectedColumns ] = useState(getDistinct(selectedColumnIds.concat(persistentColumnIds)));
    const [ page_, setPage ] = useState(0);
    const [ rowsPerPage_, setRowsPerPage ] = useState(rowsPerPage ?? 10);
    const [ search_, setSearch ] = useState(search);

    useEffect(() => {
        setPage(0);
    }, [
        search_,
        groupBy_,
        subgroupBy_,
    ]);

    useEffect(() => {
        const subgroupIds = groupBy_ && isValidGroup(groupBy_, groupableColumns) ? getDistinct(rows.map(row => row[groupBy_])) : [];
        const subgroups = subgroupIds.map((id) => ({
            id,
            count: filteredSortedRows.filter(filterRowsBySubgroup(id, false)).length,
        }));
        setSubgroups(subgroups);
    }, [
        rows,
        groupBy_,
        search_,
    ]);

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
            const selecteds = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
            setSelectedRows(getDistinct(selectedRows_.concat(selecteds)));
            return;
        }
        }
    };

    const handleSelectAllRowsPageClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selecteds = filteredSortedGroupedSlicedRows.map((n) => n[idField]);
        if (!event.target.checked) {
            setSelectedRows(selectedRows_.filter((rowId) => !(selecteds).includes(rowId)));
            return;
        }
        setSelectedRows(getDistinct(selectedRows_.concat(selecteds)));
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

    const handleColumnSelectClick = (event: React.MouseEvent<unknown>, columnId: keyof T) => {
        const selectedIndex = selectedColumns_.indexOf(columnId);
        let newSelected: (keyof T)[] = [];
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

    const isRowSelected = (idFieldValue: T[Extract<keyof T, string>]) => selectedRows_.indexOf(idFieldValue) !== -1;
    const isColumnSelected = (column: keyof T) => selectedColumns_.indexOf(column) !== -1;

    const filterRowsBySearch = (row: T) => search_ ? rowIncludesSearch(search_, searchableColumnIds, row) : true;
    const filterRowsBySelected = (row: T) => selectedRows_.includes(row[idField]);
    const filterRowsBySubgroup = (subgroup?: T[keyof T], inclusive = true) => (row: T) => (subgroup && groupBy_ && (!inclusive || isValidSubgroup(subgroup, subgroups_))) ? subgroup === row[groupBy_] : inclusive;

    const filteredColumns = columns.filter(({ id }) => isColumnSelected(id));
    const filteredColumnIds = filteredColumns.map(({ id }) => id);

    const filteredSortedRows = stableSort(rows, getComparator(order_, orderBy_))
        .filter(filterRowsBySearch);
    const filteredSortedGroupedRows = filteredSortedRows.filter(filterRowsBySubgroup(subgroupBy_));
    const filteredSortedSelectedRows = filteredSortedRows.filter(filterRowsBySelected);
    const filteredSortedGroupedSelectedRows = filteredSortedGroupedRows.filter(filterRowsBySelected);
    const filteredSortedGroupedSlicedRows = filteredSortedGroupedRows.slice(page_ * rowsPerPage_, page_ * rowsPerPage_ + rowsPerPage_);
    const filteredSortedGroupedSlicedSelectedRows = filteredSortedGroupedSlicedRows.filter(filterRowsBySelected);

    const hasSearchColumns = !!searchableColumnIds?.length;
    const hasRowActions = !!rowActions?.length;
    const hasSelectActions = !!selectActions?.length;
    const hasGroups = !!groupableColumns?.length;
    const columnCount = columns.length + (hasRowActions ? 1 : 0) + (hasSelectActions ? 1 : 0);

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
        if (!onChange) return;
        onChange(tableData);
    }, [ tableData ]);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <BaseTableToolbar
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                    selectActions={selectActions}
                    numSelected={filteredSortedSelectedRows.length}
                    tableData={tableData}
                    localization={localization?.toolbar}
                />
                <Divider />
                {hasSearchColumns &&
                    <BaseTableSearch
                        value={search_}
                        setValue={setSearch}
                        localization={localization?.search}
                    />
                }
                {hasGroups &&
                    <BaseTableGroupTabs
                        allCount={filteredSortedRows.length}
                        groupBy={groupBy_}
                        groups={groupableColumns}
                        subgroupBy={subgroupBy_}
                        subgroups={subgroups_}
                        localization={localization?.groupTabs}
                        onSelectGroup={setGroupBy}
                        onSelectSubgroup={setSubgroupBy}
                    />
                }
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
                        <TableBody>
                            {filteredSortedGroupedRows.length === 0 &&
                                <TableRow tabIndex={-1}>
                                    <TableCell
                                        colSpan={columnCount}
                                        align="center"
                                    >
                                        {localization?.body?.noData ?? `No results found`}
                                    </TableCell>
                                </TableRow>
                            }
                            {filteredSortedGroupedSlicedRows.map((row, i) => {
                                const isSelected = isRowSelected(row[idField]);
                                const labelId = `enhanced-table-checkbox-${i}`;
                                return (
                                    <TableRow
                                        key={row[idField] as Extract<T[Extract<keyof T, string>], string>}
                                        hover
                                        tabIndex={-1}
                                        className={classes.row}
                                    >
                                        {hasSelectActions &&
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        role="checkbox"
                                                        checked={isSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                        onClick={(event) => handleRowSelectClick(event, row[idField])}
                                                    />
                                                </TableCell>
                                        }
                                        {filteredColumns.map((column, j) => {
                                            const render = column.render?.(row);
                                            const element = render ?? row[column.id];
                                            return <TableCell
                                                key={`rowCell-${i}-${j}`}
                                                id={labelId}
                                                scope="row"
                                                align={column.align}
                                            >
                                                {element}
                                            </TableCell>;
                                        })}
                                        <TableCell padding="checkbox">
                                            {rowActions && rowActions.length > 0 &&
                                                <BaseTableRowMoreMenu
                                                    item={row}
                                                    actions={rowActions(row)}
                                                    localization={localization?.rowMoreMenu}
                                                />
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <BaseTablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={filteredSortedRows.length}
                    rowsPerPage={rowsPerPage_}
                    page={page_}
                    localization={localization?.pagination}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
