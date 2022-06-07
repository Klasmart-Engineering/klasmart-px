import "../src/theme/index.css";
import ThemeDecorator from '../src/theme/StoryProvider';
const { addDecorator } = require('@storybook/react');

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            method: `alphabetical`,
        }
    }
}

// Add our project theme, add a global stylesheet
addDecorator(ThemeDecorator);