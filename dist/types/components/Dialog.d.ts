/// <reference types="react" />
import { DialogProps } from "@material-ui/core";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";
export interface DialogAction {
    align?: "left" | "right";
    color: {
        [P in keyof Palette]: Palette[P] extends PaletteColor ? P : never;
    }[keyof Palette];
    label: string;
    loading?: boolean;
    disabled?: boolean;
    onClick: () => any;
}
interface Props extends DialogProps {
    open: boolean;
    title: string;
    actions: DialogAction[];
    onClose: ((event: unknown, reason?: "backdropClick" | "escapeKeyDown") => void) | undefined;
}
export default function BaseDialog(props: Props): JSX.Element;
export {};
