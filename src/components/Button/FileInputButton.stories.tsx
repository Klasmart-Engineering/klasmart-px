import FileInputButton,
{ Props } from './FileInputButton';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `FileInputButton`,
    component: FileInputButton,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <FileInputButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    accept: [
        `image/jpg`,
        `image/jpeg`,
        `image/png`,
    ],
    label: `Select Image`,
    errorMessages: {
        noFileError: `No File Found`,
        fileSizeTooBigError: `The maximum file size is 2MB`,
        wrongFileTypeUploadError: `This image file must be in the correct format`,
    },
    onFileChange: (file: File) => {
        console.log(file);
    },
    onError: (error: string) => console.log(error),
};
