import Button,
{ Props } from '../components/Button/Button';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `Button`,
    component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <Button {...args} />;

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
