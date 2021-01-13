import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    makeStyles,
    Theme,
    Tooltip,
    useTheme,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import clsx from "clsx";
import {
    Palette,
    PaletteColor,
} from "@material-ui/core/styles/createPalette";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);

export interface DialogAction {
    align?: "left" | "right";
    color: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    label: string;
    loading?: boolean;
    disabled?: boolean;
    onClick: () => any;
}

interface DialogActionButtonProps {
    action: DialogAction;
}

function DialogActionButton (props: DialogActionButtonProps) {
    const { action } = props;
    const classes = useStyles();
    const theme = useTheme();
    return <Button
        style={{
            color: !action.disabled ? theme.palette[action.color][theme.palette.type] : undefined,
        }}
        disabled={action.disabled}
        onClick={action.onClick}
    >
        <span
            className={clsx({
                [classes.loading]: action.loading,
            })}
        >
            {action.label}
        </span>
        {action.loading && <CircularProgress size={24} />}
    </Button>;
}

interface Props extends DialogProps {
    open: boolean;
    title: string;
    actions: DialogAction[];
    onClose: ((event: unknown, reason?: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export default function BaseDialog (props: Props) {
    const {
        children,
        open,
        title,
        actions,
        onClose,
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            open={open}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            maxWidth="sm"
            onClose={onClose}
        >
            <Tooltip title="Close dialog">
                <IconButton
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon/>
                </IconButton>
            </Tooltip>
            <DialogTitle id="scroll-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                {actions
                    ?.filter((a) => a.align === `left`)
                    ?.map((action, i) =>
                        <DialogActionButton
                            key={`action-${i}`}
                            action={action}
                        />,
                    )
                }
                <Box flex="1" />
                {actions
                    ?.filter((a) => a.align !== `left`)
                    ?.map((action, i) =>
                        <DialogActionButton
                            key={`action-${i}`}
                            action={action}
                        />,
                    )
                }
            </DialogActions>
        </Dialog>
    );
}
