import { ButtonProps } from "@material-ui/core/Button";
import React from "react";
interface Props extends ButtonProps {
    children?: React.ReactNode;
    className?: string;
    extendedOnly?: boolean;
}
export default function StyledButton(props: Props): JSX.Element;
export {};
