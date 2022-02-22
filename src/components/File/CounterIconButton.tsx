import IconButton from "../Button/IconButton";
import FileListMenu,
{ Props as ListMenuProps } from "./ListMenu";
import {
    createStyles,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { InsertDriveFile } from "@material-ui/icons";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: `relative`,
        display: `inline-block`,
    },
    fileCounter: {
        color: `white`,
        position: `absolute`,
        left: `50%`,
        top: `60%`,
        transform: `translate(-50%, -50%)`,
        pointerEvents: `none`,
    },
}));

const MAX_SHOW_COUNT = 9;

export interface FileItem {
    name: string;
    onDownloadClick?: () => void;
}

export interface Props {
    files: FileItem[];
    menuTitle?: string;
    hideDownloadActions?: ListMenuProps["hideActions"];
}

export default function FileCounterIconButton (props: Props) {
    const {
        files,
        menuTitle,
        hideDownloadActions,
    } = props;
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={classes.root}>
            <IconButton
                disabled={files.length === 0}
                icon={InsertDriveFile}
                size="small"
                onClick={handleClick}
            />
            {files.length > 0 && (
                <>
                    <Typography
                        className={classes.fileCounter}
                        variant="caption"
                    >
                        {files.length > MAX_SHOW_COUNT ? `${MAX_SHOW_COUNT}+` : files.length}
                    </Typography>
                    <FileListMenu
                        anchorEl={anchorEl}
                        files={files}
                        open={open}
                        title={menuTitle}
                        hideActions={hideDownloadActions}
                        onClose={handleClose}
                    />
                </>
            )}
        </div>
    );
}
