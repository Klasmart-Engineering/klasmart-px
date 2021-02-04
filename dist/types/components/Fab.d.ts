import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";
interface Props {
    icon?: SvgIconComponent;
    responsiveExtended?: Breakpoint[];
    color?: {
        [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
    }[keyof Palette];
    disabled?: boolean;
    label?: string;
    tooltip?: string;
    variant?: "extended" | "round";
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function Fab(props: Props): JSX.Element;
export {};
