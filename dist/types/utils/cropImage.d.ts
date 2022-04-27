import { Area } from "react-easy-crop/types";
export default function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation?: number): Promise<{
    base64: string;
    blob: Blob;
    file: File;
}>;
