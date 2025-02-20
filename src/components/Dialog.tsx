import Button from "./Button/Button";
import { Close as CloseIcon } from "@mui/icons-material";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    Theme,
    Tooltip,
} from "@mui/material";
import {
    Palette,
    PaletteColor,
} from '@mui/material/styles';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    closeButton: {
        position: `absolute`,
        top: 0,
        right: 0,
        margin: theme.spacing(1),
    },
    loading: {
        opacity: 0,
        position: `absolute`,
    },
}));

export interface DialogAction {
    align?: "left" | "right";
    color: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    label: string;
    disabled?: boolean;
    onClick: () => any;
}

export type DialogWidth = `sm` | `xs` | `md` | `lg` | `xl`;

interface Props extends DialogProps {
    open: boolean;
    title: string;
    actions: DialogAction[];
    width?: DialogWidth;
    contentClassName?: string;
    onClose: ((event: unknown, reason?: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export default function BaseDialog (props: Props) {
    const {
        children,
        open,
        title,
        actions,
        width = `sm`,
        contentClassName,
        onClose,
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            open={open}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            maxWidth={width}
            onClose={onClose}
        >
            <Tooltip title="Close dialog">
                <IconButton
                    className={classes.closeButton}
                    size="large"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>
            <DialogTitle id="scroll-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent
                dividers
                className={contentClassName}
            >
                {children}
            </DialogContent>
            <DialogActions>
                {actions
                    ?.filter((a) => a.align === `left`)
                    ?.map((action, i) => (
                        <Button
                            key={`action-${i}`}
                            label={action.label}
                            disabled={action.disabled}
                            color={action.color}
                            onClick={action.onClick}
                        />
                    ))
                }
                <Box flex="1" />
                {actions
                    ?.filter((a) => a.align !== `left`)
                    ?.map((action, i) => (
                        <Button
                            key={`action-${i}`}
                            label={action.label}
                            disabled={action.disabled}
                            color={action.color}
                            onClick={action.onClick}
                        />
                    ))
                }
            </DialogActions>
        </Dialog>
    );
}
