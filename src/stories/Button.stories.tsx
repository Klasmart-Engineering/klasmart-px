import Button,
{ Props } from '../components/Button/Button';
import getContrastColor from '../utils/getContrastColor';
import {
    adaptV4Theme,
    createTheme,
    darken,
    lighten,
    StyledEngineProvider,
    ThemeProvider,
} from '@mui/material/styles';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `Button`,
    component: Button,
};

const organizationColor = `#FFE`;
const secondaryOrganizationColor = `#F00`;

const palette = {
    primary: {
        contrastText: getContrastColor(organizationColor, {
            lightColor: organizationColor,
        }),
        main: organizationColor,
        light: lighten(organizationColor, 0.9),
        dark: darken(organizationColor, 0.75),
    },
    secondary: {
        contrastText: getContrastColor(secondaryOrganizationColor, {
            lightColor: secondaryOrganizationColor,
        }),
        main: secondaryOrganizationColor,
        light: lighten(secondaryOrganizationColor, 0.9),
        dark: darken(secondaryOrganizationColor, 0.75),
    },
};

const theme = createTheme(adaptV4Theme({
    palette,
}));

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}><Button {...args} /></ThemeProvider>
    </StyledEngineProvider>
);

export const Primary = Template.bind({});

Primary.args = {
    rounded: true,
    color: `primary`,
    variant: `contained`,
    label: `Button`,
};

export const Secondary = Template.bind({});

Secondary.args = {
    rounded: true,
    color: `secondary`,
    variant: `contained`,
    label: `Button`,
};

export const Outlined = Template.bind({});

Outlined.args = {
    rounded: true,
    color: `primary`,
    variant: `outlined`,
    label: `Button`,
};

export const SecondaryOutlined = Template.bind({});

SecondaryOutlined.args = {
    rounded: true,
    color: `secondary`,
    variant: `outlined`,
    label: `Button`,
};

export const Text = Template.bind({});

Text.args = {
    rounded: true,
    color: `primary`,
    variant: `text`,
    label: `Button`,
};

export const SecondaryText = Template.bind({});

SecondaryText.args = {
    rounded: true,
    color: `secondary`,
    variant: `text`,
    label: `Button`,
};
