import { SpreadsheetValidationError } from "./types";
import { Error as ErrorIcon } from "@mui/icons-material";
import {
    Box,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
    withStyles,
} from '@mui/styles';
import React,
{ ReactNode } from "react";

const useStyles = makeStyles((theme) => createStyles({
    errorIcon: {
        marginLeft: theme.spacing(1),
    },
}));

const WrappedTextTooltip = withStyles({
    tooltip: {
        whiteSpace: `pre-wrap`,
    },
})(Tooltip);

interface Props {
    fieldText: ReactNode;
    errors: SpreadsheetValidationError[];
}

export default function ErrorField (props: Props) {
    const { fieldText, errors } = props;
    const classes = useStyles();
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography>{fieldText}</Typography>
            <WrappedTextTooltip title={errors.map((error) => error.message).join(`\n`)}>
                <ErrorIcon
                    color="error"
                    className={classes.errorIcon}
                />
            </WrappedTextTooltip>
        </Box>
    );
}
