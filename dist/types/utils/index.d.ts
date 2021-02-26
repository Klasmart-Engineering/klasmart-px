import getCursorPageInfo from './getCursorPageInfo';
import nameToInitials from './nameToInitials';
import sleep from './sleep';
import stringToColor from './stringToColor';
declare const utils: {
    getCursorPageInfo: (direction: import("../components/Table/Cursor/Pagination").Page, order: import("../components/Table/Common/Head").Order, cursor: string | undefined, rowsPerPage?: number) => import("./getCursorPageInfo").CursorPageInfo;
    nameToInitials: (name: string, maxLength?: number) => string;
    stringToColor: (str: string, settings?: import("./stringToColor").ColorSettings | undefined) => string;
    sleep: (ms: number) => Promise<void>;
};
export default utils;
export { getCursorPageInfo, nameToInitials, sleep, stringToColor, };
