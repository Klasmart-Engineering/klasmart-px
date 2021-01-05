import React from "react";
import { Button } from "@material-ui/core";
import {
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
} from 'notistack';

interface Props extends SnackbarProviderProps {
    closeButtonText?: string;
}

/**
 * Provider to handle displaying the snackbar.
 * This provider has to be wrapped within a MUI ThemeProvider
 * @param props
 */
export default function BaseSnackbarProvider (props: Props) {
    const {
        closeButtonText,
        children,
        ...others
    } = props;

    const { closeSnackbar } = useSnackbar();

    return (
        <SnackbarProvider
            hideIconVariant
            maxSnack={3}
            anchorOrigin={{
                vertical: `bottom`,
                horizontal: `center`,
            }}
            action={
                (key) => <Button
                    color="inherit"
                    onClick={() => closeSnackbar(key)}
                >
                    {closeButtonText ?? `Dismiss`}
                </Button>
            }
            {...others}
        >
            {children}
        </SnackbarProvider>
    );
}
