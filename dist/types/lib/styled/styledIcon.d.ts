import { TooltipProps } from "@material-ui/core/Tooltip";
import React from "react";
interface Props {
    className?: string;
    color?: string;
    icon: React.ReactElement;
    size?: "small" | "medium" | "large" | "xlarge" | string;
    tooltip?: TooltipProps;
}
export default function StyledIcon(props: Props): JSX.Element;
export {};
