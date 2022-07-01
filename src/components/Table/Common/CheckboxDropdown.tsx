import Checkbox,
{ CheckboxProps } from "../../Checkbox";
import { useTheme } from "@mui/material";

export interface CheckboxDropdownLocalization {
    selectAll?: string;
    numSelected?: (num: number) => string;
}

export interface TableCheckboxDropdownProps {
    indeterminate: boolean;
    checked: boolean;
    disabled: boolean;
    numSelected: number;
    localization?: CheckboxDropdownLocalization;
    onSelectAllClick: CheckboxProps[`onChange`];
}

export default function TableCheckboxDropdown (props: TableCheckboxDropdownProps) {
    const theme = useTheme();
    const selectAllTranslation = props.numSelected > 0
        ? (props.localization?.numSelected?.(props.numSelected) ?? `${props.numSelected} selected` )
        : (props.localization?.selectAll ?? `Select all`);
    return (
        <Checkbox
            label={selectAllTranslation}
            checked={props.checked}
            disabled={props.disabled}
            indeterminate={props.indeterminate}
            inputProps={{
                "aria-label": selectAllTranslation,
            }}
            sx={{
                marginLeft: 5/8,
            }}
            labelColor={props.numSelected > 0 ? theme.palette.primary.main : undefined}
            onChange={props.onSelectAllClick}
        />
    );
}
