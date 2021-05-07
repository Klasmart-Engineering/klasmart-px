import { SpreadsheetValidtionError } from "./Base";
import { ReactNode } from "react";
interface Props {
    fieldText: ReactNode;
    error: SpreadsheetValidtionError;
}
export default function ErrorField(props: Props): JSX.Element;
export {};
