export type PageChange = `first` | `previous` | `next` | `last`

export interface PaginationLocalization {
  rowsPerPage?: string;
  total?: (total: number) => string;
  prevPage?: string;
  nextPage?: string;
  firstPage?: string;
  lastPage?: string;
}

export const DEFAULT_ROWS_PER_PAGE = 10;
export const DEFAULT_SORT_ORDER = `asc`;
