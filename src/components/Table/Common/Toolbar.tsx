
import Button from "../../Button/Button";
import { SvgIconComponent } from "@mui/icons-material";
import {
    Box,
    Toolbar,
    Typography,
} from "@mui/material";

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
    icon: SvgIconComponent;
    disabled?: boolean;
    onClick: (rowIds: T[Extract<keyof T, string>][]) => void;
}

interface Props<T> {
    hideSelectStatus?: boolean;
    primaryAction?: ToolbarAction;
    secondaryActions?: ToolbarAction[];
    selectedRows: T[Extract<keyof T, string>][];
    localization?: ToolbarLocalization;
}

export default function BaseTableToolbar<T> (props: Props<T>) {
    const {
        primaryAction,
        secondaryActions,
        localization,
    } = props;

    return (
        <Toolbar
            sx={{
                mb: 1,
                p: 0,
                height: 40,
                minHeight: 40,
                "@media (min-width: 0px)": {
                    height: 40,
                    minHeight: 40,
                    p: 0,
                },
                "@media (min-width: 600px)": {
                    height: 40,
                    minHeight: 40,
                    p: 0,
                },
            }}
        >
            <Typography
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {localization?.title ?? ``}
            </Typography>
            {primaryAction && (
                <Button
                    rounded
                    variant="outlined"
                    color="primary"
                    disabled={primaryAction.disabled}
                    icon={primaryAction.icon}
                    label={primaryAction.label}
                    sx={{
                        marginLeft: 1,
                    }}
                    onClick={primaryAction.onClick}
                />
            )}
            <Box flex="1" />
            {secondaryActions?.map((action, i) => (
                <Button
                    key={`secondary-action-${i}`}
                    color="primary"
                    icon={action.icon}
                    label={action.label}
                    disabled={action.disabled}
                    onClick={action.onClick}
                />
            ))}
        </Toolbar>
    );
}
