import {
    nameToInitials,
    stringToColor,
} from "../utils";
import {
    Avatar,
    createStyles,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import { Business } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    avatar: {
        color: `white`,
    },
    avatarSmall: {
        width: 24,
        height: 24,
        fontSize: 8,
    },
    avatarMedium: {
        width: 40,
        height: 40,
        fontSize: 12,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        fontSize: 24,
    },
}));

const MAX_INITIALS_LENGTH = 4;

interface Props {
    name: string;
    src?: string;
    maxInitialsLength?: number;
    size?: `small` | `medium` | `large`;
    className?: string;
}

export default function OrganizationAvatar (props: Props) {
    const {
        name,
        maxInitialsLength = MAX_INITIALS_LENGTH,
        src,
        size = `medium`,
        className,
    } = props;
    const classes = useStyles();
    return (
        <Tooltip title={name}>
            <span>
                <Avatar
                    variant="rounded"
                    src={src}
                    className={clsx(classes.avatar, className, {
                        [classes.avatarSmall]: size === `small`,
                        [classes.avatarMedium]: size === `medium`,
                        [classes.avatarLarge]: size === `large`,
                    })}
                    style={{
                        backgroundColor: stringToColor(name || ``),
                    }}
                >
                    {name
                        ? nameToInitials(name, maxInitialsLength)
                        : <Business fontSize={size === `medium` ? `default` : size} />
                    }
                </Avatar>
            </span>
        </Tooltip>
    );
}
