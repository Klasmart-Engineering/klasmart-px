import Button from "../../Button/Button";
import Fab from "../../Button/Fab";
import IconButton from "../../Button/IconButton";
import {
    createStyles,
    lighten,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        borderTopLeftRadius: `inherit`,
        borderTopRightRadius: `inherit`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        "& > *:not(:first-child)": {
            marginLeft: theme.direction === `ltr` ? theme.spacing(2) : undefined,
            marginRight: theme.direction === `rtl` ? theme.spacing(2) : undefined,
        },
    },
    highlight: theme.palette.type === `light`
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
        flex: `1 1 100%`,
    },
    primaryActionIcon: {
        marginRight: theme.spacing(1),
    },
}));

export interface ToolbarLocalization {
    title?: string;
    numSelected?: (num: number) => string;
}

export interface ToolbarAction {
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: () => void;
}

export interface ToolbarSelectAction<T>{
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: (rowIds: T[Extract<keyof T, string>][]) => void;
}

interface Props<T> {
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectActions?: ToolbarSelectAction<T>[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: ToolbarLocalization;
}

export default function BaseTableToolbar<T>(props: Props<T>) {
    const classes = useStyles();
    const {
        primaryAction,
        secondaryActions,
        selectActions,
        selectedRows,
        localization,
    } = props;

    const numSelected = selectedRows.length;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ?
                <>
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {localization?.numSelected?.(numSelected) ?? `${numSelected} selected`}
                    </Typography>
                    {selectActions?.map((action, i) =>
                        action.icon
                            ? <IconButton
                                key={`select-action-${i}`}
                                icon={action.icon}
                                tooltip={action.label}
                                color="primary"
                                disabled={action.disabled}
                                onClick={() => action.onClick(selectedRows)}
                            />
                            : <Button
                                key={`select-action-${i}`}
                                label={action.label}
                                color="primary"
                                disabled={action.disabled}
                                onClick={() => action.onClick(selectedRows)}
                            />)}
                </> :
                <>
                    <Typography
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        className={classes.title}
                    >
                        {localization?.title ?? ``}
                    </Typography>
                    {secondaryActions?.map((action, i) =>
                        action.icon
                            ? <IconButton
                                key={`secondary-action-${i}`}
                                icon={action.icon}
                                tooltip={action.label}
                                color="primary"
                                disabled={action.disabled}
                                onClick={action.onClick}
                            />
                            : <Button
                                key={`secondary-action-${i}`}
                                label={action.label}
                                color="primary"
                                disabled={action.disabled}
                                onClick={action.onClick}
                            />)}
                    {primaryAction &&
                        <Fab
                            responsiveExtended={[
                                `md`,
                                `lg`,
                                `xl`,
                            ]}
                            color="primary"
                            disabled={primaryAction.disabled}
                            icon={primaryAction.icon}
                            label={primaryAction.label}
                            onClick={primaryAction.onClick}
                        />
                    }
                </>
            }
        </Toolbar>
    );
}
