/// <reference types="react" />
import { OutlinedTextFieldProps } from "@material-ui/core";
interface Props extends Omit<OutlinedTextFieldProps, "children" | "onChange" | "variant"> {
    validations?: ((input: unknown) => true | string)[];
    hideHelperText?: boolean;
    onChange?: (value: string) => void;
    onValidChange?: (valid: boolean) => void;
}
export default function (props: Props): JSX.Element;
export {};
