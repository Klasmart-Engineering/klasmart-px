import { Order } from "../components/Table/Common/Head";
import { Page } from "../components/Table/Cursor/Pagination";
interface CursorPageInfo {
    first: number | undefined;
    last: number | undefined;
    before: string | undefined;
    after: string | undefined;
}
export declare const getCursorPageInfo: (direction: Page, order: Order, cursor: string | undefined, rowsPerPage?: number) => CursorPageInfo;
export {};
