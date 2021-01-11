import React from "react";
import {
    Button,
    createStyles,
    IconButton,
    lighten,
    makeStyles,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { TableData } from "./Base";
import { SvgIconComponent } from "@material-ui/icons";
import { BaseFabButton } from "../..";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderTopLeftRadius: `inherit`,
            borderTopRightRadius: `inherit`,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            "& button:not(:first-child)": {
                marginLeft: theme.spacing(2),
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
        textButton: {
            minWidth: `inherit`,
        },
    }),
);

export interface ToolbarLocalization {
    title?: string;
    numSelected?: (num: number) => string;
}

export interface ToolbarAction<T>{
    label: string;
    icon?: SvgIconComponent;
    disabled?: boolean;
    onClick: (data: TableData<T>) => void;
}

interface Props<T> {
    numSelected: number;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    selectActions?: ToolbarAction<T>[];
    tableData: TableData<T>;
    localization?: ToolbarLocalization;
}

export default function BaseTableToolbar<T>(props: Props<T>) {
    const classes = useStyles();
    const {
        numSelected,
        primaryAction,
        secondaryActions,
        selectActions,
        tableData,
        localization,
    } = props;

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
                            ? <Tooltip
                                key={`select-action-${i}`}
                                title={action.label}
                            >
                                <span>
                                    <IconButton
                                        color="primary"
                                        disabled={action.disabled}
                                        onClick={() => action.onClick(tableData)}
                                    >
                                        {action.icon && <action.icon />}
                                    </IconButton>
                                </span>
                            </Tooltip>
                            : <Button
                                key={`select-action-${i}`}
                                color="primary"
                                disabled={action.disabled}
                                className={classes.textButton}
                                onClick={() => action.onClick(tableData)}
                            >
                                <Typography
                                    noWrap
                                    variant="button"
                                >
                                    {action.label}
                                </Typography>
                            </Button>,
                    )}
                </> :
                <>
                    <Typography
                        variant="h4"
                        id="tableTitle"
                        component="div"
                        className={classes.title}
                    >
                        {localization?.title ?? ``}
                    </Typography>
                    {secondaryActions?.map((action, i) =>
                        action.icon
                            ? <Tooltip
                                key={`secondary-action-${i}`}
                                title={action.label}
                            >
                                <span>
                                    <IconButton
                                        color="primary"
                                        disabled={action.disabled}
                                        onClick={() => action.onClick(tableData)}
                                    >
                                        {action.icon && <action.icon />}
                                    </IconButton>
                                </span>
                            </Tooltip>
                            : <Button
                                key={`secondary-action-${i}`}
                                color="primary"
                                disabled={action.disabled}
                                className={classes.textButton}
                                onClick={() => action.onClick(tableData)}
                            >
                                {action.label}
                            </Button>,
                    )}
                    {primaryAction &&
                        <BaseFabButton
                            disabled={primaryAction.disabled}
                            onClick={() => primaryAction.onClick(tableData)}
                        >
                            {primaryAction.icon && <primaryAction.icon className={classes.primaryActionIcon} />}
                            {primaryAction.label}
                        </BaseFabButton>
                    }
                </>
            }
        </Toolbar>
    );
}
