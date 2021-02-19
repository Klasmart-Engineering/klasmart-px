/// <reference types="react" />
import { PaginationLocalization } from "../Common/Pagination/shared";
export declare type Page = `start` | `previous` | `next` | `end`;
interface Props {
    rowsPerPageOptions: Array<number | {
        value: number;
        label: string;
    }>;
    count: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onChangePage: (page: Page) => void;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
}
export default function CursorTablePagination(props: Props): JSX.Element;
export {};
