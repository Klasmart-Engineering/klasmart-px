import {
    getErrorText,
    Input,
} from "./shared";
import {
    createStyles,
    makeStyles,
    TextField as TxtField,
} from "@material-ui/core";
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({}));

const parseValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: InputType) => type === `number` ? parseInt(event.currentTarget.value) : event.currentTarget.value;

export type InputType = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`

interface Props extends Input {
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
        onChange={handleChange}
        {...rest}
    />;
}
