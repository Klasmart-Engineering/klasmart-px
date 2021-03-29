import Loading,
{ useLoadingStyles } from "./Loading";
import {
    Box,
    Button as Btn,
    createStyles,
    makeStyles,
    Tooltip,
    Typography,
    useTheme,
} from "@material-ui/core";
import {
    Palette,
    PaletteColor,
} from "@material-ui/core/styles/createPalette";
import { SvgIconComponent } from "@material-ui/icons";
import clsx from "clsx";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    extendedText: {
        marginLeft: theme.spacing(1),
    },
    rounded: {
        borderRadius: 24,
    },
}));

export interface Props {
    className?: string;
    label: React.ReactNode;
    icon?: SvgIconComponent;
    type?: "submit" | "reset" | "button";
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
    rounded?: boolean;
    fullWidth?: boolean;
    color?: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    disabled?: boolean;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}

export default function Button (props: Props) {
    const {
        className,
        label,
        type,
        variant,
        color,
        disabled,
        tooltip,
        onClick,
        rounded,
        icon: Icon,
        ...rest
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
                className={clsx(className, {
                    [loadingClasses.buttonLoading]: loading,
                    [classes.rounded]: rounded,
                })}
                onClick={handleClick}
                {...rest}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    className={clsx({
                        [loadingClasses.buttonLoadingContent]: loading,
                    })}
                >

                    {Icon && <Icon />}
                    <Typography
                        noWrap
                        variant="inherit"
                        className={clsx({
                            [classes.extendedText]: Icon && label,
                        })}
                    >
                        {label}
                    </Typography>
                </Box>
                {loading && <Loading />}
            </Btn>
        </span>
    </Tooltip>;
}
