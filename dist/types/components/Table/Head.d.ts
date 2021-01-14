import React, { ReactElement } from "react";
import { TableCellProps } from "@material-ui/core";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { CheckboxDropdownLocalization, CheckboxDropdownValue } from "./CheckboxDropdown";
import { SubgroupTab } from "./GroupTabs";
export declare type Order = "asc" | "desc";
export declare type Align = TableCellProps["align"];
export declare type CustomGroup<T> = (rowValue: T[keyof T]) => {};
export declare type CustomSearch<T> = (rowValue: T[Extract<keyof T, string>], searchValue: string) => boolean;
export declare type CustomSort<T> = (a: T[keyof T], b: T[keyof T], locale?: string, collatorOptions?: Intl.CollatorOptions) => number;
export interface TableColumn<T> {
    id: Extract<keyof T, string>;
    label: string;
    align?: Align;
    persistent?: boolean;
    groupable?: boolean;
    disableSearch?: boolean;
    disableSort?: boolean;
    hidden?: boolean;
    group?: CustomGroup<T>;
    search?: CustomSearch<T>;
    sort?: CustomSort<T>;
    groupSort?: CustomSort<SubgroupTab<T>>;
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
export default function BaseTableHead<T>(props: Props<T>): JSX.Element;
export {};
