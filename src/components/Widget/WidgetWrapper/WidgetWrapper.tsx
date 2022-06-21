/* eslint-disable react/prop-types */
import {
    Box,
    Card,
    CircularProgress,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import clsx from "clsx";
import { useMemo } from "react";

const useStyles = makeStyles((theme) => createStyles({
    card: {
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-between`,
        borderRadius: theme.spacing(1.25),
        boxShadow: `none`,
        padding: theme.spacing(2),
        height: `100%`,
    },
    noPadding: {
        padding: 0,
    },
    noData: {
        backgroundColor: theme.palette.grey[200],
    },
    cardNoBackground: {
        backgroundColor: `unset`,
    },
    pointerNone: {
        pointerEvents: `none`,
    },
}));

export type WidgetBackground = `white` | `transparent`;

export interface WidgetWrapperProps {
    loading: boolean;
    background?: WidgetBackground;
    error: boolean;
    errorScreen: React.ReactNode;
    noData: boolean;
    noDataScreen: React.ReactNode;
    className?: string;
    disablePadding?: boolean;
}

const WidgetWrapper: React.FC<WidgetWrapperProps> = (props) => {
    const { background = `white` } = props;
    const classes = useStyles();

    const WidgetContent = useMemo(() => {
        if (props.loading) return <CircularProgress color="primary" />;
        if (props.error && props.errorScreen) return props.errorScreen;
        if (props.noData && props.noDataScreen) return props.noDataScreen;
        return props.children;
    }, [
        props.loading,
        props.error,
        props.errorScreen,
        props.noData,
        props.noDataScreen,
        props.children,
    ]);

    return (
        <Card
            className={clsx(props.className, classes.card, {
                [classes.cardNoBackground]: background === `transparent`,
                [classes.noData]: props.noData && !props.error,
                [classes.noPadding]: props.disablePadding,
            })}
        >
            <Box
                sx={props.loading
                    ? {
                        m: `auto`,
                        display: `flex`,
                        alignItems: `center`,
                        pointerEvents: `none`,
                    }
                    : {
                        height: `100%`,
                    }
                }
            >
                {WidgetContent}
            </Box>
        </Card>
    );
};

export default WidgetWrapper;
