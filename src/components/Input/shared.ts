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

export const getErrorText = (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => validations?.map((validation) => validation(value)).find((result) => result !== true) as string | undefined;
