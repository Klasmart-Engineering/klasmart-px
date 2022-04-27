/// <reference types="react" />
import { SpreadsheetValidationError } from "./types";
export interface Props {
    className?: string;
    file: File;
    errors: SpreadsheetValidationError[];
    onParseFile: (file: File) => Promise<string[][]>;
}
export default function PreviewSpreadsheet(props: Props): JSX.Element;
