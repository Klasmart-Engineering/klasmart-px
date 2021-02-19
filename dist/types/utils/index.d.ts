import nameToInitials from './nameToInitials';
import sleep from './sleep';
import stringToColor from './stringToColor';
declare const utils: {
    nameToInitials: (name: string, maxLength?: number) => string;
    stringToColor: (str: string, settings?: import("./stringToColor").ColorSettings | undefined) => string;
    sleep: (ms: number) => Promise<void>;
};
export default utils;
export { nameToInitials, sleep, stringToColor, };
