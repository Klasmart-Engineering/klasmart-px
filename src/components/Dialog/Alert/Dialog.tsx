import Button from "../../Button/Button";
import DialogContent from "../DialogContent";
import DialogTitle from "../DialogTitle";
import {
    CommonDialog,
    Openable,
} from "../shared";
import {
    Dialog,
    DialogActions,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from "react";

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
                <DialogContent content={content} />
                <DialogActions>
                    <Button
                        color="primary"
                        label={okLabel}
                        onClick={() => onClose(true)}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}
