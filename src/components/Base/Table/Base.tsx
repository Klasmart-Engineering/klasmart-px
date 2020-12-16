import React,
{
    useEffect,
    useState,
} from "react";
import {
    Checkbox,
    createStyles,
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
{ ToolbarAction } from "./Toolbar";
import BaseTableSearch from "./Search";
import BaseTableHead,
{
    HeadCell,
    Order,
} from "./Head";
import BaseTableLoading from "./Loading";
import BaseTableRowMoreMenu,
{ RowAction } from "./RowMoreMenu";
import BaseTablePagination from "./Pagination";

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

function sort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [ el, index ] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function rowIncludesSearch <T>(searchValue: string, searchFields: (keyof T)[], row: T) {
    return searchFields.some((searchField) => {
        const value = row[searchField];
        const regexp = new RegExp(searchValue, `gi`);
        const result = String(value).match(regexp);
        return !!result;
    });
}

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

export interface TableData<T> {
    columns: HeadCell<T>[];
    rows: T[];
    search: string;
    searchFields: (keyof T)[];
}

interface Props<T> {
    columns: HeadCell<T>[];
    defaultSort: Extract<keyof T, string>;
    sortOrder?: Order;
    rows: T[];
    rowBuilder: (data: T) => Record<keyof T, any>;
    idField: Extract<keyof T, string>;
    title: string;
    searchFields: (keyof T)[];
    rowActions: RowAction<T>[];
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    loading?: boolean;
    rowsPerPageOptions?: Array<number | { value: number; label: string }>;
}

export default function BaseTable<T>(props: Props<T>) {
    const {
        columns,
        defaultSort,
        sortOrder,
        rows,
        rowBuilder,
        idField,
        title,
        searchFields,
        primaryAction,
        rowActions,
        secondaryActions,
        loading,
        rowsPerPageOptions,
    } = props;
    const classes = useStyles();
    const [ order, setOrder ] = useState<Order>(sortOrder ?? `asc`);
    const [ orderBy, setOrderBy ] = useState(defaultSort);
    const [ selectedRows, setSelectedRows ] = useState<T[keyof T][]>([]);
    const [ selectedColumns, setSelectedColumns ] = useState<(keyof T)[]>(columns.map(({ id }) => id));
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ searchValue, setSearchValue ] = useState(``);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => {
        const isAsc = orderBy === property && order === `asc`;
        setOrder(isAsc ? `desc` : `asc`);
        setOrderBy(property);
    };

    const handleSelectAllRowsClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setSelectedRows([]);
            return;
        }
        const newSelecteds = rows.map((n) => n[idField]);
        setSelectedRows(newSelecteds);
    };

    const handleRowSelectClick = (event: React.MouseEvent<unknown>, rowId: T[keyof T]) => {
        const selectedIndex = selectedRows.indexOf(rowId);
        let newSelected: T[keyof T][] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, rowId);
        } else {
            newSelected = selectedRows.filter((id) => id !== rowId);
        }
        setSelectedRows(newSelected);
    };

    const handleColumnSelectClick = (event: React.MouseEvent<unknown>, columnId: keyof T) => {
        const selectedIndex = selectedColumns.indexOf(columnId);
        let newSelected: (keyof T)[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedColumns, columnId);
        } else {
            newSelected = selectedColumns.filter((id) => id !== columnId);
        }
        setSelectedColumns(newSelected);
    };

    useEffect(() => {
        setPage(0);
    }, [ searchValue ]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isRowSelected = (idFieldValue: T[keyof T]) => selectedRows.indexOf(idFieldValue) !== -1;

    const isColumnSelected = (column: keyof T) => selectedColumns.indexOf(column) !== -1;

    const filteredSortedRows = sort(rows, getComparator(order, orderBy))
        .filter((row) => searchValue
            ? rowIncludesSearch(searchValue, searchFields, row)
            : true,
        );

    const filteredColumns = columns.filter((headCell) => isColumnSelected(headCell.id));

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <BaseTableToolbar
                    title={title}
                    primaryAction={primaryAction}
                    secondaryActions={secondaryActions}
                    numSelected={selectedRows.length}
                    tableData={{
                        columns: filteredColumns,
                        rows: filteredSortedRows,
                        search: searchValue,
                        searchFields,
                    }}
                />
                <BaseTableSearch
                    value={searchValue}
                    setValue={setSearchValue}
                />
                <TableContainer>
                    <Table>
                        <BaseTableHead
                            numSelected={selectedRows.length}
                            order={order}
                            orderBy={orderBy}
                            rowCount={rows.length}
                            headCells={columns}
                            selected={selectedColumns}
                            onSelectAllClick={handleSelectAllRowsClick}
                            onRequestSort={handleRequestSort}
                            onColumnChange={handleColumnSelectClick}
                        />
                        <BaseTableLoading
                            loading={loading}
                            columnCount={columns.length + 2}
                        />
                        <TableBody>
                            {filteredSortedRows.length === 0 &&
                                <TableRow tabIndex={-1}>
                                    <TableCell
                                        colSpan={columns.length + 2}
                                        align="center"
                                    >
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            }
                            {filteredSortedRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => {
                                    const isSelected = isRowSelected(row[idField]);
                                    const labelId = `enhanced-table-checkbox-${i}`;
                                    return (
                                        <TableRow
                                            key={row[idField] as Extract<T[Extract<keyof T, string>], string>}
                                            hover
                                            tabIndex={-1}
                                            className={classes.row}
                                        >
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
                                            {filteredColumns.map((headCell, j) => {
                                                const cellLayout = rowBuilder(row)[headCell.id];
                                                const isObject = typeof cellLayout === `object`;
                                                return <TableCell
                                                    key={`rowCell-${i}-${j}`}
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align={headCell.align}
                                                    style={{
                                                        paddingTop: isObject ? 0 : undefined,
                                                        paddingBottom: isObject ? 0 : undefined,
                                                    }}
                                                >
                                                    {cellLayout}
                                                </TableCell>;
                                            })}
                                            <TableCell padding="checkbox">
                                                <BaseTableRowMoreMenu
                                                    item={row}
                                                    actions={rowActions}
                                                />
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
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
