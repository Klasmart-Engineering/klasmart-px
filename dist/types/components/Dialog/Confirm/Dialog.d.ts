/// <reference types="react" />
import { CancelableDialog, CommonDialog, Openable } from "../shared";
export interface Props extends CommonDialog, CancelableDialog {
}
export default function ConfirmDialog(props: Props & Openable<boolean>): JSX.Element;
