import { Order } from "../components/Table/Common/Head";
import {
    DEFAULT_ROWS_PER_PAGE,
    PageChange,
} from "../components/Table/Common/Pagination/shared";

export enum Direction {
    FORWARD = `FORWARD`,
    BACKWARD = `BACKWARD`,
}
export interface CursorPageInfo {
    direction: `FORWARD` | `BACKWARD`;
    count: number | undefined;
    cursor: string | undefined;
}

export default (pageChange: PageChange, cursor: string | undefined, rowsPerPage = DEFAULT_ROWS_PER_PAGE): CursorPageInfo => {
    const direction = [ `first`, `next` ].includes(pageChange) ? Direction.FORWARD : Direction.BACKWARD;

    return {
        direction,
        cursor,
        count: rowsPerPage,
    };
};
