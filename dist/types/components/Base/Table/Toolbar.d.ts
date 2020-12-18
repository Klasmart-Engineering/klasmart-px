import React from "react";
import { SvgIconProps } from "@material-ui/core";
import { TableData } from "./Base";
export interface ToolbarAction<T> {
    label: string;
    icon?: React.ReactElement<SvgIconProps>;
    onClick: (data?: TableData<T>) => void;
}
interface Props<T> {
    numSelected: number;
    title: string;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    tableData: TableData<T>;
}
export default function BaseTableToolbar<T>(props: Props<T>): JSX.Element;
export {};
