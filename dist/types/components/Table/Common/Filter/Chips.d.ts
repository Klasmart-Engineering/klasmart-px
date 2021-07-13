import { Filter, FilterLocalization, TableFilter } from './Filters';
import React from 'react';
interface Props<T> {
    localization?: FilterLocalization;
    tableFilters: TableFilter<T>[] | undefined;
    filters: Filter[];
    onClick: (event: React.MouseEvent<HTMLDivElement>, filterChip: Filter) => void;
    onDelete: (filterChip: Filter) => void;
}
export default function TableFilterChips<T>(props: Props<T>): JSX.Element;
export {};
