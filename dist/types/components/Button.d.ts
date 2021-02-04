import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
import React from "react";
interface Props {
    label: React.ReactNode;
    type?: "submit" | "reset" | "button";
    variant?: "text" | "outlined" | "contained";
    color?: {
        [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
    }[keyof Palette];
    disabled?: boolean;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function Button(props: Props): JSX.Element;
export {};
