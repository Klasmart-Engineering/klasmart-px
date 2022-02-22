import Button from "../Button/Button";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({}));

export interface Props {
    color: string;
    label?: string;
    className?: string;
    onClick: () => void;
}

export default function ResetColorButton (props: Props) {
    const {
        color,
        label = `Default`,
        className,
        onClick,
    } = props;
    const classes = useStyles();
    return (
        <Button
            size="small"
            color={color}
            className={className}
            variant="contained"
            label={label}
            onClick={onClick}
        />
    );
}
