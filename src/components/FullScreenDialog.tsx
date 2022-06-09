/* eslint-disable react/no-multi-comp */
import Button from "./Button/Button";
import { Close as CloseIcon } from "@mui/icons-material";
import {
    AppBar,
    Dialog,
    DialogContent,
    DialogProps,
    Grow,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React,
{ ReactElement } from "react";

const useStyles = makeStyles((theme) => createStyles({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    content: {
        marginTop: 50,
    },
}));

const Motion = React.forwardRef((props: TransitionProps & { children: ReactElement }, ref: React.Ref<unknown>) => (
    <Grow
        ref={ref}
        style={{
            transformOrigin: `100% 0 0`,
        }}
        {...props}
    />
));

interface ToolbarAction {
    label: string;
    disabled?: boolean;
    onClick: () => void;
}

interface Props extends DialogProps {
    open: boolean;
    title: string;
    action?: ToolbarAction;
    header?: JSX.Element;
    footer?: JSX.Element;
    onClose: ((event: unknown, reason?: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

export default function FullScreenDialog (props: Props) {
    const {
        open,
        action,
        title,
        header: Header,
        footer: Footer,
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
                            size="large"
                            onClick={onClose}
                        >
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
                {Header &&
                <div className={classes.content}>
                    {Header}
                </div>
                }
                <DialogContent className={!Header ? classes.content : undefined}>
                    {children}
                </DialogContent>
                {Footer}
            </Dialog>
        </>
    );
}
