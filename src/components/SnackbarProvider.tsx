import { Button } from "@material-ui/core";
import {
    SnackbarProvider,
    SnackbarProviderProps,
    useSnackbar,
} from 'notistack';
import React,
{ ReactText } from "react";

interface CloseButtonProps {
    actionKey: ReactText;
    label?: string;
}

function CloseButton (props: CloseButtonProps) {
    const {
        actionKey,
        label,
    } = props;

    const { closeSnackbar } = useSnackbar();

    return <Button
        color="inherit"
        onClick={() => closeSnackbar(actionKey)}
    >
        {label ?? `Close`}
    </Button>;
}

interface Props extends SnackbarProviderProps {
    closeButtonLabel?: string;
}

/**
 * Provider to handle displaying the snackbar.
 * This provider has to be wrapped within a MUI ThemeProvider
 * @param props
 */
export default function BaseSnackbarProvider (props: Props) {
    const {
        closeButtonLabel,
        children,
        ...others
    } = props;

    return (
        <SnackbarProvider
            hideIconVariant
            maxSnack={3}
            anchorOrigin={{
                vertical: `bottom`,
                horizontal: `center`,
            }}
            action={
                (key) => <CloseButton
                    actionKey={key}
                    label={closeButtonLabel}
                />
            }
            {...others}
        >
            {children}
        </SnackbarProvider>
    );
}
