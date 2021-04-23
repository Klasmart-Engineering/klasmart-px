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
{ useState } from "react";

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
    value: string | number;
    count?: number;
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
        localization,
        onSelectGroup,
        onSelectSubgroup,
    } = props;
    const classes = useStyles();
    const [ groupBy_, setGroupBy ] = useState<"" | keyof T>(groupBy && groups.find((group) => group.id === groupBy) ? groupBy : ``);
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy);

    const handleSubgroupChange = (value: string) => {
        setSubgroupBy(value);
        onSelectSubgroup(value);
    };

    const handleGroupChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, child: React.ReactNode) => {
        const newGroup = e.target.value as "" | Extract<keyof T, string>;
        const newSubgroup = undefined;
        if (newSubgroup !== subgroupBy_) {
            setSubgroupBy(newSubgroup);
            onSelectSubgroup(newSubgroup);
        }
        setGroupBy(newGroup);
        onSelectGroup(newGroup === `` ? undefined : newGroup);
    };

    const tabs: Tab[] = [
        {
            text: `${localization?.tabAll ?? `All`} (${allCount})`,
            value: undefined,
        },
        ...subgroups.map((subgroup) => ({
            text: `${subgroup.text} (${subgroup.count ?? 0})`,
            value: `${subgroup.value}`,
        })),
    ];

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                className={classes.root}
            >
                <Tabs
                    value={subgroupBy_}
                    tabs={tabs}
                    onChange={handleSubgroupChange}
                />
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
                    <MenuItem value="">{localization?.selectNone ?? `None`}</MenuItem>
                    {groups?.map((group, i) =>
                        <MenuItem
                            key={`group-${i}`}
                            value={group.id as Extract<keyof T, "string">}
                        >
                            {group.label}
                        </MenuItem>)}
                </Select>
            </Box>
        </>
    );
}
