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
    default:
        return {};
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
        fontFamily: [ `Source Sans Pro`, ...fallbackFonts ].join(`,`),
        body1: {
            fontSize: 14,
            fontWeight: 400,
        },
        ...localeTypography,
    };
};
