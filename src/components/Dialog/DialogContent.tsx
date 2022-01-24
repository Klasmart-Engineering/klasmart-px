import {
    DialogContent as Content,
    DialogContentProps,
    DialogContentText,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React,
{ ReactNode } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

interface Props extends DialogContentProps {
    content: ReactNode;
}

export default function DialogContent (props: Props) {
    const { content } = props;
    const classes = useStyles();

    return (
        <Content>
            {typeof content === `string`
                ? <DialogContentText>{content}</DialogContentText>
                : content
            }
        </Content>
    );
}
