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
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

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

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value =  type === `number` ? parseInt(event.currentTarget.value) : event.currentTarget.value ;
        const error = getErrorText(value, validations);
        setValue(value);
        setError(error);
        onChange?.(value);
        onValidate?.(!error);
        onError?.(error);
    };

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
