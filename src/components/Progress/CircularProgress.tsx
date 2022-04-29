/* eslint-disable react/no-multi-comp */
import { Close as CloseIcon } from "@mui/icons-material";
import {
    CircularProgress as MUICircularProgress,
    CircularProgressProps,
    Theme,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";

const useStyles = makeStyles({
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
});

type CircularProgressColor = CircularProgressProps["color"] | `action` | `white`

interface Props {
    className?: string;
    showCancel?: boolean;
    size?: number;
    color?: CircularProgressColor;
    disableCentered?: boolean;
}

const buildStyling = (color: CircularProgressColor, theme: Theme) => {
    switch(color) {
    case `action`: return {
        style: {
            color: theme.palette.action.active,
        },
    };
    case `white`: return {
        style: {
            color: theme.palette.common.white,
        },
    };
    default: return {
        color,
    };
    }
};

function CenterWrapper ({ disableCentered, children }: {disableCentered?: boolean; children: React.ReactNode}) {
    const classes = useStyles();

    if (disableCentered) {
        return <>{children}</>;
    }
    return <span className={classes.loadingContainer}>{children}</span>;
}

export default function CircularProgress (props: Props) {
    const {
        className,
        showCancel,
        disableCentered,
        size = 24,
        color = `inherit`,
    } = props;
    const theme = useTheme();

    const styling = buildStyling(color, theme);

    return (
        <CenterWrapper disableCentered={disableCentered}>
            <MUICircularProgress
                className={className}
                size={size}
                {...styling}
            />
            {showCancel && <CloseIcon fontSize="small" />}
        </CenterWrapper>
    );

}
