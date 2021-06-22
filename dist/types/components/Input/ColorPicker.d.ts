/// <reference types="react" />
import { Props as ColorPopoverInput } from "../ColorPicker/Popover";
import { Input } from "./shared";
export interface Props extends Pick<Input, "variant" | "fullWidth" | "onChange" | "onValidate" | "onError" | "hideHelperText">, Pick<ColorPopoverInput, "hideCanvas" | "colors"> {
    value: string | null | undefined;
    label?: string;
    defaultButtonLabel?: string;
    defaultColor?: string;
}
export default function (props: Props): JSX.Element;
