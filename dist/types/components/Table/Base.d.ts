/// <reference types="react" />
import { MenuAction, MoreMenuLocalization } from "../MoreMenu";
import { BodyLocalization } from "./Body";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { GroupTabsLocalization } from "./GroupTabs";
import { HeadLocalization, Order, TableColumn } from "./Head";
import { PaginationLocalization } from "./Pagination";
import { SearchLocalization } from "./Search";
import { ToolbarAction, ToolbarLocalization, ToolbarSelectAction } from "./Toolbar";
export interface TableLocalization {
    toolbar?: ToolbarLocalization;
    search?: SearchLocalization;
    groupTabs?: GroupTabsLocalization;
    head?: HeadLocalization;
    columnSelector?: ColumnSelectorLocalization;
    checkboxDropdown?: CheckboxDropdownLocalization;
    body?: BodyLocalization;
    rowMoreMenu?: MoreMenuLocalization;
    pagination?: PaginationLocalization;
}
interface BaseTableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    selectedRows: T[Extract<keyof T, string>][];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    rowsPerPage: number;
}
export interface PageTableData<T> extends BaseTableData<T> {
    page: number;
}
export interface CursorTableData<T> extends BaseTableData<T> {
    cursor: string;
}
declare type TableData<M, T> = M extends `cursor` ? CursorTableData<T> : M extends `page` ? PageTableData<T> : never;
export declare type TableMode = `cursor` | `page`;
interface Props<T> {
    mode?: TableMode;
    columns: TableColumn<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: Extract<keyof T, string>;
    order?: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    rowActions?: (row: T) => MenuAction<T>[];
    rows: T[];
    selectedRows?: T[Extract<keyof T, string>][];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | {
        value: number;
        label: string;
    }>;
    page?: number;
    search?: string;
    showCheckboxes?: boolean;
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectActions?: ToolbarSelectAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    onChange?: <M extends TableMode>(data: TableData<M, T>) => void;
    onSelected?: (rows: T[Extract<keyof T, string>][]) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
export {};
