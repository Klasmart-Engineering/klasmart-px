/// <reference types="react" />
import { ToolbarAction, ToolbarLocalization } from "./Toolbar";
import { HeadLocalization, Order, TableColumn } from "./Head";
import { RowAction, RowMoreMenuLocalization } from "./RowMoreMenu";
import { PaginationLocalization } from "./Pagination";
import { GroupTabsLocalization } from "./GroupTabs";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { SearchLocalization } from "./Search";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { BodyLocalization } from "./Body";
export interface TableLocalization {
    toolbar?: ToolbarLocalization;
    search?: SearchLocalization;
    groupTabs?: GroupTabsLocalization;
    head?: HeadLocalization;
    columnSelector?: ColumnSelectorLocalization;
    checkboxDropdown?: CheckboxDropdownLocalization;
    body?: BodyLocalization;
    rowMoreMenu?: RowMoreMenuLocalization;
    pagination?: PaginationLocalization;
}
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
    columns: TableColumn<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: Extract<keyof T, string>;
    order?: Order;
    groupBy?: keyof T;
    subgroupBy?: T[keyof T];
    rowActions?: (row: T) => RowAction<T>[];
    rows: T[];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | {
        value: number;
        label: string;
    }>;
    page?: number;
    search?: string;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    onChange?: (data: TableData<T>) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
export {};
