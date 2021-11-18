import Button from "../../Button/Button";
import DialogContent from "../DialogContent";
import DialogTitle from "../DialogTitle";
import {
    CancelableDialog,
    CommonDialog,
    Openable,
} from "../shared";
import {
    createStyles,
    Dialog,
    DialogActions,
    makeStyles,
} from "@material-ui/core";
import React from "react";

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
                <DialogContent content={content} />
                <DialogActions>
                    <Button
                        label={cancelLabel}
                        color="primary"
                        onClick={() => onClose(false)}
                    />
                    <Button
                        label={okLabel}
                        color="primary"
                        onClick={() => onClose(true)}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}
