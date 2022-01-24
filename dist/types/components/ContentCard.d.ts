import { CardProps, SvgIconProps } from "@mui/material";
import React, { ChangeEvent } from "react";
declare type LibraryAssetType = "lessonPlan" | "lessonMaterial";
interface CheckboxItem {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
export interface ActionItem {
    label: string;
    color?: `inherit` | `disabled` | `primary` | `secondary` | `action` | `error`;
    icon: React.ReactElement<SvgIconProps>;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
interface Props extends Omit<CardProps, "onClick"> {
    actions?: ActionItem[];
    checkbox?: CheckboxItem;
    author: string;
    title: string;
    description: string;
    imageUrl: string;
    assetType?: LibraryAssetType;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}
export default function ContentCard(props: Props): JSX.Element;
export {};
