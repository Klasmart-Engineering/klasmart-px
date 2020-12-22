import React from "react";
import { HeadCell } from "./Head";
export interface ColumnSelectorLocalization {
    addButton?: string;
    listTitle?: string;
}
interface Props<T> {
    headCells: HeadCell<T>[];
    selected: (keyof T)[];
    localization?: ColumnSelectorLocalization;
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
}
export default function BaseTableColumnSelector<T>(props: Props<T>): JSX.Element;
export {};
