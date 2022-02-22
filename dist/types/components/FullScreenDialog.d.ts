/// <reference types="react" />
import { DialogProps } from "@material-ui/core";
interface ToolbarAction {
    label: string;
    disabled?: boolean;
    onClick: () => void;
}
interface Props extends DialogProps {
    open: boolean;
    title: string;
    action?: ToolbarAction;
    header?: JSX.Element;
    footer?: JSX.Element;
    onClose: ((event: unknown, reason?: "backdropClick" | "escapeKeyDown") => void) | undefined;
}
export default function FullScreenDialog(props: Props): JSX.Element;
export {};
