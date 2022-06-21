import WidgetWrapper,
{ WidgetWrapperProps } from "./WidgetWrapper";
import {
    Box,
    Typography,
} from "@mui/material";
import { Story } from "@storybook/react";

export default {
    title: `Widget/WidgetWrapper`,
};

const WrapperTemplate: Story<WidgetWrapperProps> = (args) => {
    return (
        <WidgetWrapper {...args}>
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
        </WidgetWrapper>
    );
};

export const Wrapper = WrapperTemplate.bind({});
Wrapper.args = {
    loading: false,
    error: false,
    errorScreen: (
        <Box>
            <Typography textAlign="center">Error</Typography>
        </Box>
    ),
    noData: false,
    noDataScreen: (
        <Box>
            <Typography textAlign="center">No Data</Typography>
        </Box>
    ),
    disablePadding: false,
};
