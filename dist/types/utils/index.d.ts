import nameToInitials from './nameToInitials';
import stringToColor from './stringToColor';
import sleep from './sleep';
declare const utils: {
    nameToInitials: (name: string, maxLength?: number) => string;
    stringToColor: (str: string, settings?: import("./stringToColor").ColorSettings | undefined) => string;
    sleep: (ms: number) => Promise<void>;
};
export default utils;
export { nameToInitials, stringToColor, sleep, };
