import { SvgIconComponent } from "@mui/icons-material";
import { FabProps } from "@mui/material";
import { Breakpoint, Palette, PaletteColor } from '@mui/material/styles';
import React from "react";
interface Props {
    className?: string;
    icon?: SvgIconComponent;
    responsiveExtended?: Breakpoint[];
    color?: {
        [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
    }[keyof Palette];
    disabled?: boolean;
    label?: string;
    tooltip?: string;
    variant?: FabProps["variant"];
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function Fab(props: Props): JSX.Element;
export {};
