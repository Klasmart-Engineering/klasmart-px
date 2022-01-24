import { Check as CheckIcon } from "@mui/icons-material";
import {
    ButtonBase,
    useTheme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React from "react";

const SIZE = 24;

const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: SIZE,
        height: SIZE,
        borderRadius: theme.spacing(0.5),
        position: `relative`,
        boxShadow: `0 0 1px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)`,
        flex: `0 0 ${SIZE}px`,
    },
    selectIcon: {
        position: `absolute`,
    },
}));

interface Props {
    color: string;
    isSelected?: boolean;
    className?: string;
    onClick?: (color: string) => void;
}

export default function ColorClick (props: Props) {
    const {
        color,
        isSelected,
        className,
        onClick,
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const iconColor = theme.palette.getContrastText(color);

    return (
        <ButtonBase
            className={clsx(classes.root, className)}
            style={{
                backgroundColor: color,
            }}
            onClick={() => onClick?.(color)}
        >
            {isSelected && (
                <CheckIcon
                    className={classes.selectIcon}
                    style={{
                        color: iconColor,
                    }}
                />
            )}
        </ButtonBase>
    );
}
