import Tabs,
{ Tab } from "../../Tabs";
import {
    Box,
    createStyles,
    Divider,
    makeStyles,
    MenuItem,
    Select,
    Theme,
    Typography,
} from "@material-ui/core";
import React,
{
    useEffect,
    useMemo,
    useState,
} from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: 53,
        "& .MuiInput-underline:before": {
            display: `none`,
        },
        "& .MuiInput-underline:after": {
            display: `none`,
        },
    },
    select: {
        minWidth: 150,
        "& .MuiSelect-root": {
            padding: theme.spacing(2 + 1/8, 6, 2 + 1/8, 2),
        },
        "& .MuiSelect-icon": {
            marginRight: theme.spacing(2),
        },
    },
    selectPlaceholderText: {
        color: theme.palette.grey[500],
        lineHeight: `inherit`,
    },
}));

export interface GroupSelectMenuItem<T> {
    label: string;
    id: keyof T;
}

export interface SubgroupTab {
    text: string;
    value: string | number | boolean;
    count?: number | boolean;
}

export interface GroupTabsLocalization {
    selectLabel?: string;
    selectNone?: string;
    tabAll?: string;
}

interface Props<T> {
    allCount: number;
    groupBy?: keyof T;
    groups?: GroupSelectMenuItem<T>[];
    subgroupBy?: string;
    subgroups?: SubgroupTab[];
    hideAllGroupTab?: boolean;
    hideNoGroupOption?: boolean;
    localization?: GroupTabsLocalization;
    onSelectGroup: (value: Extract<keyof T, string> | undefined) => void;
    onSelectSubgroup: (value: string | undefined) => void;
}

export default function BaseTableGroupTabs<T> (props: Props<T>) {
    const {
        allCount,
        groupBy,
        groups = [],
        subgroupBy,
        subgroups = [],
        hideAllGroupTab,
        hideNoGroupOption,
        localization,
        onSelectGroup,
        onSelectSubgroup,
    } = props;
    const classes = useStyles();
    const [ groupBy_, setGroupBy ] = useState<"" | keyof T>(groupBy && groups.find((group) => group.id === groupBy) ? groupBy : ``);
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy);

    const handleSubgroupChange = (value?: string) => {
        setSubgroupBy(value);
        onSelectSubgroup(value);
    };

    const handleGroupChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, child: React.ReactNode) => {
        const value = e.target.value as "" | Extract<keyof T, string>;
        setGroupBy(value);
        const newGroup = value === `` ? undefined : value;
        onSelectGroup(newGroup);
        if (subgroupBy_) handleSubgroupChange(undefined);
    };

    useEffect(() => {
        if (subgroupBy === subgroupBy_) return;
        setSubgroupBy(subgroupBy);
    }, [ subgroupBy ]);

    const hasSubGroupCountValues = subgroups.every((subgroup) => typeof subgroup.count === `number`);

    const tabs: Tab[] = [
        ...!hideAllGroupTab ? [
            {
                text: `${localization?.tabAll ?? `All`}${hasSubGroupCountValues ? ` (${allCount})` : ``}`,
                value: undefined,
            },
        ] : [],
        ...subgroups.map((subgroup) => ({
            text: `${subgroup.text}${typeof subgroup.count === `number` ? ` (${subgroup.count})` : ``}`,
            value: `${subgroup.value}`,
        })),
    ];

    const hasValidSubgroupValue = useMemo(() => {
        return tabs.find((tab) => tab.value === subgroupBy_);
    }, [
        tabs,
        subgroupBy_,
        hideAllGroupTab,
    ]);

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                className={classes.root}
            >
                {hasValidSubgroupValue
                    ? (
                        <Tabs
                            value={subgroupBy_}
                            tabs={tabs}
                            onChange={handleSubgroupChange}
                        />
                    ) : (
                        <Box
                            display="flex"
                            flex="1"
                        />
                    )}
                {groups.length > 1 && (
                    <>
                        <Divider orientation="vertical"/>
                        <Select
                            displayEmpty
                            value={groupBy_}
                            className={classes.select}
                            renderValue={
                                groupBy_ !== `` ? undefined : () =>
                                    <Typography
                                        variant="body1"
                                        className={classes.selectPlaceholderText}
                                    >
                                        {localization?.selectLabel ?? `Group by`}
                                    </Typography>
                            }
                            onChange={handleGroupChange}
                        >
                            {!hideNoGroupOption && <MenuItem value="">{localization?.selectNone ?? `None`}</MenuItem>}
                            {groups?.map((group, i) =>
                                <MenuItem
                                    key={`group-${i}`}
                                    value={group.id as Extract<keyof T, "string">}
                                >
                                    {group.label}
                                </MenuItem>)}
                        </Select>
                    </>
                )}
            </Box>
        </>
    );
}
