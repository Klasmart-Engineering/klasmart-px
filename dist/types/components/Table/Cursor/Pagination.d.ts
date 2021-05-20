/// <reference types="react" />
import { PageChange, PaginationLocalization } from "../Common/Pagination/shared";
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
    onChangePage: (pageChange: PageChange) => void;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
}
export default function CursorTablePagination(props: Props): JSX.Element;
export {};
