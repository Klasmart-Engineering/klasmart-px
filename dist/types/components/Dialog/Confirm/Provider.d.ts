import { Props as DialogOptions } from "./Dialog";
import React from "react";
interface Props extends DialogOptions {
    children: React.ReactNode;
}
export default function ConfirmDialogProvider(props: Props): JSX.Element;
export {};
