/// <reference types="react" />
import { StandardTextFieldProps } from "@material-ui/core/TextField";
interface Props extends StandardTextFieldProps {
    type: "single" | "multiple";
    label: string;
    options: string[];
    value: string;
    onChange: any;
    disabled?: boolean;
}
export default function StyledComboBox(props: Props): JSX.Element;
export {};
