import File,
{ Props } from '../components/Input/File/Dropzone';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `File`,
    component: File,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <File {...args} />;

export const Main = Template.bind({});
