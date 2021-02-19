/// <reference types="react" />
import { BaseProps as BaseTableProps, BaseTableData } from "../Common/BaseTable";
import { Order } from "../Common/Head";
import { Page } from "./Pagination";
export interface CursorTableData<T> extends BaseTableData<T> {
    cursor?: string;
}
interface Props<T> extends BaseTableProps<T> {
    cursor?: string;
    hasNextPage: boolean | undefined;
    hasPreviousPage: boolean | undefined;
    startCursor: string | undefined;
    endCursor: string | undefined;
    onChange?: (tableData: CursorTableData<T>) => void;
    onPageChange?: (page: Page, order: Order, cursor?: string) => void;
}
export default function CursorTable<T>(props: Props<T>): JSX.Element;
export {};
