export interface Input {
    value: string;
    label?: string;
    hideHelperText?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: "filled" | "standard" | "outlined";
    autoFocus?: boolean;
    placeholder?: string;
    validations?: ((input: unknown) => true | string)[];
    onBlur?: () => void;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onValidate?: (valid: boolean) => void;
}
export declare const getErrorText: (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => string | true | undefined;
