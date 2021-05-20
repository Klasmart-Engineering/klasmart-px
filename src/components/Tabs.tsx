import {
    createStyles,
    makeStyles,
    Tab as MaterialTab,
    Tabs as MaterialTabs,
} from "@material-ui/core";
import clsx from "clsx";
import React, {
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    tabRoot: {
        minWidth: `inherit`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    tabIndicator: {
        height: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    tabsContainer: {
        flex: 1,
        backgroundColor: `transparent !important`,
        "& .MuiTabs-flexContainer": {
            height: `100%`,
        },
        "& .MuiTab-root": {
            backgroundColor: `transparent !important`,
        },
    },
}));

export interface Tab {
    text: string;
    value: string | undefined;
}

interface Props {
    className?: string;
    tabs: Tab[];
    value?: string;
    valuesAsPaths?: boolean;
    onChange?: (value: string) => void;
}

export default function Tabs (props: Props) {
    const {
        className,
        tabs,
        value,
        valuesAsPaths,
        onChange,
    } = props;
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        onChange?.(value !== 0 ? value : undefined);
    };

    return (
        <MaterialTabs
            value={tabs.find((tab) => tab.value === value)?.value ?? 0}
            TabIndicatorProps={{
                className: classes.tabIndicator,
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={clsx(classes.tabsContainer, className)}
            onChange={handleChange}
        >
            {tabs.map((tab, i) => (
                <MaterialTab
                    key={`tab-${i}`}
                    className={classes.tabRoot}
                    label={`${tab.text}`}
                    href={valuesAsPaths ? `#${tab.value}` : ``}
                    value={tab.value}
                />
            ))}
        </MaterialTabs>
    );
}
