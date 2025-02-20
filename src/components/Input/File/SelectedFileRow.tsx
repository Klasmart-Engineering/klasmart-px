import IconButton from "../../Button/IconButton";
import FileTypeIcon from "../../File/TypeIcon";
import {
    Check as CheckIcon,
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import {
    Box,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
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
    successText: {
        color: theme.palette.success.main,
    },
    successIcon: {
        margin: theme.spacing(1.5),
        color: theme.palette.success.main,
    },
}));

export interface Props {
    className?: string;
    file: File;
    error?: string;
    areActionsDisabled?: boolean;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadErrorMessage?: string;
    uploadSuccessMessage?: string;
    locales?: string | string[];
    onClickRemove?: () => void;
    onClickUpload: () => void | Promise<void>;
}

export default function SelectedFileRow (props: Props) {
    const {
        className,
        file,
        error,
        areActionsDisabled,
        locales,
        removeButtonTooltip = `Remove file`,
        uploadButtonTooltip = `Upload file`,
        uploadErrorMessage,
        uploadSuccessMessage = `File successfully uploaded`,
        onClickRemove,
        onClickUpload,
    } = props;
    const classes = useStyles();
    const fileSize = (file.size / 1000).toFixed(1);
    const lastModified = Intl.DateTimeFormat(locales, {
        dateStyle: `long`,
    })
        .format(new Date(file.lastModified));
    const [ uploadSuccess, setUploadSuccess ] = useState(false);
    const [ uploadError, setUploadError ] = useState(``);
    const [ uploadLoading, setUploadLoading ] = useState(false);

    const onClickUpload_ = async () => {
        setUploadSuccess(false);
        setUploadError(``);
        setUploadLoading(true);
        try {
            await onClickUpload?.();
            setUploadSuccess(true);
        } catch (err: any) {
            setUploadError(err?.message);
        }
        setUploadLoading(false);
    };

    const fileExtension = file.name.split(`.`)
        .slice(-1)[0];

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={clsx(classes.root, className)}
        >
            <FileTypeIcon fileType={fileExtension} />
            <Box
                display="flex"
                flexDirection="column"
            >
                <Typography>{file.name}</Typography>
                {error || uploadError && (
                    <Typography
                        color="error"
                        variant="caption"
                    >
                        {error || uploadErrorMessage || uploadError }
                    </Typography>
                )}
                {uploadSuccess && (
                    <Typography
                        className={classes.successText}
                        variant="caption"
                    >
                        {uploadSuccessMessage}
                    </Typography>
                )}
                {!error && !uploadError && !uploadSuccess && (
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        {fileSize} Kb • {lastModified}
                    </Typography>
                )}
            </Box>
            <Box flex={1} />
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                {onClickRemove && (
                    <IconButton
                        icon={DeleteIcon}
                        disabled={areActionsDisabled || uploadLoading}
                        tooltip={removeButtonTooltip}
                        size="medium"
                        onClick={onClickRemove}
                    />
                )}
                {uploadSuccess
                    ? (
                        <CheckIcon
                            data-testid="upload-success-icon"
                            className={classes.successIcon}
                        />
                    )
                    : (
                        <IconButton
                            icon={CloudUploadIcon}
                            color="primary"
                            disabled={areActionsDisabled || !!error || uploadLoading}
                            tooltip={uploadButtonTooltip}
                            size="medium"
                            onClick={onClickUpload_}
                        />
                    )
                }
            </Box>
        </Box>
    );
}
