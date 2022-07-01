/* eslint-disable react/prop-types */
import {
    Checkbox as MUICheckbox,
    CheckboxProps as MUICheckboxProps,
    FormControlLabel,
    FormControlLabelProps,
} from "@mui/material";

export interface CheckboxProps extends MUICheckboxProps, Partial<Pick<FormControlLabelProps, "label" | "labelPlacement" | "value">> {
    labelColor?: FormControlLabelProps[`color`];
}

const Checkbox: React.VFC<CheckboxProps> = (props) => {
    const {
        label,
        labelColor,
        labelPlacement,
        value,
        ...rest
    } = props;
    return (
        <FormControlLabel
            control={<MUICheckbox {...rest} />}
            color={labelColor}
            label={label}
            labelPlacement={labelPlacement}
            value={value}
            sx={{
                marginLeft: 0,
                marginRight: 1,
                "& .MuiFormControlLabel-label": {
                    color: labelColor,
                },
            }}
        />
    );
};

export default Checkbox;
