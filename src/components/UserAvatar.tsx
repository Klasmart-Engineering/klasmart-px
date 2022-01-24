import {
    nameToInitials,
    stringToColor,
} from "../utils";
import { Person } from "@mui/icons-material";
import {
    Avatar,
    Tooltip,
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
        width: 24,
        height: 24,
        fontSize: 10,
    },
    avatarMedium: {
        width: 40,
        height: 40,
        fontSize: 16,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        fontSize: 24,
    },
}));

const MAX_INITIALS_LENGTH = 3;

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
    return (
        <Tooltip title={name}>
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
                        backgroundColor: color ?? stringToColor(name || ``),
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
