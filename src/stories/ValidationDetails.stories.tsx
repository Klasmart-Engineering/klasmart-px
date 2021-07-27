import ValidationDetails,
{
    Props,
    validationStatuses,
} from "../components/Input/File/Spreadsheet/ValidationDetails";
import { Paper } from "@material-ui/core";
import { Story } from "@storybook/react";
import React from "react";

export default {
    title: `ValidationDetails`,
    component: ValidationDetails,
    argTypes: {
        status: {
            options: validationStatuses,
            control: {
                type: `select`,
            },
        },
    },
};

const Template: Story<Props> = (args) => (
    <Paper>
        <ValidationDetails
            {...args}
        />
    </Paper>
);

export const Main = Template.bind({});

Main.args = {
    errors: [],
    status: `in-progress`,
};
