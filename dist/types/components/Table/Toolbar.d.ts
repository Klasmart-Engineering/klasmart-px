/// <reference types="react" />
import { TableData } from "./Base";
import { SvgIconComponent } from "@material-ui/icons";
export interface ToolbarLocalization {
    title?: string;
    numSelected?: (num: number) => string;
}
export interface ToolbarAction<T> {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: (data: TableData<T>) => void;
}
interface Props<T> {
    numSelected: number;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    tableData: TableData<T>;
    localization?: ToolbarLocalization;
}
export default function BaseTableToolbar<T>(props: Props<T>): JSX.Element;
export {};
