import {
    createStyles,
    FilledTextFieldProps,
    makeStyles,
    OutlinedTextFieldProps,
    StandardTextFieldProps,
    TextField as TxtField,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

const getErrorText = (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => validations?.map((validation) => validation(value)).find((result) => result !== true);

interface Props extends Omit<StandardTextFieldProps | OutlinedTextFieldProps | FilledTextFieldProps, "children" | "onChange"> {
    validations?: ((input: unknown) => true | string)[];
    hideHelperText?: boolean;
    onChange?: (value: string) => void;
    onValidChange?: (valid: boolean) => void;
}

export default function TextField (props: Props) {
    const {
        hideHelperText,
        value,
        validations,
        onChange,
        onValidChange,
        className,
        variant = `outlined`,
        ...rest
    } = props;
    const classes = useStyles();
    const [ value_, setValue ] = useState(value ?? ``);
    const [ error_, setError ] = useState(getErrorText(value, validations));

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value }= e.currentTarget;
        setValue(value);
        onChange?.(value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const error = getErrorText(e.currentTarget.value, validations);
        setError(error);
        onValidChange?.(!error);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(undefined);
    };

    return <TxtField
        className={className}
        variant={variant}
        value={value_}
        error={!!error_}
        helperText={hideHelperText ? undefined : (error_ ?? ` `)}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
    />;
}
