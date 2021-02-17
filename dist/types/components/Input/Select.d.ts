/// <reference types="react" />
import { Input } from "./shared";
interface Props<T> extends Input {
    className?: string;
    items: T[];
    selectAllLabel?: string;
    noDataLabel?: string;
    multiple?: boolean;
    itemValue?: (item: T) => any;
    itemText?: (item: T) => string;
}
export default function Select<T>(props: Props<T>): JSX.Element;
export {};
