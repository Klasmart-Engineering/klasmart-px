/// <reference types="react" />
import { SvgIconComponent } from "@material-ui/icons";
export interface ToolbarLocalization {
    title?: string;
    numSelected?: (num: number) => string;
}
export interface ToolbarAction {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: () => void;
}
export interface ToolbarSelectAction<T> {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: (rowIds: T[Extract<keyof T, string>][]) => void;
}
interface Props<T> {
    hideSelectStatus?: boolean;
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectActions?: ToolbarSelectAction<T>[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: ToolbarLocalization;
}
export default function BaseTableToolbar<T>(props: Props<T>): JSX.Element;
export {};
