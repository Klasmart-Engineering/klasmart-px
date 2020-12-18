/// <reference types="react" />
import { ToolbarAction } from "./Toolbar";
import { HeadCell, Order } from "./Head";
import { RowAction } from "./RowMoreMenu";
import { GroupSelectMenuItem } from "./GroupTabs";
export interface TableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: T[keyof T];
    page: number;
    rowsPerPage: number;
}
interface Props<T> {
    title: string;
    columns: HeadCell<T>[];
    selectedColumns?: (keyof T)[];
    idField: Extract<keyof T, string>;
    orderBy?: Extract<keyof T, string>;
    order?: Order;
    groupBy?: keyof T;
    groups?: GroupSelectMenuItem<T>[];
    subgroupBy?: T[keyof T];
    rowActions?: RowAction<T>[];
    rowBuilder: (data: T) => Record<keyof T, any>;
    rows: T[];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | {
        value: number;
        label: string;
    }>;
    search?: string;
    searchFields?: (keyof T)[];
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    loading?: boolean;
    onChange?: (data: TableData<T>) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
export {};
