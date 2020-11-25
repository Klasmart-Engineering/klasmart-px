import {
    CircularProgress,
    Grid,
    Typography,
} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

export default function Loading({ messageId }: { messageId?: string }) {
    return (
        <Grid
            item
            xs={12}
            style={{
                textAlign: `center`,
            }}>
            <Grid
                container
                item
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <Grid
                    item
                    xs={12}>
                    <CircularProgress />
                </Grid>
                {messageId ? (
                    <Grid
                        item
                        xs={12}>
                        <Typography variant="subtitle2">
                            <FormattedMessage id={messageId} />
                        </Typography>
                    </Grid>
                ) : null}
            </Grid>
        </Grid>
    );
}
