
import IconButton from "../../Button/IconButton";
import BaseTableColumnSelector,
{ ColumnSelectorLocalization } from "./ColumnSelector";
import { SubgroupTab } from "./GroupTabs";
import { DEFAULT_SORT_ORDER } from "./Pagination/shared";
import {
    Close as CloseIcon,
    Info as InfoIcon,
    Lock as LockIcon,
} from "@mui/icons-material";
import {
    Box,
    TableCell,
    TableCellProps,
    TableHead,
    TableRow,
    TableSortLabel,
    Theme,
    Tooltip,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React,
{ ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        borderRadius: `inherit`,
        backgroundColor: `#FAF9F9`,
    },
    header: {
        height: 40,
        padding: theme.spacing(0, 2),
        "&:hover": {
            backgroundColor: `#FAF9F9`,
        },
    },
    removeButton: {
        opacity: 0,
        transition: `opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        "$header:hover &": {
            opacity: 1,
        },
    },
    infoIcon: {
        marginLeft: theme.spacing(1),
    },
    infoIconReverse: {
        marginRight: theme.spacing(1),
    },
}));

export type Order = "asc" | "desc";
export type Align = TableCellProps["align"]
export type CustomSearch<T> = (rowValue: T[Extract<keyof T, string>], searchValue: string) => boolean
export type CustomSort<T> = (a: T[keyof T], b: T[keyof T], locale?: string, collatorOptions?: Intl.CollatorOptions) => number

export interface TableColumn<T> {
    id: Extract<keyof T, string>;
    label: string;
    align?: Align;
    persistent?: boolean;
    disableSearch?: boolean;
    disableSort?: boolean;
    hidden?: boolean;
    secret?: boolean;
    search?: CustomSearch<T>;
    sort?: CustomSort<T>;
    groups?: SubgroupTab[];
    tooltip?: string;
    render?: (row: T) => ReactNode;
}

export interface HeadLocalization {
    hideColumnButton?: string;
}

interface Props<T> {
    order: Order;
    orderBy: string;
    selected: (keyof T)[];
    columns: TableColumn<T>[];
    columnSelectorLocalization?: ColumnSelectorLocalization;
    localization?: HeadLocalization;
    showSelectables: boolean;
    onRequestSort: (event: React.MouseEvent<unknown>, property: Extract<keyof T, string>) => void;
    onColumnChange: (columnId: Extract<keyof T, string>) => void;
}

export default function BaseTableHead<T> (props: Props<T>) {
    const {
        order,
        orderBy,
        columns,
        selected,
        columnSelectorLocalization,
        localization,
        showSelectables,
        onRequestSort,
        onColumnChange,
    } = props;
    const classes = useStyles();

    const createSortHandler = (property: Extract<keyof T, string>) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className={classes.container}>
                {showSelectables && <TableCell />}
                {columns
                    .filter((column) => selected.indexOf(column.id) !== -1)
                    .filter((column) => !column.secret)
                    .map((column) => {
                        const cellStyle = column.align === `right`
                            ? {
                                paddingLeft: 0,
                            } : {
                                paddingRight: 0,
                            };
                        const flexDirection = column.align === `right` ? `row-reverse` : `row`;
                        const isAlignCenter = column.align === `center`;
                        return (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                sortDirection={orderBy === column.id ? order : false}
                                className={classes.header}
                                style={cellStyle}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    flexDirection={flexDirection}
                                >
                                    {isAlignCenter && (
                                        <>
                                            <span
                                                style={{
                                                    width: 44, // width of column remove button
                                                }}
                                            />
                                            <Box flex="1" />
                                        </>
                                    )}
                                    <TableSortLabel
                                        disabled={column.disableSort}
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : DEFAULT_SORT_ORDER}
                                        style={{
                                            flexDirection,
                                        }}
                                        data-testid={`${column.id}SortHandler`}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection={flexDirection}
                                        >
                                            {column.label}
                                            {column.tooltip &&
                                                <Tooltip title={column.tooltip}>
                                                    <InfoIcon
                                                        color="action"
                                                        className={clsx({
                                                            [classes.infoIcon]: column.align !== `right`,
                                                            [classes.infoIconReverse]: column.align === `right`,
                                                        })}
                                                    />
                                                </Tooltip>
                                            }
                                        </Box>
                                    </TableSortLabel>
                                    {isAlignCenter && <Box flex="1" />}
                                    <IconButton
                                        disabled={column.persistent}
                                        className={classes.removeButton}
                                        iconSize="small"
                                        tooltip={!column.persistent ? localization?.hideColumnButton ?? `Hide column` : undefined}
                                        icon={column.persistent ? LockIcon : CloseIcon}
                                        size="medium"
                                        onClick={() => onColumnChange(column.id)}
                                    />
                                </Box>
                            </TableCell>
                        );
                    })}
                <TableCell padding="checkbox">
                    <BaseTableColumnSelector
                        columns={columns}
                        selected={selected}
                        localization={columnSelectorLocalization}
                        onColumnChange={onColumnChange}
                    />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
