import { TableColumn } from "./Head";
import React from "react";
export interface ColumnSelectorLocalization {
    addButton?: string;
    listTitle?: string;
}
interface Props<T> {
    columns: TableColumn<T>[];
    selected: (keyof T)[];
    localization?: ColumnSelectorLocalization;
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: Extract<keyof T, string>) => void;
}
export default function BaseTableColumnSelector<T>(props: Props<T>): JSX.Element;
export {};
