import OrganizationAvatar,
{ Props as OrganizationAvatarProps } from "../components/OrganizationAvatar";
import UserAvatar,
{ Props as UserAvatarProps } from "../components/UserAvatar";
import { Story } from "@storybook/react";
import React from "react";

export default {
    title: `Avatar`,
    argTypes: {
        size: {
            options: [
                `small`,
                `medium`,
                `large`,
            ],
            control: {
                type: `radio`,
            },
        },
    },
};

const OrganizationAvatarTemplate: Story<OrganizationAvatarProps> = (args) => {
    return <OrganizationAvatar {...args}/>;
};

export const Organization = OrganizationAvatarTemplate.bind({});
Organization.args = {
    name: `Kidsloop`,
    size: `large`,
    color: `purple`,
};

const UserAvatarTemplate: Story<UserAvatarProps> = (args) => {
    return <UserAvatar {...args}/>;
};

export const User = UserAvatarTemplate.bind({});
User.args = {
    name: `Joe Bloggs`,
    size: `large`,
    color: `red`,
};
