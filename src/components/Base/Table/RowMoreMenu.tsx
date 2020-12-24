import {
    createStyles,
    IconButton,
    ListItemIcon,
    makeStyles,
    MenuItem,
    MenuList,
    Popover,
    Theme,
    Tooltip,
    Typography,
} from "@material-ui/core";
import {
    MoreVert as MoreVertIcon,
    SvgIconComponent,
} from "@material-ui/icons";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({}),
);

export interface RowAction<T> {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: ((item: T) => void);
}

export interface RowMoreMenuLocalization {
    moreMenuButton?: string;
}

interface Props<T> {
    actions: RowAction<T>[];
    item: T;
    localization?: RowMoreMenuLocalization;
}

export default function BaseTableRowMoreMenu<T>(props: Props<T>) {
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

    return <>
        <Tooltip title={localization?.moreMenuButton ?? `More actions`}>
            <IconButton
                aria-label={localization?.moreMenuButton ?? `More actions`}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
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
            <MenuList>
                {actions?.length && actions.map((action, i) =>
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
                    </MenuItem>,
                )}
            </MenuList>
        </Popover>
    </>;
}
