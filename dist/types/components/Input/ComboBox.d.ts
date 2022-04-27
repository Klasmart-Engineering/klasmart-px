/// <reference types="react" />
import { Validator } from "../../validations";
import { FilterValueOption } from "../Table/Common/Filter/Filters";
import { Input } from "./shared";
export interface Props extends Omit<Input, "value"> {
    value?: FilterValueOption[];
    type?: "text";
    className?: string;
    loading?: boolean;
    multiple?: boolean;
    size?: "small" | "medium";
    id?: string;
    error?: string;
    inputValue?: string;
    selectValidations?: Validator[];
    options?: FilterValueOption[];
    optionsLimit?: number;
    onInputChange?: (value: string) => void;
}
export default function ComboBox(props: Props): JSX.Element;
