import React from "react";
import { TableCellProps } from "@material-ui/core";
import { CheckboxDropdownValue } from "./CheckboxDropdown";
export declare type Order = "asc" | "desc";
export declare type Align = TableCellProps["align"];
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
}
export default function BaseTableHead<T>(props: Props<T>): JSX.Element;
export {};
