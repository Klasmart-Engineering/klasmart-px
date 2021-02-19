/// <reference types="react" />
import { PaginationLocalization } from "../Common/Pagination/shared";
interface Props {
    rowsPerPageOptions: Array<number | {
        value: number;
        label: string;
    }>;
    count: number;
    page: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    onChangePage: (page: number) => void;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
}
export default function PageTablePagination(props: Props): JSX.Element;
export {};
