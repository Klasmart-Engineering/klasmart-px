import ColorPicker,
{ Props } from './ColorPicker';
import {
    amber,
    blue,
    brown,
    common,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
} from '@mui/material/colors';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `ColorPicker`,
    component: ColorPicker,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <ColorPicker {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    value: `#ff0000`,
    defaultColor: `#ff0000`,
    variant: `outlined`,
    hideCanvas: false,
    colors: [
        red[500],
        pink[500],
        purple[500],
        deepPurple[500],
        indigo[500],
        blue[500],
        lightBlue[500],
        cyan[500],
        teal[500],
        green[500],
        lightGreen[500],
        lime[500],
        yellow[500],
        amber[500],
        orange[500],
        deepOrange[500],
        brown[500],
        grey[500],
        common.white,
        common.black,
    ],
};
Primary.argTypes = {
    value: {
        control: {
            type: `color`,
        },
    },
    variant: {
        options: [
            `filled`,
            `standard`,
            `outlined`,
        ],
        control: {
            type: `radio`,
        },
    },
};
