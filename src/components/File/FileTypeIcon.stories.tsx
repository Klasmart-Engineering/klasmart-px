import CounterIcon,
{ Props } from './TypeIcon';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `FileIcon`,
    component: CounterIcon,
};

const Template: Story<Props> = (args) => <CounterIcon {...args} />;

export const Type = Template.bind({});

Type.args = {
    fileType: `png`,
};

Type.argTypes = {};
