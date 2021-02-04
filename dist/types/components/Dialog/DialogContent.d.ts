import { DialogContentProps } from "@material-ui/core";
import { ReactNode } from "react";
interface Props extends DialogContentProps {
    content: ReactNode;
}
export default function DialogContent(props: Props): JSX.Element;
export {};
