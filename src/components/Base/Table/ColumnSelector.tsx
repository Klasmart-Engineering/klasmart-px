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
import { HeadCell } from "./Head";

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

interface Props<T> {
    headCells: HeadCell<T>[];
    selected: (keyof T)[];
    onColumnChange: (event: React.MouseEvent<unknown>, columnId: keyof T) => void;
}

export default function BaseTableColumnSelector<T>(props: Props<T>) {
    const {
        headCells,
        selected,
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
        <IconButton
            aria-label="Column select button"
            aria-haspopup="true"
            onClick={handleClick}>
            <AddIcon />
        </IconButton>
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
                    Select columns
                </Typography>
            </Toolbar>
            <List className={classes.list}>
                <Divider />
                {headCells.map((headCell, i) =>
                    <Fragment key={`list-item-${i}`}>
                        {i !== 0 && <Divider />}
                        <ListItem
                            className={classes.columnItemContainer}
                            onClick={!headCell.persistent ? (e) => onColumnChange(e, headCell.id) : undefined}
                        >
                            <Checkbox
                                role="checkbox"
                                checked={isSelected(headCell.id)}
                                disabled={headCell.persistent}
                            />
                            <Typography
                                variant="body2"
                                className={clsx({
                                    [classes.persistentText]: headCell.persistent,
                                })}
                            >
                                {headCell.label}
                            </Typography>
                            {headCell.persistent &&
                                <ListItemSecondaryAction>
                                    <LockIcon
                                        className={classes.persistentIcon}
                                        fontSize="small" />
                                </ListItemSecondaryAction>
                            }
                        </ListItem>
                    </Fragment>,
                )}
            </List>
        </Popover>
    </>;
}