import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import { SvgIconComponent } from "@material-ui/icons";
import React from "react";
interface Props {
    className?: string;
    label: React.ReactNode;
    icon?: SvgIconComponent;
    type?: "submit" | "reset" | "button";
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
    rounded?: boolean;
    fullWidth?: boolean;
    color?: {
        [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
    }[keyof Palette];
    disabled?: boolean;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function Button(props: Props): JSX.Element;
export {};
