import {
    Chip,
    makeStyles,
} from "@material-ui/core";
import { StandardTextFieldProps } from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import StyledTextField from "./styledTextField";

interface Props extends StandardTextFieldProps {
    type: "single" | "multiple";
    label: string;
    options: string[];
    value: string;
    onChange: any;
    disabled?: boolean;
}

const useStyles = makeStyles(() => ({
    root: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: `#1896ea`, // default
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `#1896ea`, // hovered
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `#c9caca`, // focused
        },
    },
}));

export default function StyledComboBox(props: Props) {
    const {
        type,
        label,
        options,
        value,
        onChange,
        disabled,
        ...other
    } = props;
    const classes = useStyles();

    if (type === `single`) {
        return (
            <Autocomplete
                disabled={disabled ? disabled : false}
                className={classes.root}
                options={options}
                filterOptions={(options, state) => options} // Always list all option
                getOptionLabel={(option) => option}
                inputValue={value} // If it already have value, value will be autofilled by inputValue
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <StyledTextField
                            {...other}
                            {...params}
                            fullWidth
                            required
                            label={label}
                            placeholder="Please Select"
                            value={value}
                        />
                    </div>
                )}
                onChange={onChange}
            />
        );
    } else {
        return (
            <Autocomplete
                multiple
                freeSolo
                className={classes.root}
                limitTags={2}
                options={options}
                // getOptionLabel={option => option}
                ListboxProps={{
                    classes: {
                        color: `#1896ea`,
                    },
                }}
                renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip
                            key={`option-${index}`}
                            variant="outlined"
                            label={option}
                            {...getTagProps({
                                index,
                            })}
                        />
                    ))
                }
                // defaultValue={["a", "b", "c"]} // If it already have value, value will be autofilled by inputValue
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <StyledTextField
                            {...params}
                            // {...other}
                            fullWidth
                            required
                            label={label}
                            value={value}
                        />
                    </div>
                )}
                onChange={onChange}
            />
        );
    }
}
