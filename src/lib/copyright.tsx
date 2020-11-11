import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const styles = (theme: Theme) =>
    createStyles({
        responsiveTypography: {
            color: "#000",
            display: "inline",
            paddingBottom: theme.spacing(2),
            textAlign: "center",
            [theme.breakpoints.down("sm")]: {
                display: "block",
            },
            [theme.breakpoints.down("xs")]: {
                textAlign: "left",
            },
        },
    });

export default function Copyright() {
    return (
        <Grid item>
            <Typography variant="caption" color="textSecondary">
                Copyright
                {" © "}
                {new Date().getFullYear()}
                {". "}
                <Link
                    color="inherit"
                    target="_blank"
                    href="https://badanamu.com/"
                >
                    Calm Island Limited. All rights reserved.
                </Link>{" "}
                The KidsLoop logo is a registered trademarks of Calm Island
                Limited.{" "}
            </Typography>
            {/* <Typography variant="caption" color="textSecondary">
                <Link
                    color="inherit"
                    target="_blank"
                    href="https://kidsloop.net/en/policies/privacy-notice"
                    style={{ textDecoration: "underline" }}
                >
                    <FormattedMessage id="copyright_privacy" />
                </Link>
                {" | "}
                <Link
                    color="inherit"
                    target="_blank"
                    href="https://kidsloop.net/en/policies/terms/"
                    style={{ textDecoration: "underline" }}
                >
                    <FormattedMessage id="copyright_terms" />
                </Link>
                {" | "}
                <Link
                    color="inherit"
                    target="_blank"
                    href="https://kidsloop.net/en/policies/return-policy/"
                    style={{ textDecoration: "underline" }}
                >
                    <FormattedMessage id="copyright_refund" />
                </Link>
            </Typography> */}
        </Grid>
    );
}
