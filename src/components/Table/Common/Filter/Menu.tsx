import Button from '../../../Button/Button';
import Select from '../../../Input/Select';
import TextField from '../../../Input/TextField';
import {
    Filter,
    TableFilter,
} from './Filters';
import {
    Box,
    createStyles,
    Grid,
    makeStyles,
    Popover,
    Theme,
} from '@material-ui/core';
import React,
{
    useEffect,
    useState,
} from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: `8px`,
    },
    select: {
        margin: theme.spacing(0.5),
        minWidth: 160,
        maxWidth: 160,
    },
    actionButton: {
        marginLeft: theme.spacing(2),
    },
    actionsContainer: {
        display: `flex`,
        justifyContent: `flex-end`,
        paddingRight: 4,
    },
}));

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
    onClose: (filter?: Filter) => void;
}

export default function TableFilterMenu<T> (props: Props<T>) {
    const {
        anchorEl,
        isOpen,
        editingFilter,
        tableFilters,
        localization,
        onClose,
    } = props;
    const classes = useStyles();
    const startFilter = {
        columnId: ``,
        operatorValue: ``,
        values: [],
    };
    const [ filter, setFilter ] = useState<Filter>(editingFilter ?? startFilter);
    const [ selectValue, setSelectValue ] = useState(``);
    const [ selectValues, setSelectValues ] = useState<string[]>([]);
    const [ textFieldValue, setTextFieldValue ] = useState(``);
    const [ validValues, setValidValues ] = useState(true);

    const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === filter.columnId);
    const columns = tableFilters.map(({ id, label }) => ({
        id,
        label,
    }));
    const operators = tableFilter?.operators ?? [];

    const operator = tableFilter?.operators.find((operator) => operator.value === filter.operatorValue);

    const handleColumnChange = (columnId: string) => {
        const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === columnId);
        const operator = tableFilter?.operators[0];
        const operatorValue = operator?.value ?? ``;
        setFilter({
            ...filter,
            columnId,
            ...columnId !== filter.columnId
                ? {
                    operatorValue,
                    values: [],
                }
                : {},
        });
        if (columnId !== filter.columnId) {
            setSelectValue(``);
            setSelectValues([]);
            setTextFieldValue(``);
        }
    };

    const handleOperatorChange = (operatorValue: string) => {
        setFilter({
            ...filter,
            operatorValue,
            ...operatorValue !== filter.operatorValue ? {
                values: [],
            } : {},
        });
        if (operatorValue !== filter.operatorValue) {
            setSelectValue(``);
            setSelectValues([]);
            setTextFieldValue(``);
        }
    };

    const handleSelectValueChange = (value: string) => {
        setSelectValue(value);
        setFilter({
            ...filter,
            values: [ value ],
        });
    };

    const handleSelectValuesChange = (values: string[]) => {
        setSelectValues(values);
        setFilter({
            ...filter,
            values,
        });
    };

    const handleFreeTextValueChange = (value: string) => {
        setTextFieldValue(value);
        setFilter({
            ...filter,
            values: [ value ],
        });
    };

    useEffect(() => {
        if (!isOpen) return;
        const tableFilter = tableFilters.find((tableFilter) => tableFilter.id === editingFilter?.columnId) ?? tableFilters[0];
        const operator = tableFilter.operators.find((operator) => operator.value === editingFilter?.operatorValue) ?? tableFilter.operators[0];
        const firstValue = editingFilter?.values?.[0] ?? ``;
        const allValues = editingFilter?.values ?? [];
        setSelectValue(firstValue);
        setSelectValues(allValues);
        setTextFieldValue(firstValue);
        setFilter(editingFilter ?? {
            columnId: tableFilter.id,
            operatorValue: operator.value,
            values: operator.options?.length ? allValues : [ firstValue ],
        });
    }, [ editingFilter, isOpen ]);

    return (
        <Popover
            className={classes.root}
            anchorEl={anchorEl}
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
            <Box
                display="flex"
                flexDirection="column"
                p={2}
            >
                <div>
                    <Select
                        value={filter.columnId}
                        items={columns ?? []}
                        className={classes.select}
                        label={localization?.column ?? `Column`}
                        itemText={(column) => column.label}
                        itemValue={(column) => column.id}
                        onChange={handleColumnChange}
                    />
                    <Select
                        value={filter.operatorValue}
                        items={operators}
                        className={classes.select}
                        label={localization?.operator ?? `Operator`}
                        itemText={(operator) => operator.label}
                        itemValue={(operator) => operator.value}
                        onChange={handleOperatorChange}
                    />
                    {operator?.options?.length ? (
                        !operator?.multipleValues ? (
                            <Select
                                value={selectValue}
                                label={localization?.values ?? `Value`}
                                className={classes.select}
                                items={operator.options}
                                itemText={(item) => item.label}
                                itemValue={(item) => item.value}
                                validations={operator?.validations}
                                onChange={handleSelectValueChange}
                                onValidate={setValidValues}
                            />
                        ) : (
                            <Select
                                multiple
                                value={selectValues}
                                label={localization?.value ?? `Values`}
                                className={classes.select}
                                items={operator.options}
                                selectAllLabel={localization?.selectAllLabel}
                                itemText={(item) => item.label}
                                itemValue={(item) => item.value}
                                validations={operator?.validations}
                                onChange={handleSelectValuesChange}
                                onValidate={setValidValues}
                            />
                        )
                    ) : (
                        <TextField
                            value={textFieldValue}
                            label={localization?.value ?? `Value`}
                            className={classes.select}
                            type="text"
                            autoFocus={!editingFilter}
                            validations={operator?.validations}
                            onChange={handleFreeTextValueChange}
                            onValidate={setValidValues}
                        />
                    )}
                </div>
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
                            onClick={() => onClose(filter)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Popover>
    );
}
