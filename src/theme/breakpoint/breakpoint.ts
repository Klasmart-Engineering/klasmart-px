import { BreakpointsOptions } from "@mui/material";

export const buildBreakpoints = (): BreakpointsOptions => {
    return {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1920,
        },
    };
};
