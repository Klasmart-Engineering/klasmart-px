import {
    createStyles,
    lighten,
    makeStyles,
    Slider,
} from "@material-ui/core";
import CropRotateIcon from '@material-ui/icons/CropRotate';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import clsx from "clsx";
import React,
{
    ReactNode,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    controls: {
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
        color: theme.palette.grey[600],
        display: `flex`,
        alignItems: `stretch`,
        justifyContent: `center`,
        flexDirection: `column`,
        padding: theme.spacing(1, 0),
    },
    control: {
        display: `flex`,
        flex: 1,
        padding: theme.spacing(0, 3),
    },
    slider: {
        color: theme.palette.primary.main,
    },
    actionButtons: {
        display: `flex`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-evenly`,
    },
    actionButtonActive: {
        color: theme.palette.primary.main,
    },
    actionButton: {
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `space-between`,
        "&:hover": {
            cursor: `pointer`,
        },
    },
}));

enum EditImageActionType {
    ROTATE = `Rotate`,
    ZOOM = `Zoom`
}

interface EditImageAction {
    label: string;
    icon: ReactNode;
    control: ReactNode;
    onClick: () => void;
}

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

export default function Controls(props: Props) {
    const {
        zoom,
        rotation,
        isZoomDisabled,
        isRotationDisabled,
        zoomLabel = `Zoom`,
        rotateLabel = `Rotate`,
        onZoomChange,
        onRotationChange,
    } = props;

    const [ editImageAction, selectEditImageAction ] = useState(isZoomDisabled ? EditImageActionType.ROTATE : EditImageActionType.ZOOM);
    const classes = useStyles();
    const zoomMarks = [
        {
            value: 1,
            label: `1x`,
        },
        {
            value: 2,
            label: `2x`,
        },
        {
            value: 3,
            label: `3x`,
        },
    ];
    const rotationMarks = [
        {
            value: -180,
            label: `-180°`,
        },
        {
            value: 0,
            label: `0°`,
        },
        {
            value: 180,
            label: `180°`,
        },
    ];

    const actions: EditImageAction[] = [
        ...!isZoomDisabled
            ? [
                {
                    label: zoomLabel,
                    icon: <PhotoSizeSelectLargeIcon />,
                    control: (
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            marks={zoomMarks}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}x`}
                            aria-labelledby={editImageAction}
                            classes={{
                                root: classes.slider,
                            }}
                            onChange={(e, zoom) => onZoomChange(Number(zoom))}
                        />
                    ),
                    onClick: () => selectEditImageAction(EditImageActionType.ZOOM),
                },
            ] : [],
        ...!isRotationDisabled
            ? [
                {
                    label: rotateLabel,
                    icon: <CropRotateIcon />,
                    control: (
                        <Slider
                            value={rotation}
                            min={-180}
                            max={180}
                            step={1}
                            marks={rotationMarks}
                            track={false}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}°`}
                            aria-labelledby={editImageAction}
                            classes={{
                                root: classes.slider,
                            }}
                            onChange={(e, rotation) => onRotationChange(Number(rotation))}
                        />
                    ),
                    onClick: () => selectEditImageAction(EditImageActionType.ROTATE),
                },
            ] : [],
    ];

    return (
        <div className={classes.controls}>
            <div className={classes.control}>
                {actions.find((action) => editImageAction === action.label)?.control}
            </div>
            {actions.length > 1 && (
                <div className={classes.actionButtons}>
                    {actions.map((action: EditImageAction) => (
                        <div
                            key={action.label}
                            className={clsx(classes.actionButton, {
                                [classes.actionButtonActive]: editImageAction === action.label,
                            })}
                            onClick={action.onClick}
                        >
                            {action.icon}
                            {action.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
