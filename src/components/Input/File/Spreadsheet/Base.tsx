import Dropzone from "../Dropzone";
import SelectedFileRow from "../SelectedFileRow";
import PreviewSpreadsheet from "./Preview";
import ValidationDetails from "./ValidationDetails";
import {
    Box,
    createStyles,
    Divider,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import Papa from "papaparse";
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        height: `100%`,
        width: `100%`,
    },
    dropzoneContainer: {
        height: 400,
        width: `100%`,
    },
    selectedFileContainer: {
        width: `100%`,
        margin: theme.spacing(2),
    },
    previewFile: {
        flex: 1,
    },
    previewNotAvailble: {
        flex: 1,
        width: `100%`,
        backgroundColor: theme.palette.grey[200],
    },
}));

export type AcceptSpreadsheetTypes = ``

export interface SpreadsheetValidtionError {
    row?: number;
    column?: string;
    message: string;
}

export interface Props {
    accept?: string | string[];
    maxSize?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadError?: string;
    uploadSuccessMessage?: string;
    typeRejectedError?: string;
    spreadsheetInvalidData?: string;
    allValidationsPassedMessage?: string;
    previewNotAvailableMessage?: string;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    numValidationsFailedMessage?: (num: number) => string;
    onFileUpload: (file: File) => Promise<void>;
    onFileUploadError?: (error: any) => SpreadsheetValidtionError[];
}

export default function (props: Props) {
    const {
        accept = `text/csv`,
        maxSize,
        locales,
        dropzoneLabel,
        removeButtonTooltip,
        uploadButtonTooltip,
        uploadError,
        uploadSuccessMessage,
        spreadsheetInvalidData = `Spreadsheet has invalid data`,
        allValidationsPassedMessage,
        typeRejectedError,
        previewNotAvailableMessage = `Preview is not available`,
        numValidationsFailedMessage,
        exceedsMaxSizeError,
        onFileUpload,
        onFileUploadError,
    } = props;
    const classes = useStyles();
    const [ file, setFile ] = useState<File>();
    const [ fileError, setFileError ] = useState(``);
    const [ errors, setErrors ] = useState<SpreadsheetValidtionError[]>([]);

    const handleClickUpload = async () => {
        try {
            if (!file) return;
            await onFileUpload(file);
        } catch (err) {
            const errors = onFileUploadError?.(err) ?? [];
            setErrors(errors);
            throw err;
        }
    };

    const handleFileRejected = (file: File, error: string) => {
        setFileError(error);
        setFile(file);
    };

    useEffect(() => {
        if (file) return;
        setFileError(``);
        setErrors([]);
    }, [ file ]);

    const handleParsingCsv = (file: File): Promise<string[][]> => new Promise((resolve, reject) => {
        Papa.parse<string[]>(file, {
            complete: (results) => resolve(results.data),
            error: (error) => reject(error),
        });
    });

    if (!file) return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
            className={classes.root}
        >
            <div className={classes.dropzoneContainer}>
                <Dropzone
                    maxFiles={1}
                    accept={accept}
                    maxSize={maxSize}
                    label={dropzoneLabel}
                    typeRejectedError={typeRejectedError}
                    exceedsMaxSizeError={exceedsMaxSizeError}
                    onFileRejected={handleFileRejected}
                    onFileAdded={setFile}
                />
            </div>
        </Box>
    );

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
            flex="1"
            className={classes.root}
        >
            <Paper className={classes.selectedFileContainer}>
                <SelectedFileRow
                    file={file}
                    locales={locales}
                    uploadSuccessMessage={uploadSuccessMessage}
                    uploadButtonTooltip={uploadButtonTooltip}
                    uploadErrorMessage={uploadError}
                    removeButtonTooltip={removeButtonTooltip}
                    error={errors.length ? spreadsheetInvalidData : fileError}
                    onClickRemove={() => setFile(undefined)}
                    onClickUpload={handleClickUpload}
                />
                {!fileError && (
                    <>
                        <Divider />
                        <ValidationDetails
                            errors={errors}
                            allValidationsPassedMessage={allValidationsPassedMessage}
                            numValidationsFailedMessage={numValidationsFailedMessage}
                        />
                    </>
                )}
            </Paper>
            {fileError
                ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.previewNotAvailble}
                    >
                        <Typography color="textSecondary">{previewNotAvailableMessage}</Typography>
                    </Box>
                )
                : (
                    <PreviewSpreadsheet
                        className={classes.previewFile}
                        file={file}
                        errors={errors}
                        onParseFile={handleParsingCsv}
                    />
                )
            }
        </Box>
    );
}
