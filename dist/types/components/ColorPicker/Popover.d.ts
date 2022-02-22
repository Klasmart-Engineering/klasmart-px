/// <reference types="react" />
export interface Props {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    hideCanvas?: boolean;
    color?: string;
    colors?: string[];
    onChange: (color: string) => void;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}
export default function (props: Props): JSX.Element;
