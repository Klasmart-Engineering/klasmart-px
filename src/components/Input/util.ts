export interface Input {
    value: string;
    label?: string;
    hideHelperText?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: "filled" | "standard" | "outlined";
    validations?: ((input: unknown) => true | string)[];
    onBlur?: () => void;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onValidate?: (valid: boolean) => void;
}

export const getErrorText = (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => validations?.map((validation) => validation(value)).find((result) => result !== true);
