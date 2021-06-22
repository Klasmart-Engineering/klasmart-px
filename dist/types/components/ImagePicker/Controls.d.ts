/// <reference types="react" />
export interface Props {
    zoom: number;
    rotation: number;
    isZoomDisabled: boolean;
    isRotationDisabled: boolean;
    zoomLabel: string;
    rotateLabel: string;
    onZoomChange: (zoom: number) => void;
    onRotationChange: (rotation: number) => void;
}
export default function Controls(props: Props): JSX.Element;
