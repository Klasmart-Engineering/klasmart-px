import { normalizeLocale } from "../utils/utils";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const fallbackFonts = [
    `-apple-system`,
    `Segoe UI`,
    `Helvetica`,
    `sans-serif`,
];

const buildLocaleTypography = (locale: string): TypographyOptions => {
    const normalizedLocale = normalizeLocale(locale);
    switch (normalizedLocale) {
    case `ko`:
        return {
            fontFamily: [ `NanumSquareRound`, ...fallbackFonts ].join(`,`),
        };
    case `zh`:
    case `zh-cn`:
    case `zn_cn`:
        return {
            fontFamily: [ `Source Han Sans SC`, ...fallbackFonts ].join(`,`),
        };
    default:
        return {
            fontFamily: [ `Source Sans Pro`, ...fallbackFonts ].join(`,`),
        };
    }
};

export const buildTypography = (locale: string): TypographyOptions => {
    const localeTypography = buildLocaleTypography(locale);
    return {
        button: {
            textTransform: `none`,
        },
        fontWeightLight: 400,
        fontWeightMedium: 600,
        fontWeightRegular: 600,
        fontWeightBold: 700,
        allVariants: {
            letterSpacing: -0.5,
        },
        ...localeTypography,
    };
};
