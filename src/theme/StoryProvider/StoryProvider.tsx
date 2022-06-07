import ThemeProvider from "../Provider";
import { buildTheme } from "../utils";
import { ReactNode } from 'react';

const theme = buildTheme({
    locale: `en`,
});

// apply our projects theme to our stories
const StoryThemeProvider = (story: () => ReactNode) => (
    <ThemeProvider theme={theme}>
        {story()}
    </ThemeProvider>
);

export default StoryThemeProvider;
