/* eslint-disable react/prop-types */
import Button from "../../../Button/Button";
import { SelectMode } from "../BaseTable";
import TableCheckboxDropdown,
{ TableCheckboxDropdownProps } from "../CheckboxDropdown";
import { ToolbarSelectAction } from "../Toolbar";
import FilterAddButton from "./AddButton";
import SelectedTableFilterChips, {
    Filter,
    TableFilter,
} from "./Filters";
import TableFilterMenu from "./Menu";
import TableFilterSearch from "./Search";
import {
    Box,
    Divider,
} from "@mui/material";
import {
    useEffect,
    useState,
} from "react";

interface TableFilterSectionProps<T> {
    searchValue?: string;
    hasGroups?: boolean;
    numSelected: number;
    hideSelectAll?: boolean;
    loading?: boolean;
    rowCount: number;
    selectMode?: SelectMode;
    selectedRows: T[Extract<keyof T, string>][];
    selectActions?: ToolbarSelectAction<T>[];
    checkboxDropdownLocalization?: object;
    filters?: TableFilter<T>[];
    selectedFilters: Filter[];
    filterValueLoading?: boolean;
    onSearchChange: (value: string) => void;
    onFilterChange: (filters: Filter[]) => void;
    onFilterInputValueChange?: (columnId: string, operator: string, value: string) => void;
    onSelectAllClick: TableCheckboxDropdownProps[`onSelectAllClick`];
}

const TableFilterSection = <T,>(props: TableFilterSectionProps<T>) => {
    const [ editingFilter, setEditingFilter ] = useState<Filter>();

    const showSelectables = (props.selectActions?.length ?? 0) > 0;
    const availableTableFilters = props.filters?.filter((tableFilter) => !props.selectedFilters.find((selectedFilter) => selectedFilter.columnId === tableFilter.id) || tableFilter.id === editingFilter?.columnId) ?? [];

    const [ filterAnchorEl, setFilterAnchorEl ] = useState<null | HTMLElement>(null);
    const [ filters, setFilters ] = useState<Filter[]>([]);

    const handleClose = (updatedFilter?: Filter) => {
        setFilters((filters) => {
            if (!updatedFilter) return filters;
            const updatedFilters = filters.map((filter) => filter.columnId === editingFilter?.columnId ? updatedFilter : filter);
            return [ ...updatedFilters, ...(isCreateFilter ? [ updatedFilter ] : []) ];
        });
        setFilterAnchorEl(null);
    };

    const isCreateFilter = !editingFilter;

    const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>, filterChip?: Filter) => {
        setEditingFilter(filterChip);
        setFilterAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        props.onFilterChange(filters);
    }, [ filters ]);

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                sx={{
                    height: 42,
                }}
                mb={1}
            >
                {showSelectables && props.selectMode === `multiple` && (
                    <TableCheckboxDropdown
                        disabled={props.loading ?? false}
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                        localization={props.checkboxDropdownLocalization}
                        numSelected={props.selectedRows.length}
                        onSelectAllClick={props.onSelectAllClick}
                    />
                )}
                {props.selectedRows.length > 0 && (
                    <Divider
                        orientation="vertical"
                        sx={{
                            height: (theme) => `calc(100% - ${theme.spacing(2)})`,
                            mx: 1,
                        }}
                    />
                )}
                {props.selectedRows.length > 0 && props.selectActions?.map((selectAction, i) => (
                    <Button
                        key={`selectAction-${i}`}
                        icon={selectAction.icon}
                        disabled={selectAction.disabled}
                        label={selectAction.label}
                        onClick={() => selectAction.onClick(props.selectedRows)}
                    />
                ))}
                <Box flex="1" />
                {props.filters?.length && (
                    <FilterAddButton
                        filters={props.selectedFilters}
                        disabled={props.selectedFilters.length === props.filters.length}
                        onClick={handleOpenFilterMenu}
                    />
                )}
                <TableFilterSearch
                    value={props.searchValue}
                    onChange={props.onSearchChange}
                />
            </Box>
            {props.selectedFilters.length > 0 && (
                <SelectedTableFilterChips
                    selectedFilters={props.selectedFilters}
                    filters={props.filters ?? []}
                    onOpenFilterMenu={handleOpenFilterMenu}
                    onChange={setFilters}
                />
            )}
            <TableFilterMenu
                anchorEl={filterAnchorEl}
                editingFilter={editingFilter}
                tableFilters={availableTableFilters}
                filterValueLoading={props.filterValueLoading}
                onClose={handleClose}
                onFilterInputValueChange={props.onFilterInputValueChange}
            />
        </>
    );
};

export default TableFilterSection;
