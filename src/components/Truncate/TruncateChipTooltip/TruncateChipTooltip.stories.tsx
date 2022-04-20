import TruncateChipTooltip,
{ Props } from './TruncateChipTooltip';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `Truncate/TruncateChipTooltip`,
    component: TruncateChipTooltip,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => (
    <TruncateChipTooltip {...args} />
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
    maxItemsInTooltip: 3,
    label: (count) => `${count} items`,
};

export const SingleItem = Template.bind({});

SingleItem.args = {
    items: [ `Item 1` ],
    maxItemsInTooltip: 3,
    label: (count) => `${count} items`,
};
