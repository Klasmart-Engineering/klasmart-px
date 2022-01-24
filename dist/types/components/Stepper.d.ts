import { SvgIconComponent } from "@mui/icons-material";
import { ReactNode } from "react";
export interface Step {
    label: string;
    content?: ReactNode;
    icon?: SvgIconComponent;
    optional?: boolean;
    error?: string;
}
interface Props {
    step: number;
    steps: Step[];
    editable?: boolean;
    optionalLabel?: string;
    onChange?: (step: number) => void;
    onValidate?: (valid: boolean) => void;
    onError?: (error?: string) => void;
}
export default function Stepper(props: Props): JSX.Element;
export {};
