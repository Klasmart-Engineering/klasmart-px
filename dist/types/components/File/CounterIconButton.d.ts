/// <reference types="react" />
import { Props as ListMenuProps } from "./ListMenu";
export interface FileItem {
    name: string;
    onDownloadClick?: () => void;
}
export interface Props {
    files: FileItem[];
    menuTitle?: string;
    hideDownloadActions?: ListMenuProps["hideActions"];
}
export default function FileCounterIconButton(props: Props): JSX.Element;
