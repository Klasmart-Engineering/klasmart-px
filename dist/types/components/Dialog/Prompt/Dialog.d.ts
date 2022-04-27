/// <reference types="react" />
import { InputType } from "../../Input/TextField";
import { CancelableDialog, CommonDialog, Openable } from "../shared";
export interface Props extends CommonDialog, CancelableDialog {
    label?: string;
    placeholder?: string;
    inputType?: InputType;
    validations?: ((input: unknown) => true | string)[];
}
export default function ConfirmDialog(props: Props & Openable<any>): JSX.Element;
