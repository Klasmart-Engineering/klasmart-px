import React from "react";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    makeStyles,
} from "@material-ui/core";
import DialogTitle from "../DialogTitle";
import DialogContent from "../DialogContent";
import {
    CommonDialog,
    Openable,
} from "../shared";

const useStyles = makeStyles((theme) => createStyles({}));

export type Props = CommonDialog

export default function AlertDialog (props: Props & Openable<boolean>) {
    const {
        variant,
        open,
        title,
        content,
        hideIcon,
        okLabel,
        onClose,
        ...rest
    } = props;
    const classes = useStyles();
    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={() => onClose()}
                {...rest}
            >
                <DialogTitle
                    title={title}
                    variant={variant}
                    hideIcon={hideIcon}
                />
                <DialogContent content={content}/>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={() => onClose(true)}
                    >
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
