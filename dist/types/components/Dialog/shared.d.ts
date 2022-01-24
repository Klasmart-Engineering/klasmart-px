import { DialogVariant } from "./DialogTitle";
import { DialogProps } from "@mui/material";
import { ReactNode } from "react";
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
