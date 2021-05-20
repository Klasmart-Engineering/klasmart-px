import { Order } from "../components/Table/Common/Head";
import {
    PageChange,
    ROWS_PER_PAGE,
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

export default (pageChange: PageChange, order: Order, cursor: string | undefined, rowsPerPage = ROWS_PER_PAGE): CursorPageInfo => {
    const direction = order === `desc`
        ? ([ `first`, `next` ].includes(pageChange)
            ? Direction.FORWARD
            : Direction.BACKWARD
        ) : ([ `last`, `previous` ].includes(pageChange)
            ? Direction.FORWARD
            : Direction.BACKWARD
        );
    return {
        direction,
        cursor,
        count: rowsPerPage,
    };
};
