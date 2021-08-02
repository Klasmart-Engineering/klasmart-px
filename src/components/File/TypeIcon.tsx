import { stringToColor } from "../../utils";
import {
    createStyles,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { InsertDriveFile as InsertDriveFileIcon } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: `relative`,
        display: `inline-block`,
    },
    fileIcon: {
        marginRight: theme.spacing(1.5),
    },
    fileExtensionLabel: {
        position: `absolute`,
        right: 12,
        bottom: 9,
        color: theme.palette.common.white,
        padding: theme.spacing(1/8, 3/8),
        lineHeight: 1.1,
        borderRadius: theme.spacing(0.5),
        fontSize: 11,
        whiteSpace: `nowrap`,
        overflow: `hidden`,
        textOverflow: `ellipsis`,
        maxWidth: theme.spacing(4),
    },
}));

export interface Props {
    fileType: string;
    className?: string;
}

export default function FileTypeIcon (props: Props) {
    const { fileType, className } = props;
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, className)}>
            <InsertDriveFileIcon
                color="disabled"
                className={classes.fileIcon}
                fontSize="large"
            />
            {fileType && (
                <Typography
                    variant="caption"
                    className={classes.fileExtensionLabel}
                    style={{
                        backgroundColor: stringToColor(fileType, {
                            saturation: 70,
                        }),
                    }}
                >
                    {fileType}
                </Typography>
            )}
        </div>
    );
}
