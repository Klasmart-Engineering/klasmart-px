import Button,
{ Props } from './Button';
import { Story } from '@storybook/react';

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
