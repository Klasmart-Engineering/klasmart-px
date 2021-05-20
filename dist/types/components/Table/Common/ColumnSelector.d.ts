/// <reference types="react" />
import { TableColumn } from "./Head";
export interface ColumnSelectorLocalization {
    addButton?: string;
    listTitle?: string;
}
interface Props<T> {
    columns: TableColumn<T>[];
    selected: (keyof T)[];
    localization?: ColumnSelectorLocalization;
    onColumnChange: (columnId: Extract<keyof T, string>) => void;
}
export default function BaseTableColumnSelector<T>(props: Props<T>): JSX.Element;
export {};
