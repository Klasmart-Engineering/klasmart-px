import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";
interface Props {
    className?: string;
    icon: SvgIconComponent;
    iconSize?: `inherit` | `default` | `small` | `large`;
    tooltip?: string;
    disabled?: boolean;
    color?: {
        [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
    }[keyof Palette];
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function IconButton(props: Props): JSX.Element;
export {};
