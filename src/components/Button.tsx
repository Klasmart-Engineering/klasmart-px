import ButtonLoading, { useLoadingStyles } from "./ButtonLoading";
import {
    Button as Btn,
    createStyles,
    makeStyles,
    Tooltip,
    useTheme,
} from "@material-ui/core";
import {
    Palette,
    PaletteColor,
} from "@material-ui/core/styles/createPalette";
import clsx from "clsx";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

interface Props {
    label: React.ReactNode;
    type?: "submit" | "reset" | "button";
    variant?: "text" | "outlined" | "contained";
    color?: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    disabled?: boolean;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}

export default function Button (props: Props) {
    const {
        label,
        type,
        variant,
        color,
        disabled,
        tooltip,
        onClick,
    } = props;
    const classes = useStyles();
    const loadingClasses = useLoadingStyles();
    const theme = useTheme();
    const [ loading, setLoading ] = useState(false);

    const textColor = color ? theme.palette[color][ variant === `contained` ? `contrastText` : `main` ] : undefined;
    const backgroundColor = (color && variant === `contained`) ? theme.palette[color].main : undefined;

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        let error;
        try {
            await onClick?.(event);
        } catch (err) {
            error = err;
        }
        setLoading(false);
        if (error) throw error;
    };

    return <Tooltip title={tooltip ?? ``}>
        <span>
            <Btn
                variant={variant}
                type={type}
                style={{
                    color: !disabled ? textColor : undefined,
                    backgroundColor: !disabled ? backgroundColor : undefined,
                }}
                disabled={disabled}
                className={clsx({
                    [loadingClasses.buttonLoading]: loading,
                })}
                onClick={handleClick}
            >
                <span
                    className={clsx({
                        [loadingClasses.buttonLoadingContent]: loading,
                    })}
                >
                    {label}
                </span>
                {loading && <ButtonLoading />}
            </Btn>
        </span>
    </Tooltip>;
}
