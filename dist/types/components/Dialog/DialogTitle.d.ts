import { DialogTitleProps } from "@mui/material";
import { Palette, PaletteColor } from '@mui/material/styles';
import { ReactNode } from "react";
export declare type DialogVariant = Exclude<{
    [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
}[keyof Palette], "primary" | "secondary">;
interface Props extends Omit<DialogTitleProps, "title"> {
    title: ReactNode;
    variant?: DialogVariant;
    hideIcon?: boolean;
}
export default function DialogTitle(props: Props): JSX.Element;
export {};
