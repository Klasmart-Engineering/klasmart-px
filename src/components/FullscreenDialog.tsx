import Button from "./Button";
import {
    AppBar,
    createStyles,
    Dialog,
    DialogContent,
    DialogProps,
    Grow,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    content: {
        marginTop: theme.mixins.toolbar.minHeight,
    },
}));

const Motion = React.forwardRef((
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) => <Grow
    ref={ref}
    style={{
        transformOrigin: `100% 0 0`,
    }}
    {...props} />);

interface ToolbarAction {
    label: string;
    disabled?: boolean;
    onClick: () => void;
}

interface Props extends DialogProps {
    open: boolean;
    title: string;
    action?: ToolbarAction;
    onClose: () => void;
}

export default function FullScreenDialog (props: Props) {
    const {
        open,
        action,
        title,
        children,
        onClose,
    } = props;
    const classes = useStyles();

    return (
        <>
            <Dialog
                fullScreen
                TransitionComponent={Motion}
                open={open}
                onClose={onClose}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={() => onClose()}>
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            className={classes.title}
                        >
                            {title}
                        </Typography>
                        {action &&
                            <Button
                                label={action.label}
                                variant="contained"
                                color="primary"
                                disabled={action.disabled}
                                onClick={action.onClick}
                            />
                        }
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.content}>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
