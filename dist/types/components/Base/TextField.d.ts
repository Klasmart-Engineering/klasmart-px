import { StandardTextFieldProps } from "@material-ui/core/TextField";
import * as React from "react";
interface Props extends StandardTextFieldProps {
    children?: React.ReactNode;
    className?: string;
    showForgotPassword?: boolean;
    type?: string;
    passwordForgotUrl?: string;
}
export default function StyledTextField(props: Props): JSX.Element;
export {};
