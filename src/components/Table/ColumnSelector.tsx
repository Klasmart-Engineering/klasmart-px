import {
    Checkbox,
    createStyles,
    Divider,
    fade,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    makeStyles,
    Popover,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import {
    Add as AddIcon,
    Lock as LockIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React, {
    Fragment,
    useState,
} from "react";
import { TableColumn } from "./Head";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
        toolbar: {
            paddingTop: 0,
            paddingBottom: 0,
            minHeight: 56,
            backgroundColor: theme.palette.type === `light` ? fade(`#000000`, 0.04) : fade(`#FFFFFF`, 0.08),
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
        },
        persistentText: {
            color: theme.palette.grey[600],
        },
        persistentIcon: {
            color: theme.palette.grey[400],
        },
    }),
);

export interface ColumnSelectorLocalization {
    addButton?: string;
    listTitle?: string;
}

interface Props<T> {
    columns: TableColumn<T>[];
    selected: (keyof T)[];
    localization?: ColumnSelectorLocalization;
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
}

export default function BaseTableColumnSelector<T>(props: Props<T>) {
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

    return <>
        <Tooltip title={localization?.addButton ?? `Add columns`}>
            <IconButton
                aria-label={localization?.addButton ?? `Add columns`}
                aria-haspopup="true"
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
                horizontal: `left`,
            }}
            transformOrigin={{
                vertical: `top`,
                horizontal: `left`,
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
                <Divider />
                {columns.map((column, i) =>
                    <Fragment key={`list-item-${i}`}>
                        {i !== 0 && <Divider />}
                        <ListItem
                            className={classes.columnItemContainer}
                            onClick={!column.persistent ? (e) => onColumnChange(e, column.id) : undefined}
                        >
                            <Checkbox
                                role="checkbox"
                                checked={isSelected(column.id)}
                                disabled={column.persistent}
                            />
                            <Typography
                                variant="body2"
                                className={clsx({
                                    [classes.persistentText]: column.persistent,
                                })}
                            >
                                {column.label}
                            </Typography>
                            {column.persistent &&
                                <ListItemSecondaryAction>
                                    <LockIcon
                                        className={classes.persistentIcon}
                                        fontSize="small"
                                    />
                                </ListItemSecondaryAction>
                            }
                        </ListItem>
                    </Fragment>,
                )}
            </List>
        </Popover>
    </>;
}