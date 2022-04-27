import { SvgIconComponent } from "@mui/icons-material";
import React from "react";
declare const COLORS: readonly ["primary", "secondary", "error", "warning", "info", "success"];
export declare type Color = typeof COLORS[number];
export declare type Variant = "text" | "outlined" | "contained";
export interface Props {
    className?: string;
    label: React.ReactNode;
    icon?: SvgIconComponent;
    type?: "submit" | "reset" | "button";
    variant?: Variant;
    size?: "small" | "medium" | "large";
    rounded?: boolean;
    fullWidth?: boolean;
    color?: string;
    disabled?: boolean;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}
export default function Button(props: Props): JSX.Element;
export {};
