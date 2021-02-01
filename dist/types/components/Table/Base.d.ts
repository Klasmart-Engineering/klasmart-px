/// <reference types="react" />
import { MenuAction, MoreMenuLocalization } from "../MoreMenu";
import { BodyLocalization } from "./Body";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { GroupTabsLocalization } from "./GroupTabs";
import { HeadLocalization, Order, TableColumn } from "./Head";
import { PaginationLocalization } from "./Pagination";
import { SearchLocalization } from "./Search";
import { ToolbarAction, ToolbarLocalization } from "./Toolbar";
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
export interface TableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    page: number;
    rowsPerPage: number;
}
interface Props<T> {
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
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    onChange?: (data: TableData<T>) => void;
    onSelected?: (rows: T[Extract<keyof T, string>][]) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
export {};
