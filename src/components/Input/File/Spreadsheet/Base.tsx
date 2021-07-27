import CircularProgress from "../../../Progress/CircularProgress";
import Dropzone from "../Dropzone";
import SelectedFileRow from "../SelectedFileRow";
import { SpreadsheetValidationError } from "./errors";
import PreviewSpreadsheet from "./Preview";
import { Column } from "./types";
import {
    validateData,
    validateFile,
    ValidationLocalization,
} from "./validate";
import ValidationDetails from "./ValidationDetails";
import {
    alpha,
    Box,
    createStyles,
    Divider,
    Fade,
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

export {
    Column,
    SpreadsheetValidationError,
};

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
    previewContainer: {
        display: `flex`,
        width: `100%`,
        height: `100%`,
        position: `relative`,
    },
    uploadInProgress: {
        backgroundColor: alpha(theme.palette.grey[500], 0.65),
        position: `absolute`,
        left: 0,
        top: 0,
        width: `100%`,
        height: `100%`,
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

type SpreadsheetStatus = `pending` | `parsing` | `parsed` | `validating` | `validated` | `uploading` | `uploaded`

export interface Props {
    accept?: string | string[];
    maxFileSize?: number;
    locales?: string | string[];
    dropzoneLabel?: string;
    noItemsLabel?: string;
    removeButtonTooltip?: string;
    uploadButtonTooltip?: string;
    uploadError?: string;
    uploadSuccessMessage?: string;
    typeRejectedError?: string;
    maxFilesError?: string;
    spreadsheetInvalidData?: string;
    allValidationsPassedMessage?: string;
    validationInProgressMessage?: string;
    previewNotAvailableMessage?: string;
    isDryRunEnabled?: boolean;
    columns?: Column[];
    validationLocalization?: ValidationLocalization;
    exceedsMaxSizeError?: (fileSize: number, maxSize: number) => string;
    numValidationsFailedMessage?: (num: number) => string;
    onFileUpload: (file: File, isDryRun: boolean) => Promise<void>;
    onFileUploadError?: (error: any, isDryRun: boolean) => SpreadsheetValidationError[];
}

export default function (props: Props) {
    const {
        accept = `text/csv`,
        maxFileSize,
        locales,
        dropzoneLabel,
        removeButtonTooltip,
        uploadButtonTooltip,
        uploadError,
        uploadSuccessMessage,
        spreadsheetInvalidData = `Spreadsheet has invalid data`,
        allValidationsPassedMessage,
        validationInProgressMessage,
        typeRejectedError,
        maxFilesError,
        previewNotAvailableMessage = `Preview is not available`,
        isDryRunEnabled,
        numValidationsFailedMessage,
        columns,
        validationLocalization,
        exceedsMaxSizeError,
        onFileUpload,
        onFileUploadError,
    } = props;
    const classes = useStyles();
    const [ file, setFile ] = useState<File>();
    const [ fileError, setFileError ] = useState(``);
    const [ dryRunError, setDryRunError ] = useState(``);
    const [ errors, setErrors ] = useState<SpreadsheetValidationError[]>([]);
    const [ status, setStatus ] = useState<SpreadsheetStatus>(`pending`);

    const handleClickUpload = async () => {
        if (!file) return;
        setStatus(`uploading`);
        try {
            await onFileUpload(file, false);
        } catch(err) {
            const errors = onFileUploadError?.(err, false) ?? [];
            setErrors(errors);
            setStatus(`uploaded`);
            throw err;
        }
        setStatus(`uploaded`);
    };

    const dryRun = async () => {
        if (!file) return;
        setStatus(`validating`);
        try {
            await onFileUpload(file, true);
        } catch(err) {
            const errors = onFileUploadError?.(err, true) ?? [];
            setErrors(errors);
            setDryRunError(err?.message);
        }
        setStatus(`validated`);
    };

    const handleClickRemove = () => {
        setFile(undefined);
        setStatus(`pending`);
    };

    const handleFileRejected = (file: File, error: string) => {
        setFileError(error);
        setFile(file);
    };

    useEffect(() => {
        if (file) return;
        setFileError(``);
        setDryRunError(``);
        setErrors([]);
    }, [ file ]);

    useEffect(() => {
        if (isDryRunEnabled && status === `parsed` && !(fileError || errors.length)) {
            dryRun();
        }
    }, [
        isDryRunEnabled,
        status,
        fileError,
        errors,
    ]);

    const handleParsingCsv = (file: File): Promise<string[][]> => new Promise((resolve, reject) => {
        setStatus(`parsing`);
        Papa.parse<string[]>(file, {
            complete: (results) => {
                const { data } = results;
                const fileErr = validateFile(data, validationLocalization);
                if (fileErr) {
                    setFileError(fileErr);
                } else {
                    // File is OK, so we can move onto data level validation
                    setErrors(validateData(data, validationLocalization, columns));
                }
                setStatus(`parsed`);
                resolve(data);
            },
            error: (error) => {
                setStatus(`parsed`);
                reject(error);
            },
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
                    maxSize={maxFileSize}
                    label={dropzoneLabel}
                    typeRejectedError={typeRejectedError}
                    maxFilesError={maxFilesError}
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
                    areActionsDisabled={status === `validating`}
                    error={errors.length ? spreadsheetInvalidData : fileError || dryRunError}
                    onClickRemove={handleClickRemove}
                    onClickUpload={handleClickUpload}
                />
                {!(fileError || status === `pending` || status === `parsing`) && (
                    <>
                        <Divider />
                        <ValidationDetails
                            errors={errors}
                            status={errors.length ? `failed` : status === `validating`? `in-progress`: `passed`}
                            allValidationsPassedMessage={allValidationsPassedMessage}
                            validationInProgressMessage={validationInProgressMessage}
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
                    <Box className={classes.previewContainer}>
                        <PreviewSpreadsheet
                            className={classes.previewFile}
                            file={file}
                            errors={errors}
                            onParseFile={handleParsingCsv}
                        />
                        <Fade in={(status === `uploading` || status === `validating`)}>
                            <div
                                className={classes.uploadInProgress}
                                data-testid="uploading-overlay">
                                <CircularProgress
                                    size={64}
                                    color={`white`}
                                />
                            </div>
                        </Fade>
                    </Box>
                )
            }
        </Box>
    );
}
