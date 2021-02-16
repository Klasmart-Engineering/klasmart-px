/// <reference types="react" />
import { Input } from "./shared";
interface Props<T> extends Omit<Input, "value" | "onChange"> {
    value: string | string[];
    className?: string;
    items: T[];
    selectAllLabel?: string;
    noDataLabel?: string;
    multiple?: boolean;
    itemValue?: (item: T) => string;
    itemText?: (item: T) => string;
    onChange?: (value: string | string[]) => void;
}
export default function Select<T>(props: Props<T>): JSX.Element;
export {};
