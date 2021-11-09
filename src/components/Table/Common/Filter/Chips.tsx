import {
    Filter,
    FilterLocalization,
    TableFilter,
} from './Filters';
import {
    Chip,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import React,
{ ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            margin: theme.spacing(0.5, 0.5),
            minHeight: 32,
            height: `inherit`,
            "& > .MuiChip-label": {
                padding: theme.spacing(7/8, 1.5),
            },
        },
        addChip: {
            '& .MuiChip-icon': {
                marginRight: 20,
                marginLeft: 4,
            },
        },
        chipText: {
            whiteSpace: `break-spaces`,
        },
    }),
);

interface Props<T> {
    localization?: FilterLocalization;
    tableFilters: TableFilter<T>[] | undefined;
    filters: Filter[];
    onClick: (event: React.MouseEvent<HTMLDivElement>, filterChip: Filter) => void;
    onDelete: (filterChip: Filter) => void;
}

export default function TableFilterChips<T>(props: Props<T>) {
    const {
        localization,
        filters,
        tableFilters,
        onClick,
        onDelete,
    } = props;
    const classes = useStyles();

    const onChipLabelFallback = (column: ReactNode, operator: string, value: ReactNode) => (
        <>
            {column}
            {` ${operator.toLowerCase()} `}
            {value}
        </>
    );

    return (
        <>
            {filters.map((filter) => {
                const currentFilter = tableFilters?.find((filterElement) => filterElement.id === filter.columnId);
                const operator = currentFilter?.operators?.find((operator) => operator.value === filter.operatorValue);
                const columnText = (
                    <Typography
                        color="textPrimary"
                        variant="inherit"
                    >
                        {currentFilter?.label}
                    </Typography>
                );
                const values = (
                    operator?.options
                        ? filter.values.map((value) => operator.options?.find((option) => option.value === value)?.label)
                        : filter.values
                ).map((value) => `"${value}"`);

                const valueText = (
                    <Typography
                        color="textPrimary"
                        variant="inherit"
                    >
                        {values.map((value, index, values) => (
                            <React.Fragment key={`${value}-${index}`}>
                                {value}
                                {/* all items before second last index */}
                                {index < values.length - 2 && (
                                    <Typography
                                        color="textSecondary"
                                        variant="inherit"
                                    >
                                        {`, `}
                                    </Typography>
                                )}
                                {/* second last index */}
                                {index === values.length - 2 && (
                                    <Typography
                                        color="textSecondary"
                                        variant="inherit"
                                    >
                                        {localization?.chipLabelValueOr ?? ` or `}
                                    </Typography>
                                )}
                            </React.Fragment>
                        ))}
                    </Typography>
                );
                return (
                    <Chip
                        key={filter.columnId}
                        clickable
                        label={(
                            <Typography
                                className={classes.chipText}
                                color="textSecondary"
                                variant="inherit"
                            >
                                {operator?.chipLabel?.(columnText, valueText) ?? onChipLabelFallback(columnText, operator!.label, valueText)}
                            </Typography>
                        )}
                        className={classes.chip}
                        data-testid={`${filter.columnId}ChipLabel`}
                        onClick={(event) => onClick(event, filter)}
                        onDelete={() => onDelete(filter)}
                    />
                );
            })}
        </>
    );
}
