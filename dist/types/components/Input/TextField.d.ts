/// <reference types="react" />
import { Input } from "./shared";
export declare type InputType = `text` | `number` | `password` | `date` | `datetime-local` | `email` | `time` | `month` | `tel` | `url` | `week`;
interface Props extends Input {
    type?: InputType;
    className?: string;
    validations?: ((input: unknown) => true | string)[];
    hideHelperText?: boolean;
    onChange?: (value: string) => void;
    onValidate?: (valid: boolean) => void;
}
export default function TextField(props: Props): JSX.Element;
export {};
