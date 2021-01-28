import {
    createStyles,
    makeStyles,
    OutlinedTextFieldProps,
    TextField,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

const getErrorText = (value: unknown, validations: ((input: unknown) => true | string)[] | undefined) => validations?.map((validation) => validation(value)).find((result) => result !== true);

interface Props extends Omit<OutlinedTextFieldProps, "children" | "onChange" | "variant"> {
    validations?: ((input: unknown) => true | string)[];
    hideHelperText?: boolean;
    onChange?: (value: string) => void;
    onValidChange?: (valid: boolean) => void;
}

export default function (props: Props) {
    const {
        hideHelperText,
        value,
        validations,
        onChange,
        onValidChange,
        className,
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

    return <TextField
        className={clsx(classes.root, className)}
        variant="outlined"
        value={value_}
        error={!!error_}
        helperText={hideHelperText ? undefined : (error_ ?? ` `)}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
    />;
}
