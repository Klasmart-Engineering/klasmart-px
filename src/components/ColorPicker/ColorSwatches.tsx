import ColorClick from "./ColorClick";
import { Grid } from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        padding: theme.spacing(2),
    },
}));

interface Props {
    colors: string[];
    selectedColor?: string;
    className?: string;
    onClick: (color: string) => void;
}

export default function ColorSwatches (props: Props) {
    const {
        selectedColor,
        colors,
        className,
        onClick,
    } = props;
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={1}
            className={clsx(classes.root, className)}
        >
            {colors.map((color, i) => (
                <Grid
                    key={`color-${i}`}
                    item
                >
                    <ColorClick
                        color={color}
                        isSelected={color === selectedColor}
                        onClick={onClick}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
