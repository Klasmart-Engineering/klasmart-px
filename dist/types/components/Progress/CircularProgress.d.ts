/// <reference types="react" />
import { CircularProgressProps } from "@material-ui/core";
declare type CircularProgressColor = CircularProgressProps["color"] | `action` | `white`;
interface Props {
    className?: string;
    showCancel?: boolean;
    size?: number;
    color?: CircularProgressColor;
    disableCentered?: boolean;
}
export default function CircularProgress(props: Props): JSX.Element;
export {};
