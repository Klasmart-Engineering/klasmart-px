import { useWidth } from "../../utils/layout";
import CircularProgress from "../Progress/CircularProgress";
import { useButtonLoadingStyles } from "../Progress/utils";
import { SvgIconComponent } from "@mui/icons-material";
import {
    Box,
    Fab as FabButton,
    FabProps,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    Breakpoint,
    Palette,
    PaletteColor,
    useTheme,
} from "@mui/material/styles";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    extendedText: {
        marginLeft: theme.spacing(1),
    },
}));

interface Props {
    className?: string;
    icon?: SvgIconComponent;
    responsiveExtended?: Breakpoint[];
    color?: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    disabled?: boolean;
    label?: string;
    tooltip?: string;
    variant?: FabProps["variant"];
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}

export default function Fab (props: Props) {
    const {
        icon: Icon,
        label,
        color,
        disabled,
        variant,
        responsiveExtended,
        tooltip,
        onClick,
        className,
    } = props;

    const classes = useStyles();
    const loadingClasses = useButtonLoadingStyles();
    const theme = useTheme();
    const breakpoint = useWidth();
    const [ loading, setLoading ] = useState(false);

    const textColor_ = (color && !disabled) ? (theme.palette[color].main !== theme.palette[color].contrastText ? theme.palette[color].contrastText : `white`) : undefined;
    const variant_ = variant ?? ((responsiveExtended?.includes(breakpoint)) ? `extended` : `circular`);
    const tooltip_ = tooltip ?? (variant_ === `circular` ? (label ?? ``) : ``);

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

    return (
        <Tooltip title={tooltip_}>
            <span>
                <FabButton
                    variant={variant_}
                    disabled={disabled}
                    className={clsx(className, {
                        [loadingClasses.buttonLoading]: loading,
                    })}
                    style={{
                        backgroundColor: (color && !disabled) ? theme.palette[color].main : undefined,
                        color: !disabled ? textColor_ : undefined,
                    }}
                    onClick={handleClick}
                >
                    {variant_ === `extended`
                        ? (
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
                                    variant="button"
                                    className={clsx({
                                        [classes.extendedText]: Icon && label,
                                    })}
                                >
                                    {label}
                                </Typography>
                            </Box>
                        )
                        : Icon
                            ? (
                                <Icon
                                    className={clsx({
                                        [loadingClasses.buttonLoadingContent]: loading,
                                    })}
                                />
                            )
                            : <span />
                    }
                    {loading && <CircularProgress />}
                </FabButton>
            </span>
        </Tooltip>
    );
}
