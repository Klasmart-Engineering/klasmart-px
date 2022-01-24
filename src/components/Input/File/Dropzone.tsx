import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import {
    Box,
    lighten,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React,
{ useCallback } from "react";
import {
    FileRejection,
    useDropzone,
} from "react-dropzone";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        height: `100%`,
        width: `100%`,
        cursor: `pointer`,
        borderRadius: theme.spacing(0.5),
        backgroundColor: theme.palette.grey[200],
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${theme.palette.primary.main.slice(1)}' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");`,
        transition: `background-color 0.4s ease-out`,
        "&:focus": {
            outline: `none`,
            backgroundColor: theme.palette.grey[300],
        },
    },
    dragFile: {
        boxSizing: `border-box`,
        backgroundImage: `none`,
        borderWidth: 2,
        borderStyle: `solid`,
    },
    dragFileAccept: {
        backgroundColor: lighten(theme.palette.primary.light, 0.75),
        borderColor: theme.palette.primary.main,
    },
    dragFileReject: {
        backgroundColor: lighten(theme.palette.error.light, 0.75),
        borderColor: theme.palette.error.main,
    },
    dropzoneIcon: {
        fontSize: 96,
    },
}));

export interface Props {
    accept?: string | string[];
    maxSize?: number;
    maxFiles?: number;
    label?: string;
    typeRejectedError?: string;
    maxFilesError?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    onFileAdded?: (file: File) => void;
    onFileRejected?: (file: File, error: string) => void;
}

export default function Dropzone (props: Props) {
    const {
        accept,
        maxSize = Infinity,
        maxFiles = Infinity,
        label = `Drag and drop files here, or click to select files`,
        typeRejectedError = `File type is not supported`,
        maxFilesError = `Only ${maxFiles} file${maxFiles === 1 ? `` : `s`} can be uploaded at a time`,
        exceedsMaxSizeError = (fileSize: number, maxSize: number) => `File size (${(fileSize / 1000).toFixed(1)} Kb) exceeds max size (${(maxSize / 1000).toFixed(1)} Kb)`,
        onFileAdded,
        onFileRejected,
    } = props;
    const classes = useStyles();

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                onFileAdded?.(file);
            };
            reader.readAsArrayBuffer(file);
        });
        rejectedFiles.forEach((rejection) => {
            const errorCode = rejection.errors[0].code;
            const errorMessage = rejection.errors[0].message;
            const fileSize = rejection.file.size;
            switch (errorCode) {
            case `file-invalid-type`:
                onFileRejected?.(rejection.file, typeRejectedError);
                break;
            case `file-too-large`:
                onFileRejected?.(rejection.file, exceedsMaxSizeError(fileSize, maxSize));
                break;
            case `too-many-files`:
                onFileRejected?.(rejection.file, maxFilesError);
                break;
            default:
                onFileRejected?.(rejection.file, errorMessage);
            }
        });
    }, []);
    const {
        getInputProps,
        getRootProps,
        isDragActive,
        isDragReject,
        isDragAccept,
    } = useDropzone({
        accept,
        maxSize,
        maxFiles,
        onDrop,
    });

    return (
        <div
            data-testid="dropzone"
            className={clsx(classes.root, {
                [classes.dragFile]: isDragActive,
                [classes.dragFileAccept]: isDragAccept,
                [classes.dragFileReject]: isDragReject,
            })}
            {...getRootProps()}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <CloudUploadIcon
                    color="action"
                    className={classes.dropzoneIcon}
                />
                {isDragReject
                    ? <Typography color="error">{typeRejectedError}</Typography>
                    : <Typography color="textSecondary">{label}</Typography>
                }
            </Box>
            <input {...getInputProps()} />
        </div>
    );
}
