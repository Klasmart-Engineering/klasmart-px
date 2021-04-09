import { sleep } from "../../../utils";
import Dropzone from "./Dropzone";
import SelectedFileRow from "./SelectedFileRow";
import {
    createStyles,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    dropzoneContainer: {
        height: 250,
        marginBottom: theme.spacing(3),
    },
    filesContainer: {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `column`,
        flex: 1,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[100],
    },
    noFilesText: {
        margin: theme.spacing(2, 0),
    },
    uploadableItem: {
        marginBottom: theme.spacing(1),
        width: `calc(100% - ${2 * theme.spacing(2)}px)`,
        "&:last-child": {
            marginBottom: 0,
        },
    },
}));

const getRandomString = (length = 8, maxLength = 36) => Math.random().toString(maxLength).substring(length > maxLength ? maxLength : length);

export interface SelectedFile {
    key: string;
    file: File;
    error?: string;
}

export interface Props {
    accept?: string;
    maxSize?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    typeRejectedError?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    onFileUpload: (file: File) => void;
}

export default function FileInput (props: Props) {
    const {
        accept,
        maxSize,
        locales,
        dropzoneLabel,
        noItemsLabel = `No files selected`,
        typeRejectedError,
        exceedsMaxSizeError,
        onFileUpload,
    } = props;
    const classes = useStyles();
    const [ selectedFiles, setSelectedFiles ] = useState<SelectedFile[]>([]);

    const handleFileAdded = (file: File) => {
        const selectedFile = {
            key: getRandomString(),
            file,
        };
        setSelectedFiles((files) => [ ...files, selectedFile ]);
    };

    const handleFileRejected = (file: File, error: string) => {
        const selectedFile = {
            key: getRandomString(),
            file,
            error,
        };
        setSelectedFiles((files) => [ ...files, selectedFile ]);
    };

    const handleFileRemoved = (index: number) => {
        setSelectedFiles((files) => [ ...files.slice(0, index), ...files.slice(index + 1, files.length) ]);
    };

    return (
        <>
            <div className={classes.dropzoneContainer}>
                <Dropzone
                    accept={accept}
                    maxSize={maxSize}
                    label={dropzoneLabel}
                    typeRejectedError={typeRejectedError}
                    exceedsMaxSizeError={exceedsMaxSizeError}
                    onFileRejected={handleFileRejected}
                    onFileAdded={handleFileAdded}
                />
            </div>
            <Paper
                elevation={0}
                className={classes.filesContainer}
            >
                {selectedFiles.length > 0
                    ? selectedFiles.map((selectedFile, i) => (
                        <SelectedFileRow
                            key={selectedFile.key}
                            className={classes.uploadableItem}
                            file={selectedFile.file}
                            error={selectedFile.error}
                            locales={locales}
                            onClickRemove={() => handleFileRemoved(i)}
                            onClickUpload={() => onFileUpload(selectedFile.file)}
                        />
                    ))
                    : <Typography
                        color="textSecondary"
                        className={classes.noFilesText}
                    >
                        {noItemsLabel}
                    </Typography>
                }
            </Paper>
        </>
    );
}
