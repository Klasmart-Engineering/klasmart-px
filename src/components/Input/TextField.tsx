import {
    getErrorText,
    Input,
} from "./util";
import {
    createStyles,
    makeStyles,
    TextField as TxtField,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

interface Props extends Input {
    className?: string;
    validations?: ((input: unknown) => true | string)[];
    hideHelperText?: boolean;
    onChange?: (value: string) => void;
    onValidate?: (valid: boolean) => void;
}

export default function TextField (props: Props) {
    const {
        hideHelperText,
        value,
        validations,
        onChange,
        onValidate,
        className,
        variant = `outlined`,
        ...rest
    } = props;
    const classes = useStyles();
    const [ value_, setValue ] = useState(value ?? ``);
    const [ error_, setError ] = useState(getErrorText(value, validations));

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value }= e.currentTarget;
        const error = getErrorText(value, validations);
        setError(error);
        onValidate?.(!error);
        setValue(value);
        onChange?.(value);
    };

    return <TxtField
        className={className}
        variant={variant}
        value={value_}
        error={!!error_}
        helperText={hideHelperText ? undefined : (error_ ?? ` `)}
        onChange={handleChange}
        {...rest}
    />;
}
