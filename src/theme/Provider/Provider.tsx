import {
    CssBaseline,
    Theme,
} from '@mui/material';
import {
    StyledEngineProvider,
    ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import React from 'react';

export interface ThemeProviderProps {
    theme: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => (
    <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={props.theme}>
            <CssBaseline />
            {props.children}
        </MUIThemeProvider>
    </StyledEngineProvider>
);

export default ThemeProvider;
