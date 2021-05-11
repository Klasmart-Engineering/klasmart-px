import { SpreadsheetValidtionError } from "./Base";
import { ReactNode } from "react";
interface Props {
    fieldText: ReactNode;
    errors: SpreadsheetValidtionError[];
}
export default function ErrorField(props: Props): JSX.Element;
export {};
