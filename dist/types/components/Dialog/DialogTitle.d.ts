import { ReactNode } from "react";
import { DialogTitleProps } from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
export declare type DialogVariant = Exclude<{
    [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
}[keyof Palette], "primary" | "secondary">;
interface Props extends Omit<DialogTitleProps, "title"> {
    title: ReactNode;
    variant?: DialogVariant;
    hideIcon?: boolean;
}
export default function Title(props: Props): JSX.Element;
export {};
