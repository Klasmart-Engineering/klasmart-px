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
    CancelableDialog,
    CommonDialog,
    Openable,
} from "../shared";

const useStyles = makeStyles((theme) => createStyles({}));

export interface Props extends CommonDialog, CancelableDialog {}

export default function ConfirmDialog (props: Props & Openable<boolean>) {
    const {
        variant,
        open,
        title,
        content,
        hideIcon,
        cancelLabel,
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
                        onClick={() => onClose(false)}
                    >
                        {cancelLabel}
                    </Button>
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
