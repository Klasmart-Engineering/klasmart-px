import TruncateChipGroup,
{ Props } from './TruncateChipGroup';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `Truncate/TruncateChipGroup`,
    component: TruncateChipGroup,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => (
    <TruncateChipGroup {...args} />
);

export const Default = Template.bind({});

Default.args = {
    items: [
        `Item 1`,
        `Item 2`,
        `Item 3`,
        `Item 4`,
        `Item 5`,
    ],
    maxPreview: 3,
};

export const NoPreview = Template.bind({});

NoPreview.args = {
    items: [
        `Item 1`,
        `Item 2`,
        `Item 3`,
    ],
    maxPreview: 3,
};
