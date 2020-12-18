import { SvgIconProps } from "@material-ui/core";
import React from "react";
export interface RowAction<T> {
    label: string;
    icon?: React.ReactElement<SvgIconProps>;
    onClick: ((item: T) => void);
}
interface Props<T> {
    actions: RowAction<T>[];
    item: T;
}
export default function BaseTableRowMoreMenu<T>(props: Props<T>): JSX.Element;
export {};
