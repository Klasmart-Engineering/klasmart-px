import { Validator } from "../../validations";
import { ReactNode } from "react";
export interface Input {
    value: unknown;
    label?: string;
    hideHelperText?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    prependInner?: ReactNode;
    appendInner?: ReactNode;
    fullWidth?: boolean;
    variant?: "filled" | "standard" | "outlined";
    autoFocus?: boolean;
    placeholder?: string;
    validations?: Validator[];
    id?: string;
    onBlur?: () => void;
    onChange?: (value: any) => void;
    onFocus?: () => void;
    onError?: (error: string | undefined) => void;
    onValidate?: (valid: boolean) => void;
}
export declare const getErrorText: (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => string | undefined;
