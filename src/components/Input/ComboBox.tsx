import { Validator } from "../../validations";
import { FilterValueOption } from "../Table/Common/Filter/Filters";
import {
    getErrorText,
    Input,
} from "./shared";
import TextField from "./TextField";
import { createFilterOptions } from '@mui/base';
import {
    CheckBox,
    CheckBoxOutlineBlank,
} from '@mui/icons-material';
import {
    Autocomplete,
    Checkbox,
    Chip,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    checkBox: {
        marginRight: theme.spacing(1),
    },
}));

export interface Props extends Omit<Input, "value"> {
    value?: FilterValueOption[];
    type?: "text";
    className?: string;
    loading?: boolean;
    multiple?: boolean;
    size?: "small" | "medium";
    id?: string;
    error?: string;
    inputValue?: string;
    selectValidations?: Validator[];
    options?: FilterValueOption[];
    optionsLimit?: number;
    onInputChange?: (value: string) => void;
}

export default function ComboBox (props: Props) {
    const {
        multiple,
        value: selectValue,
        inputValue,
        size,
        options = [],
        optionsLimit = 10,
        id,
        error: controlledError,
        selectValidations,
        validations: inputValidations,
        onChange,
        onInputChange,
        onError,
        onFocus,
        onValidate,
        ...rest
    } = props;

    const classes = useStyles();

    const [ selectValue_, setSelectValue ] = useState<FilterValueOption[] | undefined>(selectValue);
    const [ selectError, setSelectError ] = useState(getErrorText(selectValue, selectValidations));
    const [ inputError, setInputError ] = useState(getErrorText(inputValue, inputValidations));
    const [ isOpen, setIsOpen ] = useState(false);

    const filterOptions = createFilterOptions<FilterValueOption>({
        limit: optionsLimit,
    });

    const updateSelectValue = (value: FilterValueOption[]) => {
        const newErrorState = getErrorText(value, selectValidations);

        setSelectError(newErrorState);
        setSelectValue(value);
        onChange?.(value);
        onValidate?.(!newErrorState);
        onError?.(newErrorState);
    };

    const handleSelectChange = (event: React.ChangeEvent<{}>, value: FilterValueOption | FilterValueOption[] | null) => {
        if (!value) {
            updateSelectValue([]);
            return;
        }
        if (!Array.isArray(value)) {
            onInputChange?.(value.label);
            updateSelectValue([ value ]);
            return;
        }
        updateSelectValue(value);
    };

    useEffect(() => {
        if (selectValue !== selectValue_) {
            updateSelectValue(selectValue ?? []);
        }
    }, [ selectValue ]);

    useEffect(() => {
        setInputError(getErrorText(inputValue, inputValidations));
    }, [ inputValue ]);

    useEffect(() => {
        onChange?.(selectValue_);
        onValidate?.(!selectError);
        onError?.(selectError);
    }, []);

    return (
        <Autocomplete
            openOnFocus
            open={isOpen}
            multiple={multiple}
            filterOptions={filterOptions}
            disableCloseOnSelect={multiple}
            clearOnEscape={false}
            clearOnBlur={false}
            value={selectValue}
            inputValue={inputValue}
            size={size}
            id={id}
            options={options}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.label ?? ``}
            renderTags={(values, getTagProps) => (
                values.map((option, index) => (
                    <Chip
                        label={option.label}
                        {...getTagProps({
                            index,
                        })}
                        key={option.value}
                    />
                ))
            )}
            renderOption={(props, option, { selected }) => (
                <li
                    {...props}
                    key={option.value}
                >
                    {multiple && (
                        <Checkbox
                            icon={<CheckBoxOutlineBlank />}
                            checkedIcon={<CheckBox />}
                            className={classes.checkBox}
                            checked={selected}
                            inputProps={{
                                // https://github.com/microsoft/TypeScript/issues/28960
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                "data-testid": `checkbox-root`,
                            }}
                        />
                    )}
                    {option?.label ?? ``}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    value={inputValue ?? ``}
                    error={controlledError ?? selectError ?? inputError}
                    validations={inputValidations}
                    onChange={onInputChange}
                    {...params}
                    {...rest}
                />
            )}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            onFocus={onFocus}
            onChange={handleSelectChange}
            onInputChange={(event, newInputValue, reason) => {
                switch (reason) {
                case `clear`:
                    onInputChange?.(``);
                    break;
                case `input`: //typed input
                    onInputChange?.(newInputValue);
                    break;
                case `reset`: //option select
                    onInputChange?.(newInputValue);
                    break;
                default:
                    onInputChange?.(newInputValue);
                }
            }}
        />
    );
}
