export declare type PageChange = `first` | `previous` | `next` | `last`;
export interface PaginationLocalization {
    rowsPerPage?: string;
    fromToTotal?: (from: number, to: number, total: number) => string;
    total?: (total: number) => string;
    prevPage?: string;
    nextPage?: string;
    firstPage?: string;
    lastPage?: string;
}
export declare const DEFAULT_ROWS_PER_PAGE = 10;
export declare const DEFAULT_SORT_ORDER = "asc";
