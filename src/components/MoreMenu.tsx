import {
    MoreVert as MoreVertIcon,
    SvgIconComponent,
} from "@mui/icons-material";
import {
    IconButton,
    ListItemIcon,
    MenuItem,
    MenuList,
    Popover,
    Theme,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => createStyles ({}));

export interface MenuAction<T> {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: ((item: T) => void);
}

export interface MoreMenuLocalization {
    moreMenuButton?: string;
}

interface Props<T> {
    actions: MenuAction<T>[];
    item: T;
    localization?: MoreMenuLocalization;
}

export default function MoreMenu<T> (props: Props<T>) {
    const {
        actions,
        item,
        localization,
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

    return (
        <>
            <Tooltip title={localization?.moreMenuButton ?? `More actions`}>
                <IconButton
                    aria-label={localization?.moreMenuButton ?? `More actions`}
                    aria-haspopup="true"
                    size="large"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Popover
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
                    {actions?.length && actions.map((action, i) =>
                        (
                            <MenuItem
                                key={`menu-item-${i}`}
                                disabled={action.disabled}
                                onClick={() => {
                                    action.onClick(item);
                                    handleClose();
                                }}
                            >
                                {action.icon &&
                            <ListItemIcon>
                                <action.icon />
                            </ListItemIcon>
                                }
                                <Typography variant="body2">{action.label}</Typography>
                            </MenuItem>))}
                </MenuList>
            </Popover>
        </>);
}
