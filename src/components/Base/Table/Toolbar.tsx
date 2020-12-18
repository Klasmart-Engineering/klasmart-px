import React,
{ cloneElement } from "react";
import {
    Button,
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
import { TableData } from "./Base";
import BaseFabButton from "../FabButton";

export interface ToolbarAction<T>{
    label: string;
    icon?: React.ReactElement<SvgIconProps>;
    onClick: (data?: TableData<T>) => void;
}

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
    selectActions?: ToolbarAction<T>[];
    tableData: TableData<T>;
}

export default function BaseTableToolbar<T>(props: Props<T>) {
    const classes = useStyles();
    const {
        numSelected,
        title,
        primaryAction,
        secondaryActions,
        selectActions,
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
                    {selectActions?.map((action, i) =>
                        <Tooltip
                            key={`select-action-${i}`}
                            title={action.label}
                        >
                            <IconButton
                                color="primary"
                                onClick={() => action.onClick(tableData)}
                            >
                                {action.icon}
                            </IconButton>
                        </Tooltip>,
                    )}
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
                        action.icon
                            ? <Tooltip
                                key={`secondary-action-${i}`}
                                title={action.label}
                            >
                                <IconButton
                                    color="primary"
                                    onClick={() => action.onClick(tableData)}
                                >
                                    {action.icon}
                                </IconButton>
                            </Tooltip>
                            : <Button
                                key={`secondary-action-${i}`}
                                color="primary"
                                onClick={() => action.onClick(tableData)}
                            >
                                {action.label}
                            </Button>,
                    )}
                    {primaryAction &&
                        <BaseFabButton onClick={() => primaryAction.onClick(tableData)}>
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
