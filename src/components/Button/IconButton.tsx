import { useIsMounted } from "../../hooks";
import {
    ActionColor,
    BaseColor,
    CommonColor,
    StatusColor,
    ThemeColor,
} from "../../types/colors";
import CircularProgress from "../Progress/CircularProgress";
import { useButtonLoadingStyles } from "../Progress/utils";
import { SvgIconComponent } from "@mui/icons-material";
import {
    IconButton as IconBtn,
    Theme,
    Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    tooltip: {
        display: `flex`,
    },
}));

type IconButtonColor = BaseColor | CommonColor | ThemeColor | StatusColor | ActionColor | undefined;

const buildStyling = (color: IconButtonColor, theme: Theme) => {
    switch(color) {
    case `action`: return {
        style: {
            color: theme.palette.action.active,
        },
    };
    case `disabled`: return {
        style: {
            color: theme.palette.action.disabled,
        },
    };
    case `white`: return {
        style: {
            color: theme.palette.common.white,
        },
    };
    case `black`: return {
        style: {
            color: theme.palette.common.black,
        },
    };
    case `info`: return {
        style: {
            color: theme.palette.info.main,
        },
    };
    case `success`: return {
        style: {
            color: theme.palette.success.main,
        },
    };
    case `warning`: return {
        style: {
            color: theme.palette.warning.main,
        },
    };
    case `error`: return {
        style: {
            color: theme.palette.error.main,
        },
    };
    default: return {
        color,
    };
    }
};

export interface Props {
    className?: string;
    icon: SvgIconComponent;
    iconSize?: `inherit` | `medium` | `small` | `large`;
    size?: "small" | "medium";
    tooltip?: string;
    disabled?: boolean;
    color?: IconButtonColor;
    "data-testid"?: string;
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
        "data-testid": dataTestId,
    } = props;
    const classes = useStyles();
    const loadingClasses = useButtonLoadingStyles();
    const [ loading, setLoading ] = useState(false);
    const theme = useTheme();
    const isMounted = useIsMounted();

    const styling = buildStyling(color, theme);

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
                    size={size}
                    data-testid={dataTestId}
                    onClick={handleClick}
                    {...styling}
                >
                    <Icon
                        fontSize={iconSize}
                        className={clsx({
                            [loadingClasses.buttonLoadingContent]: loading,
                        })}
                    />
                    {loading && <CircularProgress />}
                </IconBtn>
            </span>
        </Tooltip>
    );
}
