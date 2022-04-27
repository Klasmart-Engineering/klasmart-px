/// <reference types="react" />
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
export default function ImagePicker(props: Props): JSX.Element;
