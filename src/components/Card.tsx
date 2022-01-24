import { Paper } from "@mui/material";
import { Theme } from "@mui/material/styles";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React,
{ ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    paperContainer: {
        borderRadius: 12,
        border: `1px solid ${theme.palette.grey[300]}`,
        height: `100%`,
        boxShadow: theme.palette.mode === `dark`
            ? `0px 2px 4px -1px rgba(255, 255, 255, 0.25), 0px 4px 5px 0px rgba(255, 255, 255, 0.2), 0px 1px 10px 0px rgba(255, 255, 255, 0.16)`
            : `0px 4px 8px 0px rgba(0, 0, 0, 0.1)`,
    },
}));

interface Props {
    children: ReactNode;
    className?: string;
}

export default function Card (props: Props) {
    const classes = useStyles();
    const { children, className } = props;

    return <Paper className={clsx(classes.paperContainer, className)}>{children}</Paper>;
}
