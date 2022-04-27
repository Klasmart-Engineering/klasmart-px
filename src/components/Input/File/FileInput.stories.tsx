import { sleep } from '../../../utils';
import FileInput,
{ Props } from './Base';
import { Story } from '@storybook/react';

export default {
    title: `FileInput`,
    component: FileInput,
};

const handleFileUpload = async (file: File) => {
    console.log(`start`, file.name);
    await sleep(2000);
    console.log(`stop`, file.name);
    // throw Error(`Something happened yo`);
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => (
    <FileInput
        {...args}
        onFileUpload={handleFileUpload}
    />
);

export const Main = Template.bind({});

Main.args = {
    maxFileSize: 500_000,
    accept: `text/csv`,
};
