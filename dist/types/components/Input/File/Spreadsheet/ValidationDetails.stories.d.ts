import ValidationDetails, { Props } from "./ValidationDetails";
import { Story } from "@storybook/react";
declare const _default: {
    title: string;
    component: typeof ValidationDetails;
    argTypes: {
        status: {
            options: readonly ["in-progress", "passed", "failed"];
            control: {
                type: string;
            };
        };
    };
};
export default _default;
export declare const Main: Story<Props>;
