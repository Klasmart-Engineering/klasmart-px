/// <reference types="react" />
import { ToolbarAction, ToolbarLocalization } from "./Toolbar";
import { HeadCell, HeadLocalization, Order } from "./Head";
import { RowAction, RowMoreMenuLocalization } from "./RowMoreMenu";
import { PaginationLocalization } from "./Pagination";
import { GroupSelectMenuItem, GroupTabsLocalization } from "./GroupTabs";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { SearchLocalization } from "./Search";
import { ColumnSelectorLocalization } from "./ColumnSelector";
export interface TableLocalization {
    toolbar?: ToolbarLocalization;
    search?: SearchLocalization;
    groupTabs?: GroupTabsLocalization;
    head?: HeadLocalization;
    columnSelector?: ColumnSelectorLocalization;
    checkboxDropdown?: CheckboxDropdownLocalization;
    body?: TableBodyLocalization;
    rowMoreMenu?: RowMoreMenuLocalization;
    pagination?: PaginationLocalization;
}
export interface TableBodyLocalization {
    noData?: string;
}
export interface TableData<T> {
    columns: string[];
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
    columns: HeadCell<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: Extract<keyof T, string>;
    order?: Order;
    groupBy?: keyof T;
    groups?: GroupSelectMenuItem<T>[];
    subgroupBy?: T[keyof T];
    rowActions?: RowAction<T>[];
    rows: T[];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | {
        value: number;
        label: string;
    }>;
    search?: string;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    onChange?: (data: TableData<T>) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
export {};
