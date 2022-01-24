/// <reference types="react" />
import { Input } from "./shared";
import { InputProps } from "@mui/material";
export declare const inputTypes: readonly ["text", "number", "password", "date", "datetime-local", "email", "time", "month", "tel", "url", "week"];
export declare type InputType = typeof inputTypes[number];
export interface Props extends Input {
    type?: InputType;
    className?: string;
    error?: string;
    loading?: boolean;
    InputProps?: Partial<InputProps>;
}
declare function TextField(props: Props): JSX.Element;
declare namespace TextField {
    var displayName: string;
}
export default TextField;
