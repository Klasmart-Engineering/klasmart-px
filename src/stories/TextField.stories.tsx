import TextField,
{ Props } from '../components/Input/TextField';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `TextField`,
    component: TextField,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <TextField {...args} />;

export const Outline = Template.bind({});

Outline.args = {
    fullWidth: false,
    label:`Outline`,
    value:`Outline`,
    disabled: false,
    placeholder:`Outline`,
};

export const Standard = Template.bind({});

Standard.args = {
    fullWidth: true,
    variant: `standard`,
    label:`Standard`,
    value:`Standard`,
    disabled: false,
    placeholder:`Standard`,
};

export const Filled = Template.bind({});

Filled.args = {
    fullWidth: true,
    variant: `filled`,
    label:`Filled`,
    value:`Filled`,
    disabled: false,
    placeholder:`Filled`,
};

export const Number = Template.bind({});

Number.args = {
    type:`number`,
    fullWidth: true,
    variant: `filled`,
    label:`Number`,
    value:`Number`,
    disabled: false,
    placeholder:`Number`,
};

export const Password = Template.bind({});

Password.args = {
    type:`password`,
    fullWidth: true,
    variant: `standard`,
    label:`Password`,
    value:``,
    disabled: false,
    placeholder:`Password`,
};
