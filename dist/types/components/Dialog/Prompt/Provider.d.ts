import React from "react";
import { Props as DialogOptions } from "./Dialog";
interface Props extends DialogOptions {
    children: React.ReactNode;
}
export default function PromptDialogProvider(props: Props): JSX.Element;
export {};
