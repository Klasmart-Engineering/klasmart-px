import { ReactNode } from "react";
export interface DrawerSection {
    header?: string;
    content: ReactNode;
}
interface Props {
    open: boolean;
    title?: string;
    sections: DrawerSection[];
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}
export default function Drawer(props: Props): JSX.Element;
export {};
