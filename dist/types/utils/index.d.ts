import getContrastColor from './getContrastColor';
import nameToInitials from './nameToInitials';
import { trimStrings } from './objectCleaner';
import sleep from './sleep';
import stringToColor from './stringToColor';
declare const utils: {
    getContrastColor: typeof getContrastColor;
    nameToInitials: (name: string, maxLength?: number) => string;
    stringToColor: (str: string, settings?: import("./stringToColor").ColorSettings | undefined) => string;
    sleep: (ms: number) => Promise<void>;
    trimStrings: (input: any) => any;
};
export default utils;
export { getContrastColor, nameToInitials, sleep, stringToColor, trimStrings, };
