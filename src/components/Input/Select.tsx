import LoadingIndicator from "./LoadingIndicator";
import {
    getErrorText,
    Input,
} from "./shared";
import {
    Checkbox,
    createStyles,
    Divider,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    TextField,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { isEqual } from "lodash";
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        "& .MuiTypography-body1": {
            lineHeight: `inherit`,
        },
        "& .MuiListItemText-root": {
            margin: 0,
        },
    },
    sectionHeader: {
        padding: theme.spacing(1, 2, 0),
        fontWeight: 600,
        textTransform: `uppercase`,
    },
}));
export interface Section<T> {
    items: T[];
    header?: string;
    ignoreSelectAll?: boolean;
}

export interface Props<T> extends Input {
    value: string | string[];
    className?: string;
    items: T[];
    sections?: Section<T>[];
    selectAllLabel?: string;
    noDataLabel?: string;
    multiple?: boolean;
    itemText?: (item: T) => string;
    itemValue?: (item: T) => string;
    loading?: boolean;
}

export default function Select<T> (props: Props<T>) {
    const {
        className,
        label,
        items,
        sections,
        value,
        selectAllLabel,
        noDataLabel,
        hideHelperText,
        multiple,
        validations,
        itemText = (item) => String(item),
        itemValue = (item) => String(item),
        variant = `outlined`,
        readOnly,
        prependInner,
        appendInner,
        onBlur,
        onFocus,
        onChange,
        onError,
        onValidate,
        loading,
        ...rest
    } = props;
    const classes = useStyles();
    const [ value_, setValue ] = useState(multiple && !Array.isArray(value) ? [ value ] : value);
    const [ error_, setError ] = useState(getErrorText(value, validations));

    const selectAllItems = [ ...items, ...sections?.filter((section) => !section.ignoreSelectAll).flatMap((section) => section.items) ?? [] ];
    const allItems = [ ...items, ...sections?.flatMap((section) => section.items) ?? [] ];

    const getToggleSelectAll = (values: string[]) => values.length !== selectAllItems.length ? selectAllItems.map(itemValue) : [];

    const updateValue = (value: string | string[]) => {
        if (Array.isArray(value) && value.includes(``)) {
            value = getToggleSelectAll(value.filter((v) => v));
        }
        const error = getErrorText(value, validations);
        setValue(value);
        setError(error);
        onChange?.(value);
        onValidate?.(!error);
        onError?.(error);
    };

    const handleChange = (event: React.ChangeEvent<{name?: string | undefined; value: unknown}>, child: React.ReactNode) => {
        const value = event.target.value as string | string[];
        updateValue(value);
    };

    useEffect(() => {
        if (Array.isArray(value) && Array.isArray(value_)) {
            const newValue = [ ...value ].sort((a, b) => a.localeCompare(b));
            const oldValue = [ ...value_ ].sort((a, b) => a.localeCompare(b));
            if (isEqual(newValue, oldValue)) return;
        }
        if (isEqual(value, value_)) return;
        updateValue(value);
    }, [ value ]);

    useEffect(() => {
        onChange?.(value_);
        onValidate?.(!error_);
        onError?.(error_);
    }, []);

    const menuItems = items.map((item) => (
        <MenuItem
            key={itemValue(item)}
            value={itemValue(item)}
        >
            {multiple && Array.isArray(value_) &&
                <ListItemIcon>
                    <Checkbox checked={!!value_.find((v) => v === itemValue(item))} />
                </ListItemIcon>
            }
            <ListItemText>
                {itemText(item)}
            </ListItemText>
        </MenuItem>
    ));

    if (sections?.length) {
        const allSectionElements = sections.flatMap((section, i) => {
            const sectionElements = [
                ...section.items.map((item) => (
                    <MenuItem
                        key={itemValue(item)}
                        value={itemValue(item)}
                    >
                        {multiple && Array.isArray(value_) &&
                    <ListItemIcon>
                        <Checkbox checked={!!value_.find((v) => v === itemValue(item))} />
                    </ListItemIcon>
                        }
                        <ListItemText>
                            {itemText(item)}
                        </ListItemText>
                    </MenuItem>
                )),
                ...(i !== sections.length - 1 || !items.length) ? [] : [ <Divider key={`section-divider-${i}`}/> ],
            ];
            if (section.header) {
                sectionElements.unshift(<Typography
                    key={`section-header-${i}`}
                    variant="caption"
                    color="textSecondary"
                    component="div"
                    className={classes.sectionHeader}
                >
                    {section.header}
                </Typography>);
            }
            return sectionElements;
        });
        menuItems.unshift(...allSectionElements);
    }
    if (multiple && Array.isArray(value_)) {
        const selectAllSectionItems = (sections?.filter((section) => !section.ignoreSelectAll).flatMap((section) => section.items) ?? []);
        const currentSelectAllValues = [ ...items, ...selectAllSectionItems ].filter((item) => !!value_.find((v) => v === itemValue(item)));
        menuItems.unshift(<MenuItem
            key="selectAll"
            value=""
        >
            <ListItemIcon>
                <Checkbox
                    checked={selectAllItems.every((item) => !!value_.find((v) => v === itemValue(item)))}
                    indeterminate={currentSelectAllValues.length > 0 && currentSelectAllValues.length < selectAllItems.length}
                />
            </ListItemIcon>
            <ListItemText>
                {selectAllLabel ?? `Select All`}
            </ListItemText>
        </MenuItem>, <Divider key="divider"/>);
    }

    return <>
        <TextField
            select
            className={clsx(className, classes.root)}
            label={label}
            variant={variant}
            helperText={hideHelperText ? undefined : (error_ ?? ` `)}
            error={!!error_}
            InputProps={{
                readOnly,
                startAdornment: prependInner,
                endAdornment: (
                    <>
                        {appendInner}
                        <LoadingIndicator
                            loading={loading}
                            variant={variant}
                        />
                    </>
                ),
            }}
            SelectProps={{
                multiple,
                renderValue: Array.isArray(value_) && !value_.includes(``)
                    ? (value) => value_.map((v) => {
                        const item = allItems.find((item) => itemValue(item) === v);
                        if (!item) return ``;
                        return itemText(item);
                    }).join(`, `)
                    : undefined,
                value: multiple && !Array.isArray(value_) ? [ value_ ] : value_,
                onBlur,
                onChange: handleChange,
                onFocus,
            }}
            {...rest}
        >
            {!allItems.length || !menuItems.length
                ? <MenuItem disabled>
                    <ListItemText>
                        {noDataLabel ?? `No items`}
                    </ListItemText>
                </MenuItem>
                : menuItems}
        </TextField>
    </>;
}
