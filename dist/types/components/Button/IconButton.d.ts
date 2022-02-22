import { ActionColor, BaseColor, CommonColor, StatusColor, ThemeColor } from "../../types/colors";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";
declare type IconButtonColor = BaseColor | CommonColor | ThemeColor | StatusColor | ActionColor | undefined;
export interface Props {
    className?: string;
    icon: SvgIconComponent;
    iconSize?: `inherit` | `default` | `small` | `large`;
    size?: "small" | "medium";
    tooltip?: string;
    disabled?: boolean;
    color?: IconButtonColor;
    "data-testid"?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function IconButton(props: Props): JSX.Element;
export {};
