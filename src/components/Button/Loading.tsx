import {
    CircularProgress,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    loadingContainer: {
        alignItems: `center`,
        display: `flex`,
        height: `100%`,
        justifyContent: `center`,
        left: 0,
        position: `absolute`,
        top: 0,
        width: `100%`,
    },
}));

export const useLoadingStyles = makeStyles((theme) => createStyles({
    buttonLoading: {
        pointerEvents: `none`,
    },
    buttonLoadingContent: {
        opacity: 0,
    },
}));

interface Props {
}

export default function (props: Props) {
    const classes = useStyles();
    return (
        <span className={classes.loadingContainer}>
            <CircularProgress
                size={24}
                color="inherit"
            />
        </span>
    );
}
