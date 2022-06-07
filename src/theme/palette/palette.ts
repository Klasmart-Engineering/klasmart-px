import { config } from "../color";
import {
    colors,
    darken,
    lighten,
    PaletteOptions,
} from "@mui/material";

export const buildPalette = (): PaletteOptions => {
    return {
        mode: `light`,
        background: {
            default: colors.common.white,
            paper: colors.common.white,
        },
        primary: {
            contrastText: colors.common.white,
            main: config.PRIMARY,
            light: lighten(config.PRIMARY, 0.9),
            dark: darken(config.PRIMARY, 0.75),
        },
        secondary: {
            main: config.PRIMARY,
        },
        error: {
            contrastText: colors.common.white,
            main: colors.red[500],
        },
        info: {
            contrastText: colors.common.white,
            main: colors.blue[500],
        },
        success: {
            contrastText: colors.common.white,
            main: colors.green[500],
        },
        warning: {
            contrastText: colors.common.white,
            main: colors.orange[500],
        },
    };
};
