import { PageChange } from "../components/Table/Common/Pagination/shared";
export declare enum Direction {
    FORWARD = "FORWARD",
    BACKWARD = "BACKWARD"
}
export interface CursorPageInfo {
    direction: `FORWARD` | `BACKWARD`;
    count: number | undefined;
    cursor: string | undefined;
}
declare const _default: (pageChange: PageChange, cursor: string | undefined, rowsPerPage?: number) => CursorPageInfo;
export default _default;
