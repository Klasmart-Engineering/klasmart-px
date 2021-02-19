/// <reference types="react" />
import { BaseProps as BaseTableProps, BaseTableData } from "../Common/BaseTable";
export interface PageTableData<T> extends BaseTableData<T> {
    page: number;
}
interface Props<T> extends BaseTableProps<T> {
    page: number;
    onChange?: (tableData: PageTableData<T>) => void;
}
export default function CursorTable<T>(props: Props<T>): JSX.Element;
export {};
