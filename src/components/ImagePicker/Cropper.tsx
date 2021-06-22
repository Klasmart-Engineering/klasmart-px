import {
    createStyles,
    makeStyles,
} from "@material-ui/core";
import React,
{ useState } from "react";
import Cropper from "react-easy-crop";
import {
    Area,
    Point,
} from "react-easy-crop/types";

const useStyles = makeStyles((theme) => createStyles({
    cropContainer: {
        position: `relative`,
        height: 400,
    },
}));

export interface Props {
    img: string;
    zoom: number;
    rotation: number;
    aspect: number;
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

export default function ImageCropper (props: Props) {
    const [ crop, setCrop ] = useState<Point>({
        x: 0,
        y: 0,
    });
    const classes = useStyles();

    const {
        img,
        zoom,
        rotation,
        aspect = 4 / 3,
        onCropComplete,
    } = props;

    return (
        <div className={classes.cropContainer}>
            <Cropper
                image={img}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
            />
        </div>
    );
}
