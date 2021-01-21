import { ReactNode } from "react";
import { DialogContentProps } from "@material-ui/core";
interface Props extends DialogContentProps {
    content: ReactNode;
}
export default function Content(props: Props): JSX.Element;
export {};
