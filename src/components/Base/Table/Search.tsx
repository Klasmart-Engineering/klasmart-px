import React from "react";
import {
    Box,
    createStyles,
    IconButton,
    makeStyles,
    TextField,
    Theme,
} from "@material-ui/core";
import {
    Clear as ClearIcon,
    Search as SearchIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 53,
            position: `relative`,
            borderBottom: `1px solid rgba(224, 224, 224, 1)`,
            borderTop: `1px solid rgba(224, 224, 224, 1)`,
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

interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function BaseTableSearch (props: Props) {
    const {
        value,
        setValue,
    } = props;
    const classes = useStyles();
    // const debouncedSetValue = debounce((value) => setValue(value), debounceThreshold);

    return (
        <div className={classes.root}>
            <TextField
                fullWidth
                className={classes.textField}
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            <Box className={classes.iconRowContainer}>
                <div className={classes.iconContainer}>
                    <SearchIcon  />
                </div>
                {value &&
                    <IconButton
                        className={classes.actionIcon}
                        onClick={() => setValue(``)}
                    >
                        <ClearIcon />
                    </IconButton>
                }
            </Box>
        </div>
    );
}