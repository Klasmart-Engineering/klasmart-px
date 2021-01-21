import React,
{ ReactNode } from "react";
import {
    createStyles,
    DialogContent,
    DialogContentProps,
    DialogContentText,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({}));

interface Props extends DialogContentProps {
    content: ReactNode;
}

export default function Content (props: Props) {
    const { content } = props;
    const classes = useStyles();

    return <DialogContent>
        {typeof content === `string`
            ? <DialogContentText>{content}</DialogContentText>
            : content
        }
    </DialogContent>;
}
