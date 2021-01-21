/// <reference types="react" />
import { CancelableDialog, CommonDialog, Openable } from "../shared";
export declare type Input = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`;
export interface Props extends CommonDialog, CancelableDialog {
    label?: string;
    placeholder?: string;
    inputType?: Input;
}
export default function ConfirmDialog(props: Props & Openable<any>): JSX.Element;
