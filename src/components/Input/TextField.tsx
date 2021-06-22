import {
    getErrorText,
    Input,
} from "./shared";
import {
    createStyles,
    makeStyles,
    TextField as TxtField,
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
}

export default function TextField (props: Props) {
    const {
        hideHelperText,
        value,
        validations,
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
    const [ value_, setValue ] = useState(value ?? ``);
    const [ error_, setError ] = useState(getErrorText(value, validations));

    const updateValue = (value: unknown) => {
        const error = getErrorText(value, validations);
        setValue(value);
        setError(error);
        onChange?.(value);
        onValidate?.(!error);
        onError?.(error);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = type === `number` ? parseInt(event.currentTarget.value) : event.currentTarget.value;
        updateValue(value);
    };

    useEffect(() => {
        if (value === value_) return;
        updateValue(value);
    }, [ value ]);

    useEffect(() => {
        onChange?.(value_);
        onValidate?.(!error_);
        onError?.(error_);
    }, []);

    return <TxtField
        className={className}
        variant={variant}
        value={value_}
        error={!!error_}
        helperText={hideHelperText ? undefined : (error_ ?? ` `)}
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
