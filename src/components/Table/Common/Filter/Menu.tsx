
import Button from '../../../Button/Button';
import IconButton from '../../../Button/IconButton';
import ComboBox from '../../../Input/ComboBox';
import Select from '../../../Input/Select';
import TextField from '../../../Input/TextField';
import {
    Filter,
    FilterOperator,
    FilterValueOption,
    TableFilter,
} from './Filters';
import { Close } from '@mui/icons-material';
import {
    Box,
    Grid,
    Popover,
    Theme,
    Typography,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import {
    useEffect,
    useState,
} from 'react';
import { useResizeDetector } from 'react-resize-detector';

const CONTAINER_MAX_WIDTH = 368;
const CONTAINER_PADDING = 32;
const CONTENT_MAX_WIDTH = CONTAINER_MAX_WIDTH - CONTAINER_PADDING;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(1),
        width: `100%`,
    },
    menuContainer: {
        padding: theme.spacing(3),
    },
    valueComponent: {
        width: `100%`,
    },
    actionButton: {
        marginLeft: theme.spacing(2),
    },
    actionsContainer: {
        display: `flex`,
        justifyContent: `flex-end`,
        paddingRight: theme.spacing(1/2),
    },
    containerBox: {
        display: `flex`,
        flexDirection: `column`,
        padding: theme.spacing(2),
    },
}));

export type ValueComponent = `select` | `combo-box` | `text-field`;

export type FilterValueInputEventHandler = (columnId: string, operator: string, value: string) => void;
export interface FilterMenuLocalization {
    addFilter?: string;
    saveFilter?: string;
    filter?: string;
    cancel?: string;
    column?: string;
    operator?: string;
    value?: string;
    values?: string;
    selectAllLabel?: string;
}

export interface TableFilterMenuProps<T> {
    anchorEl: HTMLElement | null;
    editingFilter?: Filter;
    tableFilters: TableFilter<T>[];
    localization?: FilterMenuLocalization;
    filterValueLoading?: boolean;
    onFilterInputValueChange?: FilterValueInputEventHandler;
    onClose: (filter?: Filter) => void;
}

export default function TableFilterMenu<T> (props: TableFilterMenuProps<T>) {
    const {
        anchorEl,
        editingFilter,
        tableFilters,
        localization,
        filterValueLoading,
        onFilterInputValueChange,
        onClose,
    } = props;
    const classes = useStyles();
    const startFilter = {
        columnId: ``,
        operatorValue: ``,
        values: [],
    };

    const isOpen = Boolean(anchorEl);
    const isCreateFilter = !editingFilter;

    const { width = 0, ref } = useResizeDetector();

    const [ filter, setFilter ] = useState<Filter>(editingFilter ?? startFilter);

    const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === filter.columnId);
    const columns = tableFilters.map(({ id, label }) => ({
        id,
        label,
    }));
    const operators = tableFilter?.operators ?? [];
    const operator = tableFilter?.operators.find((operator) => operator.value === filter.operatorValue);

    const [ selectValues, setSelectValues ] = useState<string[]>([]);
    const [ validValues, setValidValues ] = useState(true);
    const [ comboBoxValue, setComboBoxValue ] = useState<FilterValueOption[]>((editingFilter?.values ?? []) as FilterValueOption[]);
    const [ textValue, setTextValue ] = useState(operator?.valueComponent === `text-field` ? filter.values[0] as string : ``);

    const resetValues = () => {
        setSelectValues([]);
        setComboBoxValue([]);
        setTextValue(``);
    };

    const handleColumnChange = (columnId: string) => {
        const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === columnId);
        const operator = tableFilter?.operators[0];
        const operatorValue = operator?.value ?? ``;
        setFilter({
            ...filter,
            columnId,
            ...(columnId !== filter.columnId ? {
                operatorValue,
                values: [],
            } : {}),
        });
        if (columnId !== filter.columnId) {
            resetValues();
        }
    };

    const handleOperatorChange = (operatorValue: string) => {
        setFilter({
            ...filter,
            operatorValue,
            ...(operatorValue !== filter.operatorValue ? {
                values: [],
            } : {}),
        });
        if (operatorValue !== filter.operatorValue) {
            resetValues();
        }
    };
    const handleSelectChange = (value: string) => {
        setTextValue(value);
        setFilter({
            ...filter,
            values: [ value ],
        });
    };

    const handleSelectsChange = (values: string[]) => {
        if (!values?.length) return;
        setSelectValues(values);
        setFilter({
            ...filter,
            values,
        });
    };

    const handleFreeTextValueChange = (value: string) => {
        setTextValue(value);
        setFilter({
            ...filter,
            values: [ value ],
        });
    };

    const handleComboBoxChange = (values: FilterValueOption[]) => {
        setComboBoxValue(values);
        setFilter({
            ...filter,
            values,
        });
    };

    const handleValueInputChange = (value: string) => {
        if (!value && !textValue) return;
        setTextValue(value);
        setFilter({
            ...filter,
            values: comboBoxValue,
        });
    };

    const handleValueInputFocus = () => {
        onFilterInputValueChange?.(filter.columnId, filter.operatorValue, textValue);
    };

    const getValueComponent = (operator: FilterOperator | undefined) => {
        switch (operator?.valueComponent) {
        case `combo-box`: return (
            <ComboBox
                multiple={operator.multipleValues}
                loading={filterValueLoading}
                value={comboBoxValue}
                inputValue={textValue}
                label={operator.multipleValues ? (localization?.values ?? `Values`) : (localization?.value ?? `Value`)}
                className={classes.valueComponent}
                options={operator.options}
                selectValidations={operator.validations}
                onChange={handleComboBoxChange}
                onValidate={setValidValues}
                onInputChange={handleValueInputChange}
                onFocus={handleValueInputFocus}
            />
        );
        case `select`: {
            if (operator.multipleValues) {
                return (
                    <Select
                        multiple
                        value={selectValues}
                        label={localization?.value ?? `Values`}
                        className={classes.valueComponent}
                        items={operator.options}
                        selectAllLabel={localization?.selectAllLabel}
                        itemText={(item) => item.label}
                        itemValue={(item) => item.value}
                        validations={operator.validations}
                        onChange={handleSelectsChange}
                        onValidate={setValidValues}
                    />
                );
            } else {
                return (
                    <Select
                        value={textValue}
                        label={localization?.values ?? `Value`}
                        className={classes.valueComponent}
                        items={operator.options}
                        itemText={(item) => item.label}
                        itemValue={(item) => item.value}
                        validations={operator.validations}
                        onChange={handleSelectChange}
                        onValidate={setValidValues}
                    />
                );
            }
        }
        case `text-field`:
        default:
            return (
                <TextField
                    value={textValue}
                    label={localization?.value ?? `Value`}
                    className={classes.valueComponent}
                    type="text"
                    autoFocus={!editingFilter}
                    validations={operator?.validations}
                    onChange={handleFreeTextValueChange}
                    onValidate={setValidValues}
                />
            );
        }
    };

    useEffect(() => {
        if (operator?.valueComponent === `combo-box`) {
            onFilterInputValueChange?.(filter.columnId, filter.operatorValue, textValue);
        }
    }, [ textValue ]);

    useEffect(() => {
        if (comboBoxValue.length && operator?.valueComponent === `combo-box` && !operator?.multipleValues) {
            setTextValue(comboBoxValue[0].label ?? ``);
        }
    }, [ comboBoxValue ]);

    const isFilterValueOption = (value: FilterValueOption | string): value is FilterValueOption => {
        return (value as FilterValueOption).value !== undefined;
    };

    useEffect(() => {
        if (!isOpen) return;
        const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === editingFilter?.columnId) ?? tableFilters[0];
        const operator = tableFilter.operators.find((operator) => operator.value === editingFilter?.operatorValue) ?? tableFilter.operators[0];
        const firstValue = typeof editingFilter?.values?.[0] === `string` ? editingFilter?.values?.[0] : (editingFilter?.values?.[0].label ?? ``);
        const allValues = editingFilter?.values ?? [];

        switch (operator?.valueComponent) {
        case `combo-box`:
            setTextValue(!operator.multipleValues ? firstValue : ``);
            setComboBoxValue(allValues as FilterValueOption[]);
            break;
        case `select`: {
            const allSelectValues = editingFilter?.values.map((value) => isFilterValueOption(value) ? value.value : value) ?? []; // TODO: remove type guard when select items are changed to object values
            setTextValue(!operator.multipleValues ? firstValue : ``);
            setSelectValues(allSelectValues);
            break;
        }
        default:
            setTextValue(operator?.valueComponent === `text-field` ? firstValue : ``);
        }
        setFilter(editingFilter ?? {
            columnId: tableFilter.id,
            operatorValue: operator.value,
            values: operator.valueComponent !== `text-field` && operator.options.length ? allValues : [ firstValue ],
        });
    }, [ editingFilter, anchorEl ]);

    return (
        <Popover
            tabIndex={0}
            classes={{
                paper: classes.root,
            }}
            anchorEl={anchorEl}
            PaperProps={{
                ref: ref,
                style: {
                    maxWidth: CONTAINER_MAX_WIDTH,
                },
                sx: {
                    borderColor: `primary.main`,
                },
                variant: `outlined`,
            }}
            open={isOpen}
            anchorOrigin={{
                vertical: `bottom`,
                horizontal: isCreateFilter ? `right` : `left`,
            }}
            transformOrigin={{
                vertical: `top`,
                horizontal: isCreateFilter ? `right` : `left`,
            }}
            onClose={() => onClose()}
        >
            <div className={classes.menuContainer}>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h6">{localization?.filter ?? `Filter`}</Typography>
                    <Box flex="1" />
                    <IconButton
                        icon={Close}
                        tooltip={localization?.cancel ?? `Cancel`}
                        onClick={() => onClose()}
                    />
                </Box>
                <Grid
                    container
                    direction={width < CONTENT_MAX_WIDTH ? `column` : `row`}
                    spacing={2}
                >
                    <Grid
                        item
                        xs={width < CONTENT_MAX_WIDTH ? 12 : 6}
                    >
                        <Select
                            value={filter.columnId}
                            items={columns ?? []}
                            className={classes.valueComponent}
                            label={localization?.column ?? `Column`}
                            itemText={(column) => column.label}
                            itemValue={(column) => column.id}
                            onChange={handleColumnChange}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={width < CONTENT_MAX_WIDTH ? 12 : 6}
                    >
                        <Select
                            disabled={operators.length === 1}
                            value={filter.operatorValue}
                            items={operators}
                            className={classes.valueComponent}
                            label={localization?.operator ?? `Operator`}
                            itemText={(operator) => operator.label}
                            itemValue={(operator) => operator.value}
                            onChange={handleOperatorChange}
                        />
                    </Grid>
                </Grid>
                {getValueComponent(operator)}
                <Grid
                    container
                    spacing={1}
                    justifyContent="flex-end"
                    className={classes.actionsContainer}
                >
                    <Grid item>
                        <Button
                            disabled={!validValues}
                            variant="text"
                            color="primary"
                            label={!editingFilter ? (localization?.addFilter ?? `Add Filter`) : (localization?.saveFilter ?? `Save Filter`)}
                            onClick={() => {
                                onClose(filter);
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </Popover>
    );
}
