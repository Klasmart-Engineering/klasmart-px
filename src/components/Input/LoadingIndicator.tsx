import {
    createStyles,
    LinearProgress,
    makeStyles,
    Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    loading: {
        position: `absolute`,
        width: `100%`,
        bottom: `1px`,
        left: 0,
        height: 2,
    },
    loadingOutlined: {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
}));

interface Props {
    loading?: boolean;
    variant?: string;
}

export default function InputLoadingIndicator (props: Props) {
    const { loading, variant } = props;
    const classes = useStyles();
    return (
        <>
            {loading && (
                <LinearProgress className={clsx(classes.loading, {
                    [classes.loadingOutlined]: variant === `outlined`,
                })}
                />
            )}
        </>
    );
}
