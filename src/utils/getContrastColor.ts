import { getContrastRatio } from '@mui/material/styles';

interface ContrastColorOptions {
    darkColor?: string;
    lightColor?: string;
    contrastThreshold?: number;
}

interface DefaultContrastColorOptions {
    darkColor: string;
    lightColor: string;
    contrastThreshold: number;
}

const defaultContrastColorOptions: DefaultContrastColorOptions = {
    contrastThreshold: 11,
    darkColor: `#000`,
    lightColor: `#fff`,
};

export default function getContrastColor (background: string, options?: ContrastColorOptions) {
    const contrastColorOptions = {
        ...defaultContrastColorOptions,
        ...options,
    };

    return getContrastRatio(background, contrastColorOptions.darkColor) >= contrastColorOptions.contrastThreshold
        ? contrastColorOptions.darkColor
        : contrastColorOptions.lightColor;
}
