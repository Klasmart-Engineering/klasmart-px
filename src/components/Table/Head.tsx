import React,
{ ReactElement } from "react";
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
    Tooltip,
} from "@material-ui/core";
import BaseTableColumnSelector,
{ ColumnSelectorLocalization } from "./ColumnSelector";
import BaseTableCheckboxDropdown,
{
    CheckboxDropdownLocalization,
    CheckboxDropdownValue,
} from "./CheckboxDropdown";
import { SubgroupTab } from "./GroupTabs";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            backgroundColor: theme.palette.type === `light` ? fade(`#000000`, 0.04) : fade(`#FFFFFF`, 0.08),
        },
        hoverHeader: {
            height: 53,
            padding: theme.spacing(0, 2),
            "&:hover": {
                backgroundColor: theme.palette.type === `light` ? fade(`#000000`, 0.04) : fade(`#FFFFFF`, 0.08),
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
export type CustomGroup<T> = (rowValue: T[keyof T]) => string
export type CustomSearch<T> = (rowValue: T[Extract<keyof T, string>], searchValue: string) => boolean
export type CustomSort<T> = (a: T[keyof T], b: T[keyof T], locale?: string, collatorOptions?: Intl.CollatorOptions) => number
export type CustomGroupSort = (a: string, b: string, locale?: string, collatorOptions?: Intl.CollatorOptions) => number

export interface TableColumn<T> {
    id: Extract<keyof T, string>;
    label: string;
    align?: Align;
    persistent?: boolean;
    groupable?: boolean;
    disableSearch?: boolean;
    disableSort?: boolean;
    hidden?: boolean;
    groupText?: CustomGroup<T>;
    search?: CustomSearch<T>;
    sort?: CustomSort<T>;
    groupSort?: CustomGroupSort;
    groups?: SubgroupTab<T>[];
    render?: (row: T) => ReactElement | ReactElement[];
}

export interface HeadLocalization {
    hideColumnButton?: string;
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
    columns: TableColumn<T>[];
    hasSelectActions: boolean;
    hasGroups: boolean;
    checkboxDropdownLocalization?: CheckboxDropdownLocalization;
    columnSelectorLocalization?: ColumnSelectorLocalization;
    localization?: HeadLocalization;
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: Extract<keyof T, string>) => void;
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
        columns,
        selected,
        hasSelectActions,
        hasGroups,
        checkboxDropdownLocalization,
        columnSelectorLocalization,
        localization,
        onColumnChange,
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
                            localization={checkboxDropdownLocalization}
                            onSelectAllPageClick={onSelectAllPageClick}
                            onSelectAllClick={onSelectAllClick}
                        />
                    </TableCell>
                }
                {columns
                    .filter((column) => isSelected(column.id))
                    .map((column: TableColumn<T>) => {
                        const hideButton = <IconButton
                            disabled={column.persistent}
                            className={classes.removeButton}
                            onClick={(e) => onColumnChange(e, column.id)}
                        >
                            {column.persistent
                                ? <LockIcon fontSize="small" />
                                : <CloseIcon fontSize="small" />
                            }
                        </IconButton>;
                        const paddingStyle = column.align === `right` ? {
                            paddingLeft: 0,
                        } : {
                            paddingRight: 0,
                        };
                        const flexDirection = column.align === `right` ? `row-reverse` : `row`;
                        const isAlignCenter = column.align === `center`;
                        return <TableCell
                            key={column.id}
                            align={column.align}
                            sortDirection={orderBy === column.id ? order : false}
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
                                    disabled={column.disableSort}
                                    active={orderBy === column.id}
                                    direction={order}
                                    style={{
                                        flexDirection,
                                    }}
                                    onClick={createSortHandler(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                                {isAlignCenter && <Box flex="1" />}
                                {column.persistent
                                    ? hideButton
                                    : <Tooltip title={localization?.hideColumnButton ?? `Hide column`}>
                                        {hideButton}
                                    </Tooltip>
                                }
                            </Box>
                        </TableCell>;
                    })
                }
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
