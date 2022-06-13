import IconButton from "../Button/IconButton";
import { FileItem } from "./CounterIconButton";
import FileTypeIcon from "./TypeIcon";
import { CloudDownload } from "@mui/icons-material";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListSubheader,
    Popover,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: 300,
    },
    downloadIconButton: {
        marginRight: -12,
    },
}));

export interface Props {
    anchorEl: HTMLElement | null;
    files: FileItem[];
    open: boolean;
    title?: string;
    hideActions?: boolean;
    onClose: () => void;
}

export default function FileListMenu (props: Props) {
    const {
        files,
        open,
        anchorEl,
        title,
        hideActions,
        onClose,
    } = props;
    const classes = useStyles();
    return (
        <Popover
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
                vertical: `bottom`,
                horizontal: `left`,
            }}
            transformOrigin={{
                vertical: `top`,
                horizontal: `left`,
            }}
            onClose={() => onClose()}
        >
            <List
                dense
                className={classes.root}
                subheader={title ? <ListSubheader>{title}</ListSubheader> : undefined}
            >
                {files.map((file, i) => {
                    const fileType = file.name.split(`.`)
                        .slice(-1)[0];
                    return (
                        <ListItem key={`file-item-${i}`}>
                            <ListItemIcon>
                                <FileTypeIcon fileType={fileType} />
                            </ListItemIcon>
                            <Tooltip title={file.name}>
                                <Typography
                                    noWrap
                                    variant="body2"
                                >
                                    {file.name}
                                </Typography>
                            </Tooltip>
                            {!hideActions && (
                                <ListItemSecondaryAction>
                                    <IconButton
                                        icon={CloudDownload}
                                        disabled={!file.onDownloadClick}
                                        className={classes.downloadIconButton}
                                        size="medium"
                                        onClick={file.onDownloadClick}
                                    />
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    );
                })}
            </List>
        </Popover>
    );
}
