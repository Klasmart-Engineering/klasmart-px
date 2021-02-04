/// <reference types="react" />
import { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps } from "@material-ui/core";
interface Props extends Omit<StandardTextFieldProps | OutlinedTextFieldProps | FilledTextFieldProps, "children" | "onChange"> {
    validations?: ((input: unknown) => true | string)[];
    hideHelperText?: boolean;
    onChange?: (value: string) => void;
    onValidChange?: (valid: boolean) => void;
}
export default function TextField(props: Props): JSX.Element;
export {};
