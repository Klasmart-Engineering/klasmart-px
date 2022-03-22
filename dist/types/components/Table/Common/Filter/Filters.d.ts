import { FilterMenuLocalization } from './Menu';
import { Dispatch, ReactNode, SetStateAction } from 'react';
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
export declare type FilterOperator = ComboBoxFilterOperator | TextFieldFilterOperator | SelectFilterOperator;
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
    filters: TableFilter<T>[];
    localization?: FilterLocalization;
    filterValueLoading?: boolean;
    onFilterInputValueChange?: (columnId: string, operator: string, value: string) => void;
    onChange: Dispatch<SetStateAction<Filter[]>>;
}
export default function BaseTableFilter<T>(props: Props<T>): JSX.Element;
export {};
