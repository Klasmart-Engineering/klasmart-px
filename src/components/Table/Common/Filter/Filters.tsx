import IconButton from '../../../Button/IconButton';
import TableFilterChips from './Chips';
import
{ FilterMenuLocalization } from './Menu';
import {
    Clear as ClearIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import {
    Dispatch,
    ReactNode,
    SetStateAction,
} from 'react';

const useStyles = makeStyles((theme) => createStyles({
    iconRowContainer: {
        display: `flex`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        width: `100%`,
        pointerEvents: `none`,
        padding: theme.spacing(0, 5/8),
    },
    iconContainer: {
        margin: theme.spacing(1, 1.25),
        color: theme.palette.grey[600],
    },
    chipsContainer: {
        pointerEvents: `auto`,
        marginRight: `auto`,
    },
    clearIcon: {
        pointerEvents: `auto`,
    },
}));

export interface TableFilter<T> {
    id: Extract<keyof T, string>;
    label: string;
    operators: FilterOperator[];
}

export interface FilterValueOption {
    label: string;
    value: string;
}

interface BaseFilterOperator {
    label: string;
    value: string;
    validations?: ((input: unknown) => true | string)[];
    chipLabel?: (column: ReactNode, value: ReactNode) => ReactNode;
}
export interface ComboBoxFilterOperator extends BaseFilterOperator {
    multipleValues?: boolean;
    options: FilterValueOption[];
    valueComponent: `combo-box`;
}
export interface TextFieldFilterOperator extends BaseFilterOperator {
    valueComponent: `text-field`;
}
export interface SelectFilterOperator extends BaseFilterOperator {
    multipleValues?: boolean;
    options: FilterValueOption[];
    valueComponent: `select`;
}

export type FilterOperator = ComboBoxFilterOperator | TextFieldFilterOperator | SelectFilterOperator;

export interface Filter {
    columnId: string;
    operatorValue: string;
    values: FilterValueOption[] | string[];
}

export interface FilterLocalization {
    clearAll?: string;
    noAvailableFilters?: string;
    chipLabelValueOr?: string;
    filterMenu?: FilterMenuLocalization;
}

interface Props<T> {
    selectedFilters: Filter[];
    filters: TableFilter<T>[];
    localization?: FilterLocalization;
    onChange: Dispatch<SetStateAction<Filter[]>>;
    onOpenFilterMenu: (event: React.MouseEvent<HTMLDivElement>, filterChip: Filter) => void;
}

export default function SelectedTableFilterChips<T> (props: Props<T>) {
    const classes = useStyles();

    const handleClearFilters = () => {
        props.onChange([]);
    };

    const handleDeleteFilter = (selectedFilter: Filter) => {
        props.onChange((filters) => filters.filter((filter) => filter.columnId !== selectedFilter.columnId));
    };

    return (
        <Box className={classes.iconRowContainer}>
            <div className={classes.iconContainer}>
                <FilterListIcon color="action" />
            </div>
            <div className={classes.chipsContainer}>
                <TableFilterChips
                    localization={props.localization}
                    tableFilters={props.filters}
                    filters={props.selectedFilters}
                    onClick={props.onOpenFilterMenu}
                    onDelete={handleDeleteFilter}
                />
            </div>
            {props.filters.length > 0 && (
                <IconButton
                    className={classes.clearIcon}
                    icon={ClearIcon}
                    tooltip={props.localization?.clearAll ?? `Clear filters`}
                    data-testid="clearFilters"
                    size="medium"
                    onClick={handleClearFilters}
                />
            )}
        </Box>
    );
}
