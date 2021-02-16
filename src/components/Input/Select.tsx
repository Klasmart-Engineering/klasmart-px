import {
    getErrorText,
    Input,
} from "./util";
import {
    Checkbox,
    createStyles,
    Divider,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    TextField,
} from "@material-ui/core";
import clsx from "clsx";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        "& .MuiTypography-body1": {
            lineHeight: `inherit`,
        },
        "& .MuiListItemText-root": {
            margin: 0,
        },
    },
}));

interface Props<T> extends Omit<Input, "value" | "onChange"> {
    value: string | string[];
    className?: string;
    items: T[];
    selectAllLabel?: string;
    noDataLabel?: string;
    multiple?: boolean;
    itemValue?: (item: T) => string;
    itemText?: (item: T) => string;
    onChange?: (value: string | string[]) => void;
}

export default function Select<T> (props: Props<T>) {
    const {
        className,
        label,
        items,
        value,
        selectAllLabel,
        noDataLabel,
        hideHelperText,
        multiple,
        validations,
        itemValue = (item) => String(item),
        itemText = (item) => String(item),
        variant = `outlined`,
        onBlur,
        onFocus,
        onChange,
        onValidate,
        ...rest
    } = props;
    const classes = useStyles();
    const [ value_, setValue ] = useState(multiple && !Array.isArray(value) ? [ value ] : value);
    const [ error_, setError ] = useState(getErrorText(value, validations));

    const getToggleSelectAll = (values: string[]) => values.length !== items.length ? items.map(itemValue) : [];

    const handleChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown}>, child: React.ReactNode) => {
        let value = event.target.value as string | string[];
        if (Array.isArray(value) && value.includes(``)) {
            value = getToggleSelectAll(value.filter((v) => v));
        }
        const error = getErrorText(value, validations);
        setValue(value);
        setError(error);
        onChange?.(value);
        onValidate?.(!error);
    };

    const menuItems = items.map((item) => (
        <MenuItem
            key={itemValue(item)}
            value={itemValue(item)}
        >
            {multiple &&
                <ListItemIcon>
                    <Checkbox checked={value_.includes(itemValue(item))} />
                </ListItemIcon>
            }
            <ListItemText>
                {itemText(item)}
            </ListItemText>
        </MenuItem>
    ));
    if (multiple) menuItems.unshift(
        <MenuItem
            key="selectAll"
            value=""
        >
            <ListItemIcon>
                <Checkbox
                    checked={items.map(itemValue).every((v) => value_.includes(v))}
                    indeterminate={value_.length > 0 && value_.length < items.length}
                />
            </ListItemIcon>
            <ListItemText>
                {selectAllLabel ?? `Select All`}
            </ListItemText>
        </MenuItem>,
        <Divider key="divider"/>,
    );

    return <>
        <TextField
            select
            className={clsx(className, classes.root)}
            label={label}
            variant={variant}
            helperText={hideHelperText ? undefined : (error_ ?? ` `)}
            error={!!error_}
            SelectProps={{
                multiple,
                renderValue: Array.isArray(value_) && !value_.includes(``) ? (value) =>
                    value_.map((v) => {
                        const item = items.find((item) => itemValue(item) === v);
                        if (!item) return ``;
                        return itemText(item);
                    }).join(`, `) : undefined,
                value: value_,
                onBlur,
                onChange: handleChange,
                onFocus,
            }}
            {...rest}
        >
            {items.length === 0
                ? <MenuItem disabled>
                    <ListItemText>
                        {noDataLabel ?? `No items`}
                    </ListItemText>
                </MenuItem>
                : menuItems}
        </TextField>
    </>;
}
