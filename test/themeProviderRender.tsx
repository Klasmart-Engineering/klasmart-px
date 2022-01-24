
import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material/styles';
import { render } from '@testing-library/react';
import React,
{ ReactNode } from 'react';

const theme = createTheme();

const themeDecorator = ({ children }: { children?: ReactNode }) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

const customRender = (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
    render(ui, {
        wrapper: themeDecorator,
    });

// re-export everything
//export * from '@testing-library/react';

// override render method
export { customRender as render };
