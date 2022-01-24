
import {
    LinearProgress,
    Theme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    loadingContainer: {
        "& th": {
            position: `relative`,
            padding: 0,
        },
    },
    loading: {
        position: `absolute`,
        width: `100%`,
    },
}));

interface Props {
    loading?: boolean;
    columnCount: number;
}

export default function BaseTableLoading (props: Props) {
    const {
        loading,
        columnCount,
    } = props;
    const classes = useStyles();
    return (
        <thead className={classes.loadingContainer}>
            <tr>
                <th colSpan={columnCount}>
                    {loading && <LinearProgress className={classes.loading} />}
                </th>
            </tr>
        </thead>
    );
}
