import ColorClick from "../ColorPicker/ColorClick";
import DefaultColorButton from "../ColorPicker/DefaultButton";
import ColorPickerPopover,
{ Props as ColorPopoverInput } from "../ColorPicker/Popover";
import { Input } from "./shared";
import TextField from "./TextField";
import {
    Box,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import React,
{
    useEffect,
    useState,
} from "react";

const FALLBACK_COLOR = `#fff`;

const useStyles = makeStyles((theme) => createStyles({
    filledTextFieldColorClick: {
        marginTop: theme.spacing(2),
    },
    standardTextFieldDefaultButton: {
        marginBottom: 2,
    },
}));

export interface Props extends Pick<Input, "variant" | "fullWidth" | "onChange" | "onValidate" | "onError" | "hideHelperText">, Pick<ColorPopoverInput, "hideCanvas" | "colors"> {
    value: string | null | undefined;
    label?: string;
    defaultButtonLabel?: string;
    defaultColor?: string;
}

export default function (props: Props) {
    const {
        defaultColor,
        value: color,
        colors = [],
        label = `Color`,
        defaultButtonLabel,
        hideCanvas,
        variant,
        fullWidth,
        hideHelperText,
        onChange,
        onValidate,
        onError,
    } = props;

    const [ color_, setColor ] = useState(color);
    const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleResetClick = () => {
        setColor(``);
    };

    useEffect(() => {
        setColor(color);
    }, [ color ]);

    const classes = useStyles();
    return (
        <>
            <Box onClick={handleClick}>
                <TextField
                    readOnly
                    hideHelperText={hideHelperText}
                    fullWidth={fullWidth}
                    variant={variant}
                    label={label}
                    value={color_}
                    prependInner={(
                        <Box marginRight={1}>
                            <ColorClick
                                color={color_ || defaultColor || FALLBACK_COLOR}
                                className={variant === `filled` ? classes.filledTextFieldColorClick : undefined}
                            />
                        </Box>
                    )}
                    appendInner={(defaultColor && color_ && color_ !== defaultColor) && (
                        <DefaultColorButton
                            label={defaultButtonLabel}
                            color={defaultColor}
                            className={classes.standardTextFieldDefaultButton}
                            onClick={handleResetClick}
                        />
                    )}
                    onChange={onChange}
                    onValidate={onValidate}
                    onError={onError}
                />
            </Box>
            <ColorPickerPopover
                open={open}
                anchorEl={anchorEl}
                color={color_ || defaultColor || FALLBACK_COLOR}
                hideCanvas={hideCanvas}
                colors={colors}
                onChange={setColor}
                onClose={handleClose}
            />
        </>
    );
}
