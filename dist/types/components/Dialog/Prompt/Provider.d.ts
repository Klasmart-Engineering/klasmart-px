import { Props as DialogOptions } from "./Dialog";
import React from "react";
interface Props extends DialogOptions {
    children: React.ReactNode;
}
export default function PromptDialogProvider(props: Props): JSX.Element;
export {};
