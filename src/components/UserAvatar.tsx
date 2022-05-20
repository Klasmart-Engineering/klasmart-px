import {
    nameToInitials,
    stringToColor,
} from "../utils";
import { Person } from "@mui/icons-material";
import {
    Avatar,
    Tooltip,
    useTheme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    avatar: {
        color: `white`,
    },
    avatarSmall: {
        width: 30,
        height: 30,
        fontSize: 14,
    },
    avatarMedium: {
        width: 40,
        height: 40,
        fontSize: 18,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        fontSize: 38,
    },
}));

const MAX_INITIALS_LENGTH = 2;

export interface Props {
    name: string;
    src?: string;
    maxInitialsLength?: number;
    size?: `small` | `medium` | `large`;
    className?: string;
    color?: string;
}

export default function UserAvatar (props: Props) {
    const {
        name,
        maxInitialsLength = MAX_INITIALS_LENGTH,
        src,
        size = `medium`,
        className,
        color,
    } = props;
    const classes = useStyles();
    const theme = useTheme();

    const backgroundColor = color ?? (name ? stringToColor(name || ``) : theme.palette.primary.main);

    return (
        <Tooltip
            title={name}
            style={{
                display: `inline-block`,
            }}
        >
            <span>
                <Avatar
                    variant="circular"
                    src={src}
                    className={clsx(classes.avatar, className, {
                        [classes.avatarSmall]: size === `small`,
                        [classes.avatarMedium]: size === `medium`,
                        [classes.avatarLarge]: size === `large`,
                    })}
                    style={{
                        backgroundColor,
                    }}
                >
                    {name
                        ? nameToInitials(name, maxInitialsLength)
                        : <Person fontSize={size} />
                    }
                </Avatar>
            </span>
        </Tooltip>
    );
}
