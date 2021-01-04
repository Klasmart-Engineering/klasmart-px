import React, { ReactElement } from "react";
import { TableCellProps } from "@material-ui/core";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { CheckboxDropdownLocalization, CheckboxDropdownValue } from "./CheckboxDropdown";
export declare type Order = "asc" | "desc";
export declare type Align = TableCellProps["align"];
export interface TableColumn<T> {
    id: Extract<keyof T, string>;
    label: string;
    align?: Align;
    persistent?: boolean;
    searchable?: boolean;
    groupable?: boolean;
    disableSort?: boolean;
    hidden?: boolean;
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
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
}
export default function BaseTableHead<T>(props: Props<T>): JSX.Element;
export {};
