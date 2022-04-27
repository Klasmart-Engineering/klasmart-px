/// <reference types="react" />
import { Filter, TableFilter } from './Filters';
export declare type ValueComponent = `select` | `combo-box` | `text-field`;
export declare type FilterValueInputEventHandler = (columnId: string, operator: string, value: string) => void;
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
export default function TableFilterMenu<T>(props: Props<T>): JSX.Element;
export {};
