import HomeScreenWidgetHeader,
{ HomeScreenWidgetHeaderProps } from ".";
import { Story } from "@storybook/react";

export default {
    title: `Widget/HomeScreenWidgetHeader`,
};

const HomeScreenWidgetHeaderTemplate: Story<HomeScreenWidgetHeaderProps> = (args) => {
    return (
        <HomeScreenWidgetHeader {...args} />
    );
};

export const HomeScreenHeader = HomeScreenWidgetHeaderTemplate.bind({});
HomeScreenHeader.args = {
    label: `Widget Title`,
    link: {
        url: `/`,
        label: `Redirect Link`,
    },
    isInteractive: false,
};
