import HomeScreenWidgetWrapper,
{ HomeScreenWidgetWrapperProps } from "./HomeScreenWidgetWrapper";
import {
    Box,
    Typography,
} from "@mui/material";
import { Story } from "@storybook/react";

export default {
    title: `Widget/HomeScreenWidgetWrapper`,
};

const HomeScreenWidgetWrapperTemplate: Story<HomeScreenWidgetWrapperProps> = (args) => {
    return (
        <HomeScreenWidgetWrapper {...args}>
            <Box
                sx={{
                    background: `red`,
                    height: `250px`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                }}
            >
                Test Widget
            </Box>
        </HomeScreenWidgetWrapper>
    );
};

export const HomeScreenWrapper = HomeScreenWidgetWrapperTemplate.bind({});
HomeScreenWrapper.args = {
    editing: false,
    label: `Widget Title`,
    link: {
        url: `/`,
        label: `Redirect Link`,
    },
    noData: false,
    noDataScreen: (
        <Box>
            <Typography textAlign="center">No Data</Typography>
        </Box>
    ),
    error: false,
    errorScreen: (
        <Box>
            <Typography textAlign="center">Error</Typography>
        </Box>
    ),
    loading: false,
    isPersistent: false,
    disablePadding: false,
};
