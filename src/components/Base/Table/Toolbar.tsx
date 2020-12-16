import React,
{ cloneElement } from "react";
import {
    createStyles,
    IconButton,
    lighten,
    makeStyles,
    SvgIconProps,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { TableData } from "./Base";
import BaseFabButton from "../FabButton";

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
    }),
);

interface Props<T> {
    numSelected: number;
    title: string;
    primaryAction?: ToolbarAction<T>;
    secondaryActions?: ToolbarAction<T>[];
    tableData: TableData<T>;
}

export interface ToolbarAction<T>{
    label: string;
    icon?: React.ReactElement<SvgIconProps>;
    onClick: (event: React.MouseEvent<unknown>, data?: TableData<T>) => void;
}

export default function BaseTableToolbar<T>(props: Props<T>) {
    const classes = useStyles();
    const {
        numSelected,
        title,
        primaryAction,
        secondaryActions,
        tableData,
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
                        {numSelected} selected
                    </Typography>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </> :
                <>
                    <Typography
                        variant="h4"
                        id="tableTitle"
                        component="div"
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    {secondaryActions?.map((action, i) =>
                        <Tooltip
                            key={`secondary-action-${i}`}
                            title={action.label}
                        >
                            <IconButton
                                color="primary"
                                onClick={(e) => action.onClick(e, tableData)}
                            >
                                {action.icon}
                            </IconButton>
                        </Tooltip>,
                    )}
                    {primaryAction &&
                        <BaseFabButton onClick={(e) => primaryAction.onClick(e, tableData)}>
                            {primaryAction.icon && cloneElement(
                                primaryAction.icon,
                                {
                                    className: classes.primaryActionIcon,
                                },
                            )}
                            {primaryAction.label}
                        </BaseFabButton>
                    }
                </>
            }
        </Toolbar>
    );
}
