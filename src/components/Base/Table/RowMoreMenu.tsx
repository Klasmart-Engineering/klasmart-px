import {
    createStyles,
    IconButton,
    ListItemIcon,
    makeStyles,
    MenuItem,
    MenuList,
    Popover,
    SvgIconProps,
    Theme,
    Typography,
} from "@material-ui/core";
import { MoreVert as MoreVertIcon } from "@material-ui/icons";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({}),
);

export interface RowAction<T> {
    label: string;
    icon?: React.ReactElement<SvgIconProps>;
    onClick: ((event: React.MouseEvent<HTMLElement>, item: T) => void);
}

interface Props<T> {
  actions: RowAction<T>[];
  item: T;
}

export default function BaseTableRowMoreMenu<T>(props: Props<T>) {
    const {
        actions,
        item,
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

    return <>
        <IconButton
            aria-label="More menu button"
            aria-haspopup="true"
            onClick={handleClick}>
            <MoreVertIcon />
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
                        onClick={(e) => {
                            action.onClick(e, item);
                            handleClose();
                        }}
                    >
                        {action.icon &&
                            <ListItemIcon>
                                {action.icon}
                            </ListItemIcon>
                        }
                        <Typography variant="body2">{action.label}</Typography>
                    </MenuItem>,
                )}
            </MenuList>
        </Popover>
    </>;
}