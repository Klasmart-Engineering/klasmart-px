import { MenuAction, MoreMenuLocalization } from "../../MoreMenu";
import { BodyLocalization } from "./Body";
import { CheckboxDropdownLocalization } from "./CheckboxDropdown";
import { ColumnSelectorLocalization } from "./ColumnSelector";
import { GroupTabsLocalization } from "./GroupTabs";
import { HeadLocalization, Order, TableColumn } from "./Head";
import { PaginationLocalization } from "./Pagination/shared";
import { SearchLocalization } from "./Search";
import { ToolbarAction, ToolbarLocalization, ToolbarSelectAction } from "./Toolbar";
import { ReactNode } from "react";
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
    orderBy?: keyof T;
    order?: Order;
    groupBy?: keyof T;
    subgroupBy?: string;
    rowsPerPage: number;
    total: number;
}
export interface BaseProps<T> {
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
    search?: string;
    showCheckboxes?: boolean;
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectActions?: ToolbarSelectAction<T>[];
    loading?: boolean;
    localization?: TableLocalization;
    locale?: string;
    collatorOptions?: Intl.CollatorOptions;
    total?: number;
    onSelected?: (rows: T[Extract<keyof T, string>][]) => void;
}
export interface Props<T> extends BaseProps<T> {
    PaginationComponent?: ReactNode;
    localStartSlice?: number;
    localEndSlice?: number;
    onChange: (baseTableData: BaseTableData<T>) => void;
}
export default function BaseTable<T>(props: Props<T>): JSX.Element;
