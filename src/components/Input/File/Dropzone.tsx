import Item from "./Item";
import {
    Box,
    createStyles,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import React,
{ useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23${theme.palette.primary.main.slice(1)}' stroke-width='6' stroke-dasharray='32%2c 32' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");`,
        transition: `background-color 0.4s ease-out`,
        "&:focus": {
            outline: `none`,
            backgroundColor: theme.palette.grey[300],
        },
    },
    dropzoneIcon: {
        fontSize: 96,
    },
}));

export interface Props {
    dropzoneLabel?: string;
    dropzoneLabelError?: string;
}

export default function (props: Props) {
    const { dropzoneLabel = `Drag and drop some files here, or click to select files`, dropzoneLabelError = `Something went wrong` } = props;
    const classes = useStyles();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log(`file reading was aborted`);
            reader.onerror = () => console.log(`file reading has failed`);
            reader.onload = () => {
                const binaryStr = reader.result;
                console.log(binaryStr);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);
    const {
        getInputProps,
        getRootProps,
        isDragReject,
        isDragActive,
    } = useDropzone({
        onDrop,
        onDragOver: () => {
            console.log(`onDragEnter`);
        },
        onDropAccepted: () => {
            console.log(`onDropAccepted`);
        },
        onDropRejected: () => {
            console.log(`onDropRejected`);
        },
    });
    console.log(`isDragReject`, isDragReject);

    return (
        <>
            <div style={{
                height: 400,
            }}>
                <div
                    className={classes.root}
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
                            ? <Typography color="error">{dropzoneLabelError}</Typography>
                            : <Typography color="textSecondary">{dropzoneLabel}</Typography>
                        }
                        <input {...getInputProps()} />
                    </Box>
                </div>
            </div>

            <Item />
        </>
    );
}
