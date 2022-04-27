/// <reference types="react" />
import { Color } from "react-color";
interface Props {
    color: Color | undefined;
    width?: number;
    onChange: (color: string) => void;
}
export default function SaturationPicker(props: Props): JSX.Element;
export {};
