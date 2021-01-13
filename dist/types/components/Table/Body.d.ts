import React from "react";
import { RowAction, RowMoreMenuLocalization } from "./RowMoreMenu";
import { TableColumn } from "./Head";
export interface BodyLocalization {
    noData?: string;
}
interface Props<T> {
    columns: TableColumn<T>[];
    columnCount: number;
    hasSelectActions: boolean;
    idField: Extract<keyof T, string>;
    rowActions?: (row: T) => RowAction<T>[];
    rows: T[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: BodyLocalization;
    rowMoreMenuLocalization?: RowMoreMenuLocalization;
    onRowSelect: (event: React.MouseEvent<unknown>, rowId: T[Extract<keyof T, string>]) => void;
}
export default function BaseTableBody<T>(props: Props<T>): JSX.Element;
export {};
