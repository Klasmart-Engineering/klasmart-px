import React from "react";
import { HeadCell } from "./Head";
interface Props<T> {
    headCells: HeadCell<T>[];
    selected: (keyof T)[];
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
}
export default function BaseTableColumnSelector<T>(props: Props<T>): JSX.Element;
export {};
