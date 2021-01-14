import React,
{ useState } from "react";
import {
    Box,
    createStyles,
    IconButton,
    makeStyles,
    TextField,
    Theme,
    Tooltip,
} from "@material-ui/core";
import {
    Clear as ClearIcon,
    Search as SearchIcon,
} from "@material-ui/icons";
import { debounce } from "lodash";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);

const debouncedOnChange = debounce((value, onChange) => onChange(value), 100);

export interface SearchLocalization {
    placeholder?: string;
    clear?: string;
}

interface Props {
    value: string;
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
    const [ value_, setValue ] = useState(value);

    const handleOnChange = (value: string) => {
        setValue(value);
        debouncedOnChange(value, onChange);
    };

    return (
        <div className={classes.root}>
            <TextField
                fullWidth
                className={classes.textField}
                placeholder={localization?.placeholder ?? `Search`}
                value={value_}
                onChange={(e) => handleOnChange(e.currentTarget.value)}
            />
            <Box className={classes.iconRowContainer}>
                <div className={classes.iconContainer}>
                    <SearchIcon color="action" />
                </div>
                {value_ &&
                    <Tooltip title={localization?.clear ?? `Clear search`}>
                        <IconButton
                            className={classes.actionIcon}
                            onClick={() => handleOnChange(``)}
                        >
                            <ClearIcon color="action" />
                        </IconButton>
                    </Tooltip>
                }
            </Box>
        </div>
    );
}
