import { sleep } from "../../../utils";
import IconButton from "../../Button/IconButton";
import {
    Box,
    createStyles,
    makeStyles,
    Paper,
    Typography,
    useTheme,
} from "@material-ui/core";
import {
    AttachFile as AttachFileIcon,
    Check,
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        padding: theme.spacing(1, 2),
    },
    fileIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    successIcon: {
        padding: theme.spacing(1.5),
    },
}));

export interface Props {
    className?: string;
    file: File;
    error?: string;
    disabled?: boolean;
    locales?: string | string[];
    onClickRemove?: () => void;
    onClickUpload: () => void | Promise<void>;
}

export default function SelectedFileRow (props: Props) {
    const {
        className,
        file,
        error,
        locales,
        onClickRemove,
        onClickUpload,
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const fileSize = (file.size / 1000).toFixed(1);
    const lastModified = Intl.DateTimeFormat(locales, {
        dateStyle: `long`,
    }).format(new Date(file.lastModified));
    const [ uploadSuccess, setUploadSuccess ] = useState(false);
    const [ uploadLoading, setUploadLoading ] = useState(false);

    const onClickUpload_ = async () => {
        setUploadLoading(true);
        let error;
        try {
            await onClickUpload?.();
        } catch (err) {
            error = err;
        }
        setUploadLoading(false);
        if (error) throw error;
        setUploadSuccess(true);
    };

    return (
        <Paper
            className={clsx(classes.root, className)}
            style={{
                backgroundColor: uploadSuccess ? theme.palette.success.main : undefined,
                color: uploadSuccess ? `white` : undefined,
            }}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <AttachFileIcon
                    color="action"
                    fontSize="small"
                    className={classes.fileIcon}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                >
                    <Typography>{file.name}</Typography>
                    {error
                        ? <Typography
                            color="error"
                            variant="caption"
                        >
                            {error}
                        </Typography>
                        : <Typography
                            color="textSecondary"
                            variant="caption"
                        >
                            {fileSize} Kb • {lastModified}
                        </Typography>
                    }
                </Box>
                <Box flex={1} />
                <Box
                    display="flex"
                    flexDirection="row"
                >
                    {onClickRemove && <IconButton
                        icon={DeleteIcon}
                        disabled={uploadLoading}
                        onClick={onClickRemove} />
                    }
                    {uploadSuccess ?
                        <Check
                            color="inherit"
                            className={classes.successIcon} />
                        : <IconButton
                            icon={CloudUploadIcon}
                            color="primary"
                            disabled={!!error || uploadLoading}
                            onClick={onClickUpload_}
                        />
                    }
                </Box>
            </Box>
        </Paper>
    );
}
