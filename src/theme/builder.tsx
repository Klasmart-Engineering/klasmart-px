import {
    PaletteOptions,
    Theme,
} from "@mui/material";
import {
    createTheme,
    responsiveFontSizes,
} from "@mui/material/styles";

export default function builder (languageCode: string, themeMode: string) {
    function setTypography (languageCode: string) {
        let localeFontFamily = `Source Sans Pro`;
        const localeWeightLight = 400;
        const localeWeightMedium = 600;
        let localeWeightRegular = 400;
        const localeWeightBold = 700;

        switch (languageCode) {
        case `en`:
            localeFontFamily = `Source Sans Pro`;
            localeWeightRegular = 600;
            break;
        case `ko`:
            localeFontFamily = `NanumSquareRound`;
            localeWeightRegular = 600;
            break;
        case `zh-CN`:
            localeFontFamily = `Source Han Sans SC`;
            break;
        default:
            break;
        }
        localeFontFamily = [
            localeFontFamily,
            `-apple-system`,
            `Segoe UI`,
            `Helvetica`,
            `sans-serif`,
        ].join(`,`);
        return {
            localeFontFamily,
            localeWeightLight,
            localeWeightMedium,
            localeWeightRegular,
            localeWeightBold,
        };
    }

    const localeTypography = setTypography(languageCode);
    const typography = {
        button: {
            textTransform: `none`,
        },
        fontFamily: localeTypography.localeFontFamily,
        fontWeightBold: localeTypography.localeWeightBold,
        fontWeightLight: localeTypography.localeWeightLight,
        fontWeightMedium: localeTypography.localeWeightMedium,
        fontWeightRegular: localeTypography.localeWeightRegular,
    } as any;

    const palette: PaletteOptions = {
        background: {
            default: themeMode === `light` ? `#fafafa` : `#030D1C`,
            paper: themeMode === `light` ? `#FFF` : `#030D1C`,
        },
        primary: {
            contrastText: `#FFF`,
            dark: `#1896ea`,
            light: `#0E78D5`,
            main: `#0E78D5`,
        },
    };

    let theme: Theme;
    if (themeMode === `light`) {
        palette.mode = `light`;
        palette.background = {
            default: `#FFF`,
        };
        theme = createTheme({
            palette,
            typography,
        });
    } else {
        palette.mode = `dark`;
        theme = createTheme({
            palette,
            typography,
        });
    }

    return (theme = responsiveFontSizes(theme));
}
