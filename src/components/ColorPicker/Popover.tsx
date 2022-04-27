import ColorSwatches from "../ColorPicker/ColorSwatches";
import SaturationPicker from "../ColorPicker/SaturationPicker";
import { Popover } from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';

const POPOVER_WIDTH = 216;

const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: POPOVER_WIDTH,
        overflow: `hidden`,
    },
    swatchesAddon: {
        paddingTop: 0,
    },
}));

export interface Props {
    open: boolean;
    anchorEl: HTMLDivElement | null;
    hideCanvas?: boolean;
    color?: string;
    colors?: string[];
    onChange: (color: string) => void;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function (props: Props) {
    const {
        open,
        anchorEl,
        color,
        colors = [],
        hideCanvas,
        onChange,
        onClose,
    } = props;
    const classes = useStyles();

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: `bottom`,
                horizontal: `left`,
            }}
            transformOrigin={{
                vertical: `top`,
                horizontal: `left`,
            }}
            onClose={onClose}
        >
            <div className={classes.root}>
                {!hideCanvas && (
                    <SaturationPicker
                        width={POPOVER_WIDTH}
                        color={color}
                        onChange={onChange}
                    />
                )}
                {colors.length > 0 && (
                    <ColorSwatches
                        className={!hideCanvas ? classes.swatchesAddon : undefined}
                        selectedColor={color}
                        colors={colors}
                        onClick={onChange}
                    />
                )}
            </div>
        </Popover>
    );
}
