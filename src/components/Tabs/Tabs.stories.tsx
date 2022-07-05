import {
    default as TabsComponent,
    TabsProps,
} from "./Tabs";
import { Story } from "@storybook/react";
import { useState } from "react";

export default {
    title: `Tabs`,
};

const TabsTemplate: Story<TabsProps> = (args) => {
    const [ value, setValue ] = useState(`tab1`);
    return (
        <TabsComponent
            {...args}
            value={value}
            onChange={setValue}
        />
    );
};

export const Tabs = TabsTemplate.bind({});
Tabs.args = {
    tabs: [
        {
            text: `Tab 1`,
            value: `tab1`,
        },
        {
            text: `Tab 2`,
            value: `tab2`,
        },
        {
            text: `Tab 3`,
            value: `tab3`,
        },
    ],
};
