import { stringToColor } from "../../../utils";
import {
    createStyles,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { InsertDriveFile as InsertDriveFileIcon } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: `relative`,
    },
    fileIcon: {
        margin: theme.spacing(0, 1.5),
        fontSize: 40,
    },
    fileExtensionLabel: {
        position: `absolute`,
        right: 12,
        bottom: 10,
        color: theme.palette.common.white,
        padding: theme.spacing(0.25, 0.5),
        lineHeight: 1.1,
        borderRadius: theme.spacing(0.5),
        fontSize: 11,
        whiteSpace: `nowrap`,
        overflow: `hidden`,
        textOverflow: `ellipsis`,
        maxWidth: theme.spacing(4),
    },
}));

interface Props {
    fileType?: string;
}

export default function FileIcon (props: Props) {
    const { fileType } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <InsertDriveFileIcon
                color="disabled"
                className={classes.fileIcon}
                fontSize="large"
            />
            {fileType && <Typography
                variant="caption"
                className={classes.fileExtensionLabel}
                style={{
                    backgroundColor: stringToColor(fileType, {
                        saturation: 70,
                    }),
                }}
            >
                {fileType}
            </Typography>}
        </div>
    );
}
