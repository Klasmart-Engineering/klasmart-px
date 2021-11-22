/* eslint-disable react/no-multi-comp */
import Button from './Button/Button';
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

    return (
        <Button
            label={label ?? `Close`}
            color="inherit"
            onClick={() => closeSnackbar(actionKey)}
        />
    );
}

export interface Props extends SnackbarProviderProps {
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
            action={(key) => (
                <CloseButton
                    actionKey={key}
                    label={closeButtonLabel}
                />
            )}
            {...others}
        >
            {children}
        </SnackbarProvider>
    );
}
