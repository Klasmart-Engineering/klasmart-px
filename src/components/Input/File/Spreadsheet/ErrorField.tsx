import { SpreadsheetValidtionError } from "./Base";
import {
    Box,
    createStyles,
    makeStyles,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";
import React,
{ ReactNode } from "react";

const useStyles = makeStyles((theme) => createStyles({
    tooltip: {
        marginLeft: theme.spacing(1),
    },
}));

interface Props {
    fieldText: ReactNode;
    error: SpreadsheetValidtionError;
}

export default function ErrorField (props: Props) {
    const { fieldText, error } = props;
    const classes = useStyles();
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography>{fieldText}</Typography>
            <Tooltip title={error?.message}>
                <ErrorIcon
                    color="error"
                    className={classes.tooltip}
                />
            </Tooltip>
        </Box>
    );
}
