
import IconButton from "../../Button/IconButton";
import {
    Clear as ClearIcon,
    Search as SearchIcon,
} from "@mui/icons-material";
import {
    Box,
    TextField,
    Theme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React,
{
    useEffect,
    useState,
} from "react";
import { useDebounce } from "use-debounce";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: 53,
        position: `relative`,
    },
    textField: {
        height: `100%`,
        "& .MuiInput-underline:before": {
            display: `none`,
        },
        "& .MuiInput-underline:after": {
            display: `none`,
        },
        "& .MuiInputBase-root": {
            height: `inherit`,
        },
        "& input": {
            height: `inherit`,
            padding: 0,
            margin: theme.spacing(0, 8),
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: `none`,
        },
    },
    iconRowContainer: {
        height: `100%`,
        position: `absolute`,
        left: 0,
        top: 0,
        padding: theme.spacing(0, 0.5),
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        width: `100%`,
        pointerEvents: `none`,
        alignItems: `center`,
    },
    iconContainer: {
        padding: theme.spacing(0, 1.5),
        height: theme.spacing(3),
        color: theme.palette.grey[600],
    },
    actionIcon: {
        pointerEvents: `auto`,
    },
}));

const DEBOUNCE_DELAY = 300;

export interface SearchLocalization {
    placeholder?: string;
    clear?: string;
}

interface Props {
    value?: string;
    localization?: SearchLocalization;
    onChange: (value: string) => void;
}

export default function BaseTableSearch (props: Props) {
    const {
        value,
        localization,
        onChange,
    } = props;
    const classes = useStyles();
    const [ value_, setValue ] = useState(value ?? ``);
    const [ debouncedValue ] = useDebounce(value_, DEBOUNCE_DELAY);

    useEffect(() => {
        onChange(debouncedValue);
    }, [ debouncedValue ]);

    const handleOnChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className={classes.root}>
            <TextField
                fullWidth
                variant="standard"
                className={classes.textField}
                placeholder={localization?.placeholder ?? `Search`}
                value={value_}
                onChange={(e) => handleOnChange(e.currentTarget.value)}
            />
            <Box className={classes.iconRowContainer}>
                <div className={classes.iconContainer}>
                    <SearchIcon color="action" />
                </div>
                {value_ && (
                    <IconButton
                        className={classes.actionIcon}
                        icon={ClearIcon}
                        tooltip={localization?.clear ?? `Clear search`}
                        size="medium"
                        onClick={() => handleOnChange(``)}
                    />
                )}
            </Box>
        </div>
    );
}
