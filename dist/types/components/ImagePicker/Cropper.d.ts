/// <reference types="react" />
import { Area } from "react-easy-crop/types";
export interface Props {
    img: string;
    zoom: number;
    rotation: number;
    aspect: number;
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}
export default function ImageCropper(props: Props): JSX.Element;
