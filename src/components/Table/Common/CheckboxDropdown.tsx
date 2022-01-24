
import { ArrowDropDown } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    MenuItem,
    MenuList,
    Popover,
    Theme,
    Typography,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React,
{ useState } from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    menuButton: {
        minWidth: 24,
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    },
}));

export enum CheckboxDropdownValue {
    ALL = `all`,
    ALL_PAGES = `all-pages`,
    NONE = `none`,
    PAGE = `page`,
}

export interface CheckboxDropdownAction {
    label: string;
    value: CheckboxDropdownValue;
}

export interface CheckboxDropdownLocalization {
    allGroupsPages?: string;
    allPages?: string;
    thisPage?: string;
    none?: string;
}

interface Props {
    indeterminate: boolean;
    checked: boolean;
    hasGroups: boolean;
    hideSelectAll?: boolean;
    disabled?: boolean;
    localization?: CheckboxDropdownLocalization;
    onSelectAllClick: (event: React.MouseEvent<HTMLLIElement>, value: CheckboxDropdownValue) => void;
    onSelectAllPageClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BaseTableCheckboxDropdown (props: Props) {
    const {
        indeterminate,
        checked,
        disabled,
        hasGroups,
        hideSelectAll,
        localization,
        onSelectAllClick,
        onSelectAllPageClick,
    } = props;
    const classes = useStyles();
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const standardActions: CheckboxDropdownAction[] = [
        ...hideSelectAll ? [] : [
            {
                label: localization?.allPages ?? `All pages`,
                value: CheckboxDropdownValue.ALL_PAGES,
            },
        ],
        {
            label: localization?.thisPage ?? `This page`,
            value: CheckboxDropdownValue.PAGE,
        },
        {
            label: localization?.none ?? `None`,
            value: CheckboxDropdownValue.NONE,
        },
    ];
    const actions: CheckboxDropdownAction[] = hasGroups ? [
        ...hideSelectAll ? [] : [
            {
                label: localization?.allGroupsPages ?? `All groups & pages`,
                value: CheckboxDropdownValue.ALL,
            },
        ],
        ...standardActions,
    ] : standardActions;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
        >
            <Checkbox
                checked={checked}
                disabled={disabled}
                indeterminate={indeterminate}
                inputProps={{
                    "aria-label": `select all on page`,
                }}
                onChange={onSelectAllPageClick}
            />
            <Button
                className={classes.menuButton}
                onClick={handleClick}
            >
                <ArrowDropDown color="action" />
            </Button>
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
                onClose={handleClose}
            >
                <MenuList>
                    {actions.map((action, i) => (
                        <MenuItem
                            key={`menu-item-${i}`}
                            onClick={(e) => {
                                onSelectAllClick(e, action.value);
                                handleClose();
                            }}
                        >
                            <Typography variant="body2">{action.label}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </Box>
    );
}
