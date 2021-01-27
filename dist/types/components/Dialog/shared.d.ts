import { DialogProps } from "@material-ui/core";
import { ReactNode } from "react";
import { DialogVariant } from "./DialogTitle";
export interface Openable<T> {
    open: boolean;
    onClose: (value?: T) => void;
}
export interface CommonDialog extends Pick<DialogProps, "maxWidth"> {
    hideIcon?: boolean;
    okLabel?: string;
    title?: ReactNode;
    variant?: DialogVariant;
    content?: ReactNode;
}
export interface CancelableDialog {
    cancelLabel?: string;
}