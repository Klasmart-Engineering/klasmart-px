import { MenuAction, MoreMenuLocalization } from "../../MoreMenu";
import { TableColumn } from "./Head";
import React from "react";
export interface BodyLocalization {
    noData?: string;
}
interface Props<T> {
    columns: TableColumn<T>[];
    columnCount: number;
    showCheckboxes: boolean;
    idField: Extract<keyof T, string>;
    loading?: boolean;
    rowActions?: (row: T) => MenuAction<T>[];
    rows: T[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: BodyLocalization;
    rowMoreMenuLocalization?: MoreMenuLocalization;
    onRowSelect: (event: React.MouseEvent<unknown>, rowId: T[Extract<keyof T, string>]) => void;
}
export default function BaseTableBody<T>(props: Props<T>): JSX.Element;
export {};
