import { Props as OrganizationAvatarProps } from "./OrganizationAvatar";
import { Props as UserAvatarProps } from "./UserAvatar";
import { Story } from "@storybook/react";
declare const _default: {
    title: string;
    argTypes: {
        size: {
            options: string[];
            control: {
                type: string;
            };
        };
    };
};
export default _default;
export declare const Organization: Story<OrganizationAvatarProps>;
export declare const User: Story<UserAvatarProps>;
