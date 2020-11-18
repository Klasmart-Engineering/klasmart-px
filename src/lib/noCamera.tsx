import {
    createStyles,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: `relative`,
            width: `100%`,
            backgroundColor: `#193d6f`,
        },
        centeredText: {
            color: `#FFF`,
            position: `absolute`,
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            whiteSpace: `pre-line`,
            wordBreak: `break-word`,
        },
    }),
);

export default function NoCamera({ messageId }: { messageId: string }) {
    const classes = useStyles();
    return (
        <Grid
            className={classes.root}
            container
            justify="space-between"
            alignItems="center"
            style={{
                paddingTop: `75%`,
            }}
        >
            <Typography
                className={classes.centeredText}
                variant="caption"
                align="center"
            >
                <FormattedMessage id={messageId} />
            </Typography>
        </Grid>
    );
}
