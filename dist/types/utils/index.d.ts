import nameToInitials from './nameToInitials';
import stringToHslColor from './stringToHslColor';
import sleep from './sleep';
declare const utils: {
    nameToInitials: (name: string, maxLength?: number) => string;
    stringToHslColor: (str: string, saturation?: number, light?: number) => string;
    sleep: (ms: number) => Promise<void>;
};
export default utils;
export { nameToInitials, stringToHslColor, sleep, };
