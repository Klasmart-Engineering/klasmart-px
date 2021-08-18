import {
    getErrorText,
    Input,
} from "./shared";
import {
    createStyles,
    makeStyles,
    TextField as MUITextField,
} from "@material-ui/core";
import clsx from "clsx";
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    disabledText: {
        color: theme.palette.action.active,
    },
}));

export type InputType = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`

export interface Props extends Input {
    type?: InputType;
    className?: string;
    error?: string;
}

export default function TextField (props: Props) {
    const {
        hideHelperText,
        value,
        validations,
        error: controlledError,
        onChange,
        onError,
        onValidate,
        className,
        type,
        readOnly,
        prependInner,
        appendInner,
        variant = `outlined`,
        ...rest
    } = props;
    const classes = useStyles();

    const isControlledError = () => controlledError !== undefined;

    const getErrorState = () => controlledError ?? getErrorText(value, validations);

    const [ value_, setValue ] = useState(value ?? ``);
    const [ error_, setError ] = useState(getErrorText(value, validations));

    const updateValue = (value: unknown) => {
        const validationError = getErrorText(value, validations);
        setValue(value);
        if (!isControlledError()) {
            setError(validationError);
        }
        const masterError = getErrorState();
        onChange?.(value);
        onValidate?.(!masterError);
        onError?.(masterError);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newValue = type === `number` ? parseInt(event.currentTarget.value) : event.currentTarget.value;
        updateValue(newValue);
    };

    useEffect(() => {
        onChange?.(value_);
    }, []);

    useEffect(() => {
        const masterError = getErrorState();
        onValidate?.(!masterError);
        onError?.(masterError);
    }, [ controlledError ]);

    useEffect(() => {
        if (value !== value_) {
            updateValue(value);
        }
    }, [ value ]);

    return <MUITextField
        className={className}
        variant={variant}
        value={value_}
        error={isControlledError() ? true : !!error_}
        helperText={hideHelperText ? undefined : isControlledError() ? controlledError : error_ ?? ` `}
        type={type}
        InputProps={{
            className: clsx({
                [classes.disabledText]: readOnly,
            }),
            readOnly,
            startAdornment: prependInner,
            endAdornment: appendInner,
        }}
        onChange={handleChange}
        {...rest}
    />;
}
TextField.displayName = `pxTextField`;
