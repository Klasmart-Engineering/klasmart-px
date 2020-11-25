import { ButtonProps } from "@material-ui/core/Button";
import React from "react";
interface Props extends ButtonProps {
    ariaLabel?: string;
    children?: React.ReactNode;
    className?: string;
    extendedOnly?: boolean;
    options: Array<{
        action?: () => void;
        disabled: boolean;
        label: string;
    }>;
}
export default function BaseButtonGroup(props: Props): JSX.Element;
export {};
