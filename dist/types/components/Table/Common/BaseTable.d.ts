import { MenuAction, MoreMenuLocalization } from "../../MoreMenu";
import { BodyLocalization } from "./Body";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { Filter, TableFilter } from './Filter/Filters';
import { GroupTabsLocalization } from "./GroupTabs";
import { HeadLocalization, Order, TableColumn } from "./Head";
import { PaginationLocalization } from "./Pagination/shared";
import { SearchLocalization } from "./Search";
import { ToolbarAction, ToolbarLocalization, ToolbarSelectAction } from "./Toolbar";
import { ReactNode } from "react";
export declare type SelectMode = `single` | `multiple`;
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
export interface BaseTableData<T> {
    columns: (keyof T)[];
    rows: Partial<T>[];
    selectedRows: T[Extract<keyof T, string>][];
    search: string;
    orderBy: keyof T;
    order: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    rowsPerPage: number;
    total: number;
    filters?: Filter[];
}
export interface BaseProps<T> {
    columns: TableColumn<T>[];
    idField: Extract<keyof T, string>;
    orderBy?: string;
    order?: string;
    groupBy?: string;
    subgroupBy?: string;
    rowActions?: (row: T) => MenuAction<T>[];
    rows: T[];
    selectedRows?: T[Extract<keyof T, string>][];
    rowsPerPage?: number;
    rowsPerPageOptions?: Array<number | {
        value: number;
        label: string;
    }>;
    search?: string;
    showSelectables?: boolean;
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectActions?: ToolbarSelectAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    total?: number;
    noGroupTotal?: number;
    hideSelectStatus?: boolean;
    selectMode?: SelectMode;
    onSelected?: (rows: T[Extract<keyof T, string>][]) => void;
    filters?: TableFilter<T>[];
}
export interface Props<T> extends BaseProps<T> {
    PaginationComponent?: ReactNode;
    localPageStartSlice?: number;
    localPageEndSlice?: number;
    onChange: (baseTableData: BaseTableData<T>) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
