/// <reference types="react" />
import { SvgIconComponent } from "@mui/icons-material";
export interface MenuAction<T> {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: ((item: T) => void);
}
export interface MoreMenuLocalization {
    moreMenuButton?: string;
}
interface Props<T> {
    actions: MenuAction<T>[];
    item: T;
    localization?: MoreMenuLocalization;
}
export default function MoreMenu<T>(props: Props<T>): JSX.Element;
export {};
