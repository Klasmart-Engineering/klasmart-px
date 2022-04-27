import { Validator } from "../../validations";
import { getErrorText } from "./shared";
import TextField from "./TextField";
import Dayjs from "@date-io/dayjs";
import { InputProps } from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import {
    DatePicker,
    DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import {
    useCallback,
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) =>
    createStyles({
        disabledText: {
            color: theme.palette.action.active,
        },
    }));

export interface Props {
    className?: string;
    error?: string;
    loading?: boolean;
    InputProps?: Partial<InputProps>;
    value: Date | null;
    /**
     * Max selectable date. @DateIOType
     * Depends on localization provider used.
     * See https://mui.com/api/date-picker/#props
     */
    maxDate?: Date;
    /**
     * Min selectable date. @DateIOType
     * Depends on localization provider used.
     * See https://mui.com/api/date-picker/#props
     */
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

export default function DatePickerField (props: Props) {
    const {
        hideHelperText,
        value,
        error: controlledError,
        onChange,
        className,
        readOnly,
        variant = `outlined`,
        loading,
        onError,
        validations,
        onValidate,
        fullWidth,
        placeholder,
        minDate,
        maxDate,
        views,
        label,
        ...rest
    } = props;
    const classes = useStyles();

    const handleError = (reason: "shouldDisableDate" | "disablePast" | "disableFuture" | "minDate" | "maxDate" | "invalidDate" | null, value: unknown) => {
        onError?.(reason ?? undefined);
    };

    const isControlledError = useCallback(() => (controlledError !== undefined), [ controlledError ]);

    const [ error_, setError ] = useState(getErrorText(value, validations));
    const dayjs = new Dayjs().dayjs;

    useEffect(() => {
        const getErrorState = (value: unknown, validations: Validator[] | undefined) => controlledError ?? getErrorText(value, validations);

        const updateValue = (value: Date | null | undefined) => {
            const validationError = getErrorText(value ? new Date(value) : ``, validations);

            if (!isControlledError()) {
                setError(validationError);
            }

            const masterError = getErrorState(value, validations);
            onValidate?.(!masterError);
            onError?.(masterError);
        };

        updateValue(value);
    }, [
        value,
        controlledError,
        isControlledError,
        onValidate,
        onError,
        validations,
    ]);

    return (
        <DatePicker
            className={className}
            value={value ? value : null}
            minDate={dayjs(minDate)}
            maxDate={dayjs(maxDate)}
            renderInput={({
                inputProps,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                InputProps,
                type,
                onBlur,
                onFocus,
                onError,
                ...paramsRest
            }) => (
                <TextField
                    {...paramsRest}
                    placeholder={placeholder}
                    hideHelperText={hideHelperText}
                    loading={loading}
                    variant={variant}
                    error={error_}
                    value={inputProps?.value}
                    InputProps={InputProps}
                    label={label}
                    fullWidth={fullWidth}
                    {...rest}
                />
            )}
            views={views}
            label={label}
            PopperProps={{
                placement: `auto-start`,
            }}
            readOnly={readOnly}
            onChange={(value) => onChange?.(value?.toDate() ?? null)}
            onError={handleError}
        />
    );
}
DatePickerField.displayName = `pxDatePicker`;
