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
