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
export default function BaseTableFilter<T>(props: Props<T>): JSX.Element;
export {};
