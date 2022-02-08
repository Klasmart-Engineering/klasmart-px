/// <reference types="react" />
import { Validator } from "../../validations";
import { Input } from "./shared";
export interface AutoCompleteOption {
    id: number;
    text: string;
}
export interface Props extends Omit<Input, "value"> {
    value?: AutoCompleteOption | AutoCompleteOption[];
    type?: "text";
    className?: string;
    loading?: boolean;
    multiple?: boolean;
    size?: "small" | "medium";
    error?: string;
    inputValue?: string;
    selectValidations?: Validator[];
    options: AutoCompleteOption[];
    optionsLimit?: number;
    onInputChange?: (value: string) => void;
}
export default function ComboBox(props: Props): JSX.Element;
