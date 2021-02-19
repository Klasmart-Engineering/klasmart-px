/// <reference types="react" />
import { BaseProps as BaseTableProps, BaseTableData } from "../Common/BaseTable";
export interface CursorTableData<T> extends BaseTableData<T> {
    cursor?: string;
}
interface Props<T> extends BaseTableProps<T> {
    cursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | undefined;
    endCursor: string | undefined;
    onChange?: (tableData: CursorTableData<T>) => void;
}
export default function CursorTable<T>(props: Props<T>): JSX.Element;
export {};
