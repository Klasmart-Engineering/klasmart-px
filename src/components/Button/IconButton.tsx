import { useIsMounted } from "../../hooks";
import CircularProgress from "../Progress/CircularProgress";
import { useButtonLoadingStyles } from "../Progress/utils";
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
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    tooltip: {
        display: `flex`,
    },
}));

interface Props {
    className?: string;
    icon: SvgIconComponent;
    iconSize?: `inherit` | `default` | `small` | `large`;
    size?: "small" | "medium";
    tooltip?: string;
    disabled?: boolean;
    color?: { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette];
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}

export default function IconButton (props: Props) {
    const {
        icon: Icon,
        iconSize,
        tooltip,
        disabled,
        color,
        onClick,
        className,
        size,
    } = props;
    const classes = useStyles();
    const loadingClasses = useButtonLoadingStyles();
    const [ loading, setLoading ] = useState(false);
    const theme = useTheme();
    const isMounted = useIsMounted();

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        let error;
        try {
            await onClick?.(event);
        } catch (err) {
            error = err;
        }
        if (isMounted()) {setLoading(false);}
        if (error) throw error;
    };

    return (
        <Tooltip title={tooltip ?? ``}>
            <span className={classes.tooltip}>
                <IconBtn
                    disabled={disabled}
                    className={clsx(className, {
                        [loadingClasses.buttonLoading]: loading,
                    })}
                    style={{
                        color: (color && !disabled) ? theme.palette[color].main : undefined,
                    }}
                    size={size}
                    onClick={handleClick}
                >
                    <Icon
                        fontSize={iconSize}
                        className={clsx({
                            [loadingClasses.buttonLoadingContent]: loading,
                        })} />
                    {loading && <CircularProgress />}
                </IconBtn>
            </span>
        </Tooltip>
    );
}
