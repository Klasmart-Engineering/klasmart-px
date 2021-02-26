import { Order } from "../components/Table/Common/Head";
import { ROWS_PER_PAGE } from "../components/Table/Common/Pagination/shared";
import { Page } from "../components/Table/Cursor/Pagination";

export interface CursorPageInfo {
    first: number | undefined;
    last: number | undefined;
    before: string | undefined;
    after: string | undefined;
}

export default (direction: Page, order: Order, cursor: string | undefined, rowsPerPage = ROWS_PER_PAGE) => {
    let variables: CursorPageInfo;
    switch (direction) {
    case `start`:
        variables = order === `asc` ? {
            first: undefined,
            last: rowsPerPage,
            before: undefined,
            after: undefined,
        } : {
            first: rowsPerPage,
            last: undefined,
            before: undefined,
            after: undefined,
        };
        break;
    case `previous`:
        variables = order === `asc` ? {
            first: rowsPerPage,
            last: undefined,
            before: undefined,
            after: cursor,
        } : {
            first: undefined,
            last: rowsPerPage,
            before: cursor,
            after: undefined,
        };
        break;
    case `next`:
        variables = order === `asc` ? {
            first: undefined,
            last: rowsPerPage,
            before: cursor,
            after: undefined,
        } : {
            first: rowsPerPage,
            last: undefined,
            before: undefined,
            after: cursor,
        };
        break;
    case `end`:
        variables = order === `asc` ? {
            first: rowsPerPage,
            last: undefined,
            before: undefined,
            after: undefined,
        } : {
            first: undefined,
            last: rowsPerPage,
            before: undefined,
            after: undefined,
        };
        break;
    }
    return variables;
};
