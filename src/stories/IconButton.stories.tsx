import IconButton,
{ Props } from '../components/Button/IconButton';
import {
    ACTION_COLORS,
    BASE_COLORS,
    COMMON_COLORS,
    STATUS_COLORS,
    THEME_COLORS,
} from '../types/colors';
import { Home } from '@material-ui/icons';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `IconButton`,
    component: IconButton,
};

const Template: Story<Props> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    color: `primary`,
    icon: Home,
};

Primary.argTypes = {
    color: {
        control: {
            type: `select`,
        },
        options: [
            ...BASE_COLORS,
            ...COMMON_COLORS,
            ...THEME_COLORS,
            ...STATUS_COLORS,
            ...ACTION_COLORS,
        ],
    },
    icon: {
        control: null,
    },
};
