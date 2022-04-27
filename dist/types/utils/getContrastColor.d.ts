interface ContrastColorOptions {
    darkColor?: string;
    lightColor?: string;
    contrastThreshold?: number;
}
export default function getContrastColor(background: string, options?: ContrastColorOptions): string;
export {};
