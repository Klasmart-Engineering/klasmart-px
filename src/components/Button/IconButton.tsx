import Loading, { useLoadingStyles } from "./Loading";
import {
    createStyles,
    IconButton as IconBtn,
    makeStyles,
    Tooltip,
    useTheme,
} from "@material-ui/core";
import {
    Palette,
    PaletteColor,
} from "@material-ui/core/styles/createPalette";
import { SvgIconComponent } from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

interface Props {
    className?: string;
    icon: SvgIconComponent;
    tooltip?: string;
    disabled?: boolean;
    color?: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}

export default function IconButton (props: Props) {
    const {
        icon: Icon,
        tooltip,
        disabled,
        color,
        onClick,
        className,
    } = props;
    const classes = useStyles();
    const loadingClasses = useLoadingStyles();
    const [ loading, setLoading ] = useState(false);
    const theme = useTheme();

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
            <IconBtn
                disabled={disabled}
                className={clsx(className, {
                    [loadingClasses.buttonLoading]: loading,
                })}
                style={{
                    color: (color && !disabled) ? theme.palette[color].main : undefined,
                }}
                onClick={handleClick}
            >
                <Icon className={clsx({
                    [loadingClasses.buttonLoadingContent]: loading,
                })} />
                {loading && <Loading />}
            </IconBtn>
        </span>
    </Tooltip>;
}
