import getCroppedImg from '../../utils/cropImage';
import BaseDialog from '../Dialog';
import Controls from './Controls';
import ImageCropper from './Cropper';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React,
{
    useCallback,
    useEffect,
    useState,
} from "react";
import { Area } from "react-easy-crop/types";

const useStyles = makeStyles((theme) => createStyles({
    noPaddingDialog: {
        padding: `0`,
    },
}));

export interface CroppedImage {
    base64: string;
    blob: Blob;
    file: File;
}

export interface Props {
    imageToBeCropped: string;
    isZoomDisabled: boolean;
    isRotationDisabled: boolean;
    dialogTitle: string;
    isCropperOpen: boolean;
    zoomLabel: string;
    rotateLabel: string;
    aspect: number;
    cancelLabel: string;
    okLabel: string;
    onCancelCrop: () => void;
    onImageCropComplete: (image: CroppedImage) => void;
    onError: (error: string) => void;
}

export default function ImagePicker (props: Props) {
    const {
        isZoomDisabled,
        isRotationDisabled,
        imageToBeCropped,
        dialogTitle = `Adjust Image`,
        isCropperOpen,
        zoomLabel,
        rotateLabel,
        aspect,
        cancelLabel = `Cancel`,
        okLabel = `OK`,
        onCancelCrop,
        onImageCropComplete,
        onError,
    } = props;

    const [ rotation, setRotation ] = useState(0);
    const [ zoom, setZoom ] = useState(1);
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState<Area>({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const [ dialogOpen, setDialogOpen ] = useState(isCropperOpen);
    const classes = useStyles();

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const getCroppedImage = useCallback(async () => {
        try {
            const croppedImages = await getCroppedImg(imageToBeCropped, croppedAreaPixels, rotation);
            setDialogOpen(false);
            return croppedImages;
        } catch (e: any) {
            onError(e);
        }
    }, [ croppedAreaPixels ]);

    const handleOnImageCropComplete = async () => {
        const croppedImageStrings = await getCroppedImage();
        if (croppedImageStrings) return onImageCropComplete(croppedImageStrings);
    };

    const onZoomChange = (zoomChange: number) => {
        if (isZoomDisabled) return;
        setZoom(zoomChange);
    };

    const onRotationChange = (rotationChange: number) => {
        if (isRotationDisabled) return;
        setRotation(rotationChange);
    };

    useEffect(() => {
        setDialogOpen(isCropperOpen);
    }, [ isCropperOpen ]);

    return (
        <BaseDialog
            open={dialogOpen}
            title={dialogTitle}
            actions={[
                {
                    label: cancelLabel,
                    disabled: false,
                    color: `primary`,
                    onClick: onCancelCrop,
                },
                {
                    label: okLabel,
                    disabled: false,
                    color: `primary`,
                    onClick: handleOnImageCropComplete,
                },
            ]}
            contentClassName={classes.noPaddingDialog}
            onClose={onCancelCrop}
            onBackdropClick={onCancelCrop}
        >
            <ImageCropper
                img={imageToBeCropped}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropComplete={onCropComplete}
            />
            {(!isZoomDisabled || !isRotationDisabled) && (
                <Controls
                    zoom={zoom}
                    rotation={rotation}
                    isZoomDisabled={isZoomDisabled}
                    isRotationDisabled={isRotationDisabled}
                    zoomLabel={zoomLabel}
                    rotateLabel={rotateLabel}
                    onZoomChange={onZoomChange}
                    onRotationChange={onRotationChange}
                />
            )}
        </BaseDialog>
    );
}
