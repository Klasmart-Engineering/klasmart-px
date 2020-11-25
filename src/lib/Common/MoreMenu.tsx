import {
    createStyles,
    IconButton,
    ListItemIcon,
    makeStyles,
    MenuItem,
    MenuList,
    Popover,
    Theme,
    Typography,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";
import React, {
    cloneElement,
    useState,
} from "react";
import { ActionItem } from "../ContentCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
        menuIconContainer: {
            minWidth: 36,
        },
    }),
);

interface Props {
    actions?: ActionItem[];
}

export default function MoreMenu(props: Props) {
    const { actions } = props;
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <IconButton
            aria-label="More menu button"
            size="small"
            aria-haspopup="true"
            disabled={!actions?.length}
            onClick={handleClick}>
            <MoreVertIcon fontSize="small"/>
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
            <MenuList>
                { actions?.length && actions.map((action, i) =>
                    <MenuItem
                        key={`menu-item-${i}`}
                        onClick={(e) => {if (action.onClick) action.onClick(e); handleClose();}}
                    >
                        <ListItemIcon className={classes.menuIconContainer}>
                            {cloneElement(
                                action.icon,
                                {
                                    fontSize: `small`,
                                },
                            )}
                        </ListItemIcon>
                        <Typography variant="body2">{action.label}</Typography>
                    </MenuItem>,
                )}
            </MenuList>
        </Popover>
    </>;
}