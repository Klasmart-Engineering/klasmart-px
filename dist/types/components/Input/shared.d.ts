export interface Input {
    value: unknown;
    label?: string;
    hideHelperText?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: "filled" | "standard" | "outlined";
    autoFocus?: boolean;
    placeholder?: string;
    validations?: ((input: unknown) => true | string)[];
    onBlur?: () => void;
    onChange?: (value: any) => void;
    onFocus?: () => void;
    onValidate?: (valid: boolean) => void;
}
export declare const getErrorText: (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => string | true | undefined;
