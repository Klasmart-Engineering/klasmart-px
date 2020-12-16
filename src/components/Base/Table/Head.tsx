import React from "react";
import {
    Close as CloseIcon,
    Lock as LockIcon,
} from "@material-ui/icons";
import {
    Box,
    Checkbox,
    createStyles,
    IconButton,
    makeStyles,
    TableCell,
    TableCellProps,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme,
} from "@material-ui/core";
import BaseTableColumnSelector from "./ColumnSelector";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.grey[100],
        },
        hoverHeader: {
            height: 53,
            padding: theme.spacing(0, 2),
            "&:hover": {
                backgroundColor: `rgba(0, 0, 0, 0.04)`,
            },
        },
        removeButton: {
            opacity: 0,
            transition: `opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
            "$hoverHeader:hover &": {
                opacity: 1,
            },
        },
    }),
);

export type Order = "asc" | "desc";

export interface HeadCell<T> {
    id: Extract<keyof T, string>;
    label: string;
    align: TableCellProps["align"];
    persistent?: boolean;
}

interface Props<T> {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    selected: (keyof T)[];
    headCells: HeadCell<T>[];
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
}

export default function BaseTableHead<T>(props: Props<T>) {
    const classes = useStyles();
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells,
        selected,
        onColumnChange,
    } = props;
    const createSortHandler = (property: Extract<keyof T, string>) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const isSelected = (column: keyof T) => selected.indexOf(column) !== -1;

    return (
        <TableHead>
            <TableRow className={classes.container}>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        inputProps={{
                            "aria-label": `select all desserts`,
                        }}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells
                    .filter((headCell) => isSelected(headCell.id))
                    .map((headCell: HeadCell<T>) => {
                        const paddingStyle = headCell.align === `right` ? {
                            paddingLeft: 0,
                        } : {
                            paddingRight: 0,
                        };
                        return <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            sortDirection={orderBy === headCell.id ? order : false}
                            className={classes.hoverHeader}
                            style={paddingStyle}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                flexDirection={headCell.align === `right` ? `row-reverse` : `row`}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : `asc`}
                                    style={{
                                        flexDirection: headCell.align === `right` ? `row-reverse` : `row`,
                                    }}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                                <IconButton
                                    className={classes.removeButton}
                                    disabled={headCell.persistent}
                                    onClick={(e) => onColumnChange(e, headCell.id)}
                                >
                                    {headCell.persistent
                                        ? <LockIcon fontSize="small" />
                                        : <CloseIcon fontSize="small" />
                                    }
                                </IconButton>
                            </Box>
                        </TableCell>;
                    })
                }
                <TableCell padding="checkbox">
                    <BaseTableColumnSelector
                        headCells={headCells}
                        selected={selected}
                        onColumnChange={onColumnChange}
                    />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}