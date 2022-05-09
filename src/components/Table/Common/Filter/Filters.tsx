
import IconButton from '../../../Button/IconButton';
import AddFilterButton from './AddButton';
import TableFilterChips from './Chips';
import TableFilterMenu,
{ FilterMenuLocalization } from './Menu';
import {
    Clear as ClearIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';
import {
    Box,
    Theme,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: 52,
        position: `relative`,
        padding: theme.spacing(0, 0.5),
    },
    iconRowContainer: {
        height: `inherit`,
        left: 0,
        top: 0,
        display: `flex`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        width: `100%`,
        pointerEvents: `none`,
    },
    iconContainer: {
        margin: theme.spacing(1.75, 1.5),
        color: theme.palette.grey[600],
    },
    chipsContainer: {
        margin: theme.spacing(1, 0),
        pointerEvents: `auto`,
        marginRight: `auto`,
    },
    clearIcon: {
        marginTop: 4,
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

export interface FilterOperator {
    label: string;
    value: string;
    multipleValues?: boolean;
    validations?: ((input: unknown) => true | string)[];
    options?: FilterValueOption[];
    chipLabel?: (column: ReactNode, value: ReactNode) => ReactNode;
}

export interface Filter {
    columnId: string;
    operatorValue: string;
    values: string[];
}

export interface FilterLocalization {
    clearAll?: string;
    noAvailableFilters?: string;
    chipLabelValueOr?: string;
    filterMenu?: FilterMenuLocalization;
}

interface Props<T> {
    filters: TableFilter<T>[];
    localization?: FilterLocalization;
    onChange: Dispatch<SetStateAction<Filter[]>>;
}

export default function BaseTableFilter<T> (props: Props<T>) {
    const {
        localization,
        onChange,
        filters: tableFilters,
    } = props;
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
    const [ isFilterMenuOpen, setIsFilterMenuOpen ] = useState(false);
    const [ filters, setFilters ] = useState<Filter[]>([]);
    const [ editingFilter, setEditingFilter ] = useState<Filter>();
    const availableTableFilters = tableFilters.filter((tableFilter) => !filters.find((filter) => filter.columnId === tableFilter.id) || tableFilter.id === editingFilter?.columnId);
    const isCreateFilter = !editingFilter;

    const handleOpenFilterMenu = (event: React.MouseEvent<HTMLDivElement>, filter?: Filter) => {
        setEditingFilter(filter);
        setAnchorEl(event.currentTarget);
        setIsFilterMenuOpen(true);
    };

    const handleDeleteFilter = (selectedFilter: Filter) => {
        setFilters((filters) => filters.filter((filter) => filter.columnId !== selectedFilter.columnId));
    };

    const handleClearFilters = () => {
        setFilters([]);
    };

    const handleClose = (updatedFilter?: Filter) => {
        setFilters((filters) => {
            if (!updatedFilter) return filters;
            const updatedFilters = filters.map((filter) => filter.columnId === editingFilter?.columnId ? updatedFilter : filter);
            return [ ...updatedFilters, ...(isCreateFilter ? [ updatedFilter ] : []) ];
        });
        setIsFilterMenuOpen(false);
    };

    useEffect(() => {
        const updatedFilters = filters.filter((filter) => tableFilters ? tableFilters.find((filterElement) => filterElement.id === filter.columnId) : []);
        if(filters.length !== updatedFilters.length) setFilters(updatedFilters);
    }, [ tableFilters ]);

    useEffect(() => {
        onChange(filters);
    }, [ filters ]);

    return (
        <>
            <div className={classes.root}>
                <Box className={classes.iconRowContainer}>
                    <div className={classes.iconContainer}>
                        <FilterListIcon color="action" />
                    </div>
                    <div className={classes.chipsContainer}>
                        <TableFilterChips
                            localization={localization}
                            tableFilters={tableFilters}
                            filters={filters}
                            onClick={handleOpenFilterMenu}
                            onDelete={handleDeleteFilter}
                        />
                        <AddFilterButton
                            localization={localization}
                            filters={filters}
                            disabled={filters.length === tableFilters.length}
                            onClick={handleOpenFilterMenu}
                        />
                    </div>
                    {filters.length > 0 && (
                        <IconButton
                            className={classes.clearIcon}
                            icon={ClearIcon}
                            tooltip={localization?.clearAll ?? `Clear filters`}
                            data-testid="clearFilters"
                            size="medium"
                            onClick={handleClearFilters}
                        />
                    )}
                </Box>
            </div>

            <TableFilterMenu
                anchorEl={anchorEl}
                isOpen={isFilterMenuOpen}
                editingFilter={editingFilter}
                tableFilters={availableTableFilters}
                localization={localization?.filterMenu}
                onClose={handleClose}
            />
        </>);
}
