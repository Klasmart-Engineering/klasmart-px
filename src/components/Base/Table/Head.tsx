import React from "react";
import {
    Close as CloseIcon,
    Lock as LockIcon,
} from "@material-ui/icons";
import {
    Box,
    createStyles,
    fade,
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
import BaseTableCheckboxDropdown,
{ CheckboxDropdownValue } from "./CheckboxDropdown";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.type === `light` ? fade(`#000000`, 0.04) : fade(`#FFFFFF`, 0.08),
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
export type Align = TableCellProps["align"]

export interface HeadCell<T> {
    id: Extract<keyof T, string>;
    label: string;
    align: Align;
    persistent?: boolean;
}

interface Props<T> {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => void;
    onSelectAllClick: (event: React.MouseEvent<HTMLLIElement>, value: CheckboxDropdownValue) => void;
    onSelectAllPageClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    selected: (keyof T)[];
    headCells: HeadCell<T>[];
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
    hasSelectActions: boolean;
    hasGroups: boolean;
}

export default function BaseTableHead<T>(props: Props<T>) {
    const {
        onSelectAllClick,
        onSelectAllPageClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells,
        selected,
        onColumnChange,
        hasSelectActions,
        hasGroups,
    } = props;
    const classes = useStyles();
    const createSortHandler = (property: Extract<keyof T, string>) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const isSelected = (column: keyof T) => selected.indexOf(column) !== -1;

    return (
        <TableHead>
            <TableRow className={classes.container}>
                {hasSelectActions &&
                    <TableCell padding="checkbox">
                        <BaseTableCheckboxDropdown
                            hasGroups={hasGroups}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onSelectAllPageClick={onSelectAllPageClick}
                            onSelectAllClick={onSelectAllClick}
                        />
                    </TableCell>
                }
                {headCells
                    .filter((headCell) => isSelected(headCell.id))
                    .map((headCell: HeadCell<T>) => {
                        const paddingStyle = headCell.align === `right` ? {
                            paddingLeft: 0,
                        } : {
                            paddingRight: 0,
                        };
                        const flexDirection = headCell.align === `right` ? `row-reverse` : `row`;
                        const isAlignCenter = headCell.align === `center`;
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
                                flexDirection={flexDirection}
                            >
                                {isAlignCenter && <Box flex="1" />}
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={order}
                                    style={{
                                        flexDirection,
                                    }}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                                {isAlignCenter && <Box flex="1" />}
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
