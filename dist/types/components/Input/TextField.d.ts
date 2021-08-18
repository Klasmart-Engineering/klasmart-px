/// <reference types="react" />
import { Input } from "./shared";
export declare type InputType = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`;
export interface Props extends Input {
    type?: InputType;
    className?: string;
    error?: string;
}
declare function TextField(props: Props): JSX.Element;
declare namespace TextField {
    var displayName: string;
}
export default TextField;
