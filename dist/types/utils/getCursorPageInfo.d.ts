import { Order } from "../components/Table/Common/Head";
import { Page } from "../components/Table/Cursor/Pagination";
export interface CursorPageInfo {
    first: number | undefined;
    last: number | undefined;
    before: string | undefined;
    after: string | undefined;
}
declare const _default: (direction: Page, order: Order, cursor: string | undefined, rowsPerPage?: number) => CursorPageInfo;
export default _default;
