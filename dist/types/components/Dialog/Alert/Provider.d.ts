import { Props as DialogOptions } from "./Dialog";
import React, { ReactNode } from "react";
export interface DefaultOptions extends DialogOptions {
    title: ReactNode;
    content: ReactNode;
    okLabel: string;
}
interface Props extends DialogOptions {
    children: React.ReactNode;
}
export default function AlertDialogProvider(props: Props): JSX.Element;
export {};
