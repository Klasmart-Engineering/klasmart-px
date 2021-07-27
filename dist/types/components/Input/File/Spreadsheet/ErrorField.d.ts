import { SpreadsheetValidationError } from "./errors";
import { ReactNode } from "react";
interface Props {
    fieldText: ReactNode;
    errors: SpreadsheetValidationError[];
}
export default function ErrorField(props: Props): JSX.Element;
export {};
