/// <reference types="react" />
interface Props<T> {
    label: string;
    items: T[];
    value: string[];
    selectAllLabel?: string;
    noDataLabel?: string;
    helperText?: string;
    error?: boolean;
    itemValue?: (item: T) => string;
    itemText?: (item: T) => string;
    onChange?: (values: string[]) => void;
}
export default function MultiSelect<T>(props: Props<T>): JSX.Element;
export {};
