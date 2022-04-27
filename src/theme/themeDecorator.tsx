import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material/styles';
import { ReactNode } from 'react';

const theme = createTheme();

// apply our projects theme to our stories
const ThemeDecorator = (story: () => ReactNode) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            {story()}
        </ThemeProvider>
    </StyledEngineProvider>
);

export default ThemeDecorator;
