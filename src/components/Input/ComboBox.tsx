import { Validator } from "../../validations";
import {
    getErrorText,
    Input,
} from "./shared";
import TextField from "./TextField";
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { FilterOptionsState } from "@material-ui/lab";
import Autocomplete,
{ createFilterOptions }from "@material-ui/lab/Autocomplete";
import React,
{
    useEffect,
    useState,
} from "react";

export interface AutoCompleteOption {
    id: number;
    text: string;
}

export interface Props extends Omit<Input, "value"> {
  value?: AutoCompleteOption | AutoCompleteOption[];
  type?: "text";
  className?: string;
  loading?: boolean;
  multiple?: boolean;
  size?: "small" | "medium";
  error?: string;
  inputValue?: string;
  selectValidations?: Validator[];
  options: AutoCompleteOption[];
  optionsLimit?: number;
  onInputChange?: (value: string) => void;
}

export default function ComboBox (props: Props) {
    const {
        multiple,
        value: selectValue,
        inputValue,
        size,
        options,
        optionsLimit,
        error: controlledError,
        selectValidations,
        validations: inputValidations,
        onChange, //this onChange handles the selectValue change
        onInputChange, //this onInputChange handles the typed input change
        onError,
        onValidate,
        ...rest
    } = props;

    const [ selectValue_, setSelectValue ] = useState<AutoCompleteOption | (AutoCompleteOption | undefined)[] | undefined | null>(multiple && !Array.isArray(selectValue) ? [ selectValue ] : selectValue);
    const [ selectError, setSelectError ] = useState(getErrorText(selectValue, selectValidations));
    const [ inputError, setInputError ] = useState(getErrorText(inputValue, inputValidations));

    const filterOptions: (options: AutoCompleteOption[], state: FilterOptionsState<AutoCompleteOption>) => AutoCompleteOption[] = createFilterOptions({
        limit: optionsLimit,
    });

    const updateSelectValue = ( value: AutoCompleteOption | AutoCompleteOption[] | undefined | null) => {
        const newErrorState = getErrorText(value, selectValidations);

        setSelectError(newErrorState);
        setSelectValue(value);
        onChange?.(value);
        onValidate?.(!newErrorState);
        onError?.(newErrorState);
    };

    const handleSelectChange = (event: React.ChangeEvent<{}>, value: AutoCompleteOption | AutoCompleteOption[] | undefined | null) => {
        updateSelectValue(value);
    };

    useEffect(() => {
        if (selectValue !== selectValue_) {
            updateSelectValue(selectValue);
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
            multiple={multiple}
            filterOptions={filterOptions}
            disableCloseOnSelect={multiple}
            clearOnEscape={false}
            clearOnBlur={false}
            value={selectValue}
            inputValue={inputValue}
            size={size}
            id="combo-box"
            options={options}
            getOptionLabel={(option: AutoCompleteOption) => option.text}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={option.id}
                        label={option.text}
                        {...getTagProps({
                            index,
                        })}
                    />
                ))
            }
            renderOption={(option, { selected }) => {
                return (
                    <>
                        {multiple && (
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                style={{
                                    marginRight: 8,
                                }}
                                checked={selected}
                                inputProps={{
                                    // https://github.com/microsoft/TypeScript/issues/28960
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    "data-testid": `checkbox-root`,
                                }}
                            />
                        )}
                        {option.text}
                    </>
                );
            }}
            renderInput={(params) => (
                <TextField
                    value={inputValue}
                    error={controlledError ?? selectError ?? inputError}
                    validations={inputValidations}
                    onChange={onInputChange}
                    {...params}
                    {...rest}
                />
            )}
            onChange={handleSelectChange}
        />
    );
}
