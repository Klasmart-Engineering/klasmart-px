/* eslint-disable jest/no-mocks-import */
import {
    mockFile,
    mockOnParseFile,
    validationErrors,
} from '../components/Input/File/Spreadsheet/__mocks__/Preview';
import Preview,
{ Props } from '../components/Input/File/Spreadsheet/Preview';
import {
    Meta,
    Story,
} from '@storybook/react';
import React from 'react';

export default {
    title: `Spreadsheet/Preview`,
    component: Preview,
    args: {
        errors: [],
    },
} as Meta;

const Template: Story<Omit<Props, "file" | "onParseFile">> = (args) => (
    <Preview
        file={mockFile}
        onParseFile={mockOnParseFile}
        {...args}
    />
);

export const Valid = Template.bind({});

export const Invalid = Template.bind({});
Invalid.args = {
    errors: [
        validationErrors.general,
        validationErrors.column,
        validationErrors.row,
        validationErrors.field,
    ],
};
