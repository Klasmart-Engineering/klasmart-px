/// <reference types="react" />
import { FileItem } from "./CounterIconButton";
export interface Props {
    anchorEl: HTMLElement | null;
    files: FileItem[];
    open: boolean;
    title?: string;
    hideActions?: boolean;
    onClose: () => void;
}
export default function FileListMenu(props: Props): JSX.Element;
