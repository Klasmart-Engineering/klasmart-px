import { SpreadsheetValidationError } from "./errors";
import {
    Box,
    createStyles,
    makeStyles,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";
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
