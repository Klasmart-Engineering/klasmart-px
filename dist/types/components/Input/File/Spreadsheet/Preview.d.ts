/// <reference types="react" />
import { SpreadsheetValidtionError } from "./Base";
interface Props {
    className?: string;
    file: File;
    errors: SpreadsheetValidtionError[];
    onParseFile: (file: File) => Promise<string[][]>;
}
export default function PreviewSpreadsheet(props: Props): JSX.Element;
export {};
