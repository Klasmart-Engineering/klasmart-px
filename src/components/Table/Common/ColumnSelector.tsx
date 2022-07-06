
import Checkbox from "../../Checkbox";
import { TableColumn } from "./Head";
import {
    Add as AddIcon,
    Lock as LockIcon,
} from "@mui/icons-material";
import {
    alpha,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    Popover,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React, {
    Fragment,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles ({
    toolbar: {
        paddingTop: 0,
        paddingBottom: 0,
        height: 40,
        minHeight: 40,
        backgroundColor: alpha(`#000000`, 0.04),
    },
    title: {
        fontWeight: 600,
    },
    list: {
        paddingTop: 0,
    },
    columnItemContainer: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
    },
    persistentText: {
        color: theme.palette.grey[600],
    },
    persistentIcon: {
        color: theme.palette.grey[400],
    },
}));

export interface ColumnSelectorLocalization {
    addButton?: string;
    listTitle?: string;
}

interface Props<T> {
    columns: TableColumn<T>[];
    selected: (keyof T)[];
    localization?: ColumnSelectorLocalization;
    onColumnChange: (columnId: Extract<keyof T, string>) => void;
}

export default function BaseTableColumnSelector<T> (props: Props<T>) {
    const {
        columns,
        selected,
        localization,
        onColumnChange,
    } = props;
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isSelected = (column: keyof T) => selected.indexOf(column) !== -1;

    return (
        <>
            <Tooltip title={localization?.addButton ?? `Add columns`}>
                <IconButton
                    aria-label={localization?.addButton ?? `Add columns`}
                    aria-haspopup="true"
                    size="medium"
                    onClick={handleClick}
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Popover
                keepMounted
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{
                    vertical: `bottom`,
                    horizontal: `right`,
                }}
                transformOrigin={{
                    vertical: `top`,
                    horizontal: `right`,
                }}
                PaperProps={{
                    variant: `outlined`,
                }}
                onClose={handleClose}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography
                        variant="body2"
                        className={classes.title}
                    >
                        {localization?.listTitle ?? `Select columns`}
                    </Typography>
                </Toolbar>
                <List className={classes.list}>
                    {columns.filter((column) => !column.secret)
                        .map((column, i) => (
                            <Fragment key={`list-item-${i}`}>
                                <Divider />
                                <ListItem className={classes.columnItemContainer}>
                                    <Checkbox
                                        role="checkbox"
                                        label={column.persistent
                                            ? (
                                                <>
                                                    {column.label}
                                                    <ListItemSecondaryAction>
                                                        <LockIcon
                                                            className={classes.persistentIcon}
                                                            fontSize="small"
                                                        />
                                                    </ListItemSecondaryAction>
                                                </>
                                            )
                                            : column.label
                                        }
                                        checked={isSelected(column.id)}
                                        disabled={column.persistent}
                                        onClick={!column.persistent ? () => onColumnChange(column.id) : undefined}
                                    />
                                </ListItem>
                            </Fragment>
                        ))}
                </List>
            </Popover>
        </>);
}
