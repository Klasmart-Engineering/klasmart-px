import React from "react";
export interface PaginationLocalization {
    rowsPerPage?: string;
    fromToMax?: (from: number, to: number, max: number) => string;
    prevPage?: string;
    nextPage?: string;
    firstPage?: string;
    lastPage?: string;
}
interface Props {
    rowsPerPageOptions: Array<number | {
        value: number;
        label: string;
    }>;
    count: number;
    page: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
export default function BaseTablePagination(props: Props): JSX.Element;
export {};
