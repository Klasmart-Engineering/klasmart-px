import { Validator } from "../../validations";
import { BaseTextFieldProps } from "@mui/material";

export interface Input {
    value: unknown;
    label?: BaseTextFieldProps[`label`];
    hideHelperText?: boolean;
    disabled?: BaseTextFieldProps[`disabled`];
    readOnly?: boolean;
    prependInner?: React.ReactNode;
    appendInner?: React.ReactNode;
    fullWidth?: BaseTextFieldProps[`fullWidth`];
    variant?: BaseTextFieldProps[`variant`];
    autoFocus?: BaseTextFieldProps[`autoFocus`];
    placeholder?: string;
    validations?: Validator[];
    id?: string;
    size?: BaseTextFieldProps[`size`];
    sx?: BaseTextFieldProps[`sx`];
    style?: React.CSSProperties;
    onBlur?: () => void;
    onChange?: (value: any) => void;
    onFocus?: () => void;
    onError?: (error: string | undefined) => void;
    onValidate?: (valid: boolean) => void;
}

export const getErrorText = (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => validations?.map((validation) => validation(value))
    .find((result) => result !== true) as string | undefined;
