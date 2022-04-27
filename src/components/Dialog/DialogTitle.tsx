import {
    Check as CheckIcon,
    Error as ErrorIcon,
    Help as HelpIcon,
    Info as InfoIcon,
    Warning as WarningIcon,
} from "@mui/icons-material";
import {
    Box,
    DialogTitle as Title,
    DialogTitleProps,
    useTheme,
} from "@mui/material";
import {
    Palette,
    PaletteColor,
} from '@mui/material/styles';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => createStyles({
    typeIcon: {
        marginRight: theme.spacing(1),
    },
}));

const typeToIcon = (type?: DialogVariant) => {
    switch (type) {
    case `error`: return ErrorIcon;
    case `info`: return InfoIcon;
    case `success`: return CheckIcon;
    case `warning`: return WarningIcon;
    default: return HelpIcon;
    }
};

export type DialogVariant = Exclude<{ [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette], "primary" | "secondary">

interface Props extends Omit<DialogTitleProps, "title"> {
    title: ReactNode;
    variant?: DialogVariant;
    hideIcon?: boolean;
}

export default function DialogTitle (props: Props) {
    const {
        title,
        variant,
        hideIcon,
        ...rest
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const Icon = typeToIcon(variant);

    return (
        <Title
            style={{
                color: variant ? `white` : undefined,
                backgroundColor: variant ? theme.palette[variant].main : undefined,
            }}
            {...rest}
        >
            {variant && !hideIcon && typeof title === `string`
                ? (
                    <Box
                        display="flex"
                        alignItems="center"
                    >
                        <Icon className={classes.typeIcon} />
                        {title}
                    </Box>
                )
                : title
            }
        </Title>
    );
}
