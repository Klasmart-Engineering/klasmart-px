import { sleep } from '../../utils';
import CounterIconButton,
{ Props } from './CounterIconButton';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: `FileIcon`,
    component: CounterIconButton,
};

const Template: Story<Props> = (args) => <CounterIconButton {...args} />;

export const CounterButton = Template.bind({});

const handleDownloadImage = async () => {
    await sleep(2000);
    console.log(`nice`);

};

CounterButton.args = {
    hideDownloadActions: false,
    menuTitle: `Submissions`,
    files: [
        {
            name: `nice.txt`,
            onDownloadClick: handleDownloadImage,
        },
        {
            name: `list.pdf`,
            onDownloadClick: handleDownloadImage,
        },
        {
            name: `woopwoop this is a long text lets go.png`,
            onDownloadClick: handleDownloadImage,
        },
    ],
};

CounterButton.argTypes = {};
