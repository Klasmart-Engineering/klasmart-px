import { FabProps } from "@material-ui/core/Fab";
import React from "react";
interface Props extends FabProps {
    className?: string;
    extendedOnly?: boolean;
    flat?: boolean;
}
export default function StyledFAB(props: Props & {
    children?: React.ReactNode;
}): JSX.Element;
export {};
