/// <reference types="react" />
import { SpreadsheetValidtionError } from './Base';
interface Props {
    errors: SpreadsheetValidtionError[];
    allValidationsPassedMessage?: string;
    numValidationsFailedMessage?: (num: number) => string;
}
export default function ValidationDetails(props: Props): JSX.Element;
export {};
