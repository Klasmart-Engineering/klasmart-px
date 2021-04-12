import File,
{ Props } from '../components/Input/File/Base';
import { sleep } from '../utils';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `File`,
    component: File,
};

const handleFileUpload = async (file: File) => {
    console.log(`start`, file.name);
    await sleep(2000);
    console.log(`stop`, file.name);
    // throw Error(`Something happened yo`);
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <File
    {...args}
    onFileUpload={handleFileUpload}
/>;

export const Main = Template.bind({});

Main.args = {
    maxSize: 500000,
    accept: `text/csv`,
};
