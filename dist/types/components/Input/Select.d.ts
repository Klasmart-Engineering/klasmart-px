/// <reference types="react" />
import { Input } from "./shared";
export interface Section<T> {
    items: T[];
    header?: string;
    ignoreSelectAll?: boolean;
}
export interface Props<T> extends Input {
    value: string | string[];
    className?: string;
    items: T[];
    sections?: Section<T>[];
    selectAllLabel?: string;
    noDataLabel?: string;
    multiple?: boolean;
    itemText?: (item: T) => string;
    itemValue?: (item: T) => string;
    loading?: boolean;
}
export default function Select<T>(props: Props<T>): JSX.Element;
