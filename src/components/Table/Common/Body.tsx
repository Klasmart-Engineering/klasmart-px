import MoreMenu, {
    MenuAction,
    MoreMenuLocalization,
} from "../../MoreMenu";
import { SelectMode } from "./BaseTable";
import { TableColumn } from "./Head";
import {
    Checkbox,
    createStyles,
    makeStyles,
    Radio,
    TableBody,
    TableCell,
    TableRow,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    row: {
        height: 53,
    },
}));

export interface BodyLocalization {
    noData?: string;
}

interface Props<T> {
    selectMode?: SelectMode;
    columns: TableColumn<T>[];
    columnCount: number;
    showSelectables: boolean;
    idField: Extract<keyof T, string>;
    loading?: boolean;
    rowActions?: (row: T) => MenuAction<T>[];
    rows: T[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: BodyLocalization;
    rowMoreMenuLocalization?: MoreMenuLocalization;
    onRowSelect: (event: React.MouseEvent<unknown>, rowId: T[Extract<keyof T, string>]) => void;
}

export default function BaseTableBody<T> (props: Props<T>) {
    const {
        selectMode,
        columns,
        columnCount,
        showSelectables,
        idField,
        loading,
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
                            data-testid="tableRow"
                        >
                            {showSelectables &&
                                <TableCell padding="checkbox">
                                    {selectMode === `single`
                                        ? (
                                            <Radio
                                                role="radio"
                                                checked={isSelected}
                                                disabled={loading}
                                                onClick={(event) => onRowSelect(event, row[idField])}
                                            />
                                        )
                                        : (
                                            <Checkbox
                                                role="checkbox"
                                                checked={isSelected}
                                                disabled={loading}
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                                onClick={(event) => onRowSelect(event, row[idField])}
                                            />
                                        )
                                    }
                                </TableCell>
                            }
                            {columns.map((column, j) => {
                                const render = column.render?.(row);
                                const element = render ?? row[column.id];
                                return (
                                    <TableCell
                                        key={`rowCell-${i}-${j}`}
                                        id={labelId}
                                        scope="row"
                                        align={column.align}
                                    >
                                        {element}
                                    </TableCell>
                                );
                            })}
                            <TableCell padding="checkbox">
                                {rowActions && rowActions(row).length > 0 && (
                                    <MoreMenu
                                        item={row}
                                        actions={rowActions(row)}
                                        localization={rowMoreMenuLocalization}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </>
    );
}
