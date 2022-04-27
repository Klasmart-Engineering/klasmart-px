/// <reference types="react" />
import { Validator } from "../../validations";
import { InputProps } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
export interface Props {
    className?: string;
    error?: string;
    loading?: boolean;
    InputProps?: Partial<InputProps>;
    value: Date | null;
    maxDate?: Date;
    minDate?: Date;
    allowKeyboardControl?: boolean;
    animateYearScrolling?: boolean;
    disabled?: boolean;
    disableFuture?: boolean;
    disablePast?: boolean;
    views?: DatePickerProps["views"];
    label?: string;
    hideHelperText?: boolean;
    readOnly?: boolean;
    fullWidth?: boolean;
    variant?: "filled" | "standard" | "outlined";
    autoFocus?: boolean;
    placeholder?: string;
    validations?: Validator[];
    id?: string;
    onBlur?: () => void;
    onChange?: (value: Date | null) => void;
    onFocus?: () => void;
    onError?: (error: string | undefined) => void;
    onValidate?: (valid: boolean) => void;
}
declare function DatePickerField(props: Props): JSX.Element;
declare namespace DatePickerField {
    var displayName: string;
}
export default DatePickerField;
