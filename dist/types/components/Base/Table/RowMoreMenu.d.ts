/// <reference types="react" />
import { SvgIconComponent } from "@material-ui/icons";
export interface RowAction<T> {
    label: string;
    icon?: SvgIconComponent;
    onClick: ((item: T) => void);
}
export interface RowMoreMenuLocalization {
    moreMenuButton?: string;
}
interface Props<T> {
    actions: RowAction<T>[];
    item: T;
    localization?: RowMoreMenuLocalization;
}
export default function BaseTableRowMoreMenu<T>(props: Props<T>): JSX.Element;
export {};
