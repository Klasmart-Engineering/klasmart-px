
import Button from '../../../Button/Button';
import ComboBox from '../../../Input/ComboBox';
import Select from '../../../Input/Select';
import TextField from '../../../Input/TextField';
import {
    Filter,
    FilterOperator,
    FilterValueOption,
    TableFilter,
} from './Filters';
import {
    Grid,
    Popover,
    Theme,
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
        padding: theme.spacing(2),
        paddingTop: theme.spacing(3),
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
    cancel?: string;
    saveFilter?: string;
    column?: string;
    operator?: string;
    value?: string;
    values?: string;
    selectAllLabel?: string;
}

interface Props<T> {
    anchorEl: HTMLElement | null;
    isOpen: boolean;
    editingFilter: Filter | undefined;
    tableFilters: TableFilter<T>[];
    localization?: FilterMenuLocalization;
    filterValueLoading?: boolean;
    onFilterInputValueChange?: FilterValueInputEventHandler;
    onClose: (filter?: Filter) => void;
}

export default function TableFilterMenu<T> (props: Props<T>) {
    const {
        anchorEl,
        isOpen,
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
    const { width = 0, ref } = useResizeDetector();

    const [ filter, setFilter ] = useState<Filter>(editingFilter ?? startFilter);
    const [ selectValues, setSelectValues ] = useState<string[]>([]);
    const [ validValues, setValidValues ] = useState(true);
    const [ comboBoxValue, setComboBoxValue ] = useState<FilterValueOption[]>([]);
    const [ textValue, setTextValue ] = useState(``);

    const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === filter.columnId);
    const columns = tableFilters.map(({ id, label }) => ({
        id,
        label,
    }));
    const operators = tableFilter?.operators ?? [];

    const operator = tableFilter?.operators.find((operator) => operator.value === filter.operatorValue);

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

    const getValueComponent = (operator: FilterOperator) => {
        switch (operator.valueComponent) {
        case `combo-box`: return (
            <ComboBox
                multiple={operator.multipleValues}
                loading={filterValueLoading}
                value={comboBoxValue}
                inputValue={textValue}
                label={localization?.value ?? `Value`}
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
                    validations={operator.validations}
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
        case `select`:
            setTextValue(!operator.multipleValues ? firstValue : ``);
            setSelectValues(allValues as string[]); // TODO: remove casting when select items are changed to object values
            break;
        default:
            setTextValue(``);
        }
        setFilter(editingFilter ?? {
            columnId: tableFilter.id,
            operatorValue: operator.value,
            values: operator.valueComponent !== `text-field` && operator.options.length ? allValues : [ firstValue ],
        });
    }, [ editingFilter, isOpen ]);

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
            }}
            open={isOpen}
            anchorOrigin={{
                vertical: `bottom`,
                horizontal: `left`,
            }}
            transformOrigin={{
                vertical: `top`,
                horizontal: `left`,
            }}
            onClose={() => onClose()}
        >
            <div className={classes.menuContainer}>
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
                {operator && getValueComponent(operator)}
                <Grid
                    container
                    spacing={1}
                    justifyContent="flex-end"
                    className={classes.actionsContainer}
                >
                    <Grid item>
                        <Button
                            className={classes.actionButton}
                            color="primary"
                            label={localization?.cancel ?? `Cancel`}
                            onClick={() => onClose()}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={!validValues}
                            variant="contained"
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
