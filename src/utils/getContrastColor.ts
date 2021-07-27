import { getContrastRatio } from '@material-ui/core/styles';

interface ContrastColorOptions {
    darkColor: string;
    lightColor: string;
    contrastThreshold: number;
}

const defaultContrastColorOptions: ContrastColorOptions = {
    contrastThreshold: 3,
    darkColor: `#000`,
    lightColor: `#fff`,
};

export default function getContrastColor(background: string, options = defaultContrastColorOptions) {
    return getContrastRatio(background, options.darkColor) >= options.contrastThreshold
        ? options.darkColor
        : options.lightColor;
}
