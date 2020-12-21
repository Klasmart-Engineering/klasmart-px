import React,
{ useState } from "react";
import {
    Box,
    createStyles,
    Divider,
    makeStyles,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Theme,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 53,
            "& .MuiInput-underline:before": {
                display: `none`,
            },
            "& .MuiInput-underline:after": {
                display: `none`,
            },
        },
        tabsContainer: {
            flex: 1,
            backgroundColor: theme.palette.background.paper,
            "& .MuiTabs-flexContainer": {
                height: `100%`,
            },
            "& .MuiTab-root": {
                backgroundColor: `transparent !important`,
            },
        },
        tabRoot: {
            minWidth: `inherit`,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        select: {
            minWidth: 150,
            "& .MuiSelect-root": {
                padding: theme.spacing(2 + 1/8, 2),
            },
            "& .MuiSelect-icon": {
                marginRight: theme.spacing(2),
            },
        },
        selectPlaceholderText: {
            color: theme.palette.grey[500],
            lineHeight: `inherit`,
        },
    }),
);

export interface GroupSelectMenuItem<T> {
    label: string;
    id: keyof T;
}

export interface SubgroupTab<T> {
    id: T[keyof T];
    count: number;
}

interface Props<T> {
    allCount: number;
    groupBy?: keyof T;
    groups?: GroupSelectMenuItem<T>[];
    subgroupBy?: T[keyof T];
    subgroups?: SubgroupTab<T>[];
    onSelectGroup: (value: keyof T | undefined) => void;
    onSelectSubgroup: (value: T[keyof T] | undefined) => void;
}

export default function BaseTableGroupTabs<T>(props: Props<T>) {
    const {
        allCount,
        groupBy,
        groups = [],
        subgroupBy,
        subgroups = [],
        onSelectGroup,
        onSelectSubgroup,
    } = props;
    const classes = useStyles();
    const [ groupBy_, setGroupBy ] = useState<"" | keyof T>(groupBy && groups.find((group) => group.id === groupBy) ? groupBy : ``);
    const [ subgroupBy_, setSubgroupBy ] = useState(subgroupBy);

    // adjusting index+1 b/c "all"-tab is always index 0
    const subgroupIndex = 1 + subgroups.findIndex((subgroup) => subgroup.id === subgroupBy_) ?? 0;

    const allSubgroupCount = subgroups.reduce((sum, subgroup) => sum + subgroup.count, 0);

    const handleSubgroupChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const newSubgroupIndex = value - 1; // "all"-tab is always index 0 so need to subtract by 1
        const newSubgroup = subgroups?.length ? subgroups[newSubgroupIndex] : undefined;
        setSubgroupBy(newSubgroup?.id);
        onSelectSubgroup(newSubgroup?.id);
    };

    const handleGroupChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>, child: React.ReactNode) => {
        const newGroup = e.target.value as "" | NonNullable<keyof T>;
        setSubgroupBy(undefined);
        onSelectSubgroup(undefined);
        setGroupBy(newGroup);
        onSelectGroup(newGroup === `` ? undefined : newGroup);
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                className={classes.root}
            >
                <Tabs
                    value={subgroupIndex}
                    TabIndicatorProps={{
                        style: {
                            height: 4,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                        },
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="groups"
                    className={classes.tabsContainer}
                    onChange={handleSubgroupChange}
                >
                    <Tab
                        label={`All (${groupBy_ ? allSubgroupCount : allCount})`}
                        className={classes.tabRoot}
                    />
                    {subgroups?.map((subgroup, i) =>
                        <Tab
                            key={`subgroup-${i}`}
                            className={classes.tabRoot}
                            label={`${subgroup.id} (${subgroup.count})`}
                        />,
                    )}
                </Tabs>
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
                                Group by
                            </Typography>
                    }
                    onChange={handleGroupChange}
                >
                    <MenuItem value="">No group</MenuItem>
                    {groups?.map((group, i) =>
                        <MenuItem
                            key={`group-${i}`}
                            value={group.id as Extract<keyof T, "string">}
                        >
                            {group.label}
                        </MenuItem>,
                    )}
                </Select>
            </Box>
            <Divider />
        </>
    );
}
