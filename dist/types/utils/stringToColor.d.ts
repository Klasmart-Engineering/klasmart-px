declare type ColorOutput = `rgb` | `hsl` | `hex`;
export interface ColorSettings {
    output?: ColorOutput;
    saturation?: number;
    light?: number;
}
declare const _default: (str: string, settings?: ColorSettings | undefined) => string;
export default _default;
