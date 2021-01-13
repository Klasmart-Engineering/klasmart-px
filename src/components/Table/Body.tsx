import React from "react";
import {
    Checkbox,
    createStyles,
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
} from "@material-ui/core";
import BaseTableRowMoreMenu,
{
    RowAction,
    RowMoreMenuLocalization,
} from "./RowMoreMenu";
import { TableColumn } from "./Head";

const useStyles = makeStyles((theme) => createStyles({
    row: {
        height: 53,
    },
}));

export interface BodyLocalization {
    noData?: string;
}

interface Props<T> {
    columns: TableColumn<T>[];
    columnCount: number;
    hasSelectActions: boolean;
    idField: Extract<keyof T, string>;
    rowActions?: (row: T) => RowAction<T>[];
    rows: T[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: BodyLocalization;
    rowMoreMenuLocalization?: RowMoreMenuLocalization;
    onRowSelect: (event: React.MouseEvent<unknown>, rowId: T[Extract<keyof T, string>]) => void;
}

export default function BaseTableBody<T>(props: Props<T>) {
    const {
        columns,
        columnCount,
        hasSelectActions,
        idField,
        rowActions,
        rows,
        selectedRows,
        localization,
        rowMoreMenuLocalization,
        onRowSelect,
    } = props;
    const classes = useStyles();

    const isRowSelected = (idFieldValue: T[Extract<keyof T, string>]) => selectedRows.indexOf(idFieldValue) !== -1;

    return (
        <>
            <TableBody>
                {rows.length === 0 &&
                    <TableRow tabIndex={-1}>
                        <TableCell
                            colSpan={columnCount}
                            align="center"
                        >
                            {localization?.noData ?? `No results found`}
                        </TableCell>
                    </TableRow>
                }
                {rows.map((row, i) => {
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
                                        onClick={(event) => onRowSelect(event, row[idField])}
                                    />
                                </TableCell>
                            }
                            {columns.map((column, j) => {
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
                                        localization={rowMoreMenuLocalization}
                                    />
                                }
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </>
    );
}
