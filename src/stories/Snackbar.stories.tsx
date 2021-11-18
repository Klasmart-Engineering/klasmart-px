/* eslint-disable react/no-multi-comp */
import { Props } from "../components/SnackbarProvider";
import {
    Button,
    SnackbarProvider,
    useSnackbar,
} from "../index";
import { Story } from "@storybook/react";
import { VariantType } from "notistack";
import React from 'react';

export default {
    title: `Snackbar`,
};

const SnackbarButton = () => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Button
            color="primary"
            variant="contained"
            label="Show snackbar"
            onClick={() => {
                enqueueSnackbar(`Woop woop`);
            }}
        />
    );
};

const SnackbarContainer = (props: Props) => {
    return (
        <SnackbarProvider {...props}>
            <SnackbarButton />
        </SnackbarProvider>
    );
};

const Template: Story<Props> = (args) => <SnackbarContainer {...args} />;

export const Snackbar = Template.bind({});

Snackbar.args = {
    variant: `success`,
    closeButtonLabel: `Dismiss`,
};
Snackbar.argTypes = {
    variant: {
        options: [
            `default`,
            `error`,
            `info`,
            `success`,
            `warning`,
        ] as VariantType[],
        control: {
            type: `radio`,
        },
    },
};
