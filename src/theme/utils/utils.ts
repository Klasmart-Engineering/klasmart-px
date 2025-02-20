import { buildBreakpoints } from "../breakpoint";
import { buildComponentStyles } from "../componentStyles";
import { buildPalette } from "../palette";
import { buildTypography } from "../typography";
import {
    createTheme,
    responsiveFontSizes,
} from "@mui/material/styles";

export const normalizeLocale = (locale: string) => {
    try {
        return locale
            .toLowerCase()
            .split(/[_-]/)
            ?.[0];
    } catch (err) {
        return locale;
    }
};

export interface BuildThemeOptions {
    locale: string;
}

export const buildTheme = (options: BuildThemeOptions) => {
    const breakpoints = buildBreakpoints();
    const components = buildComponentStyles();
    const palette = buildPalette();
    const typography = buildTypography(options.locale);

    const theme = createTheme({
        breakpoints,
        components,
        palette,
        typography,
    });

    return responsiveFontSizes(theme);
};
