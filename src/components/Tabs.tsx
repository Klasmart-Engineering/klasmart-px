import {
    createStyles,
    makeStyles,
    Tab,
    Tabs,
} from "@material-ui/core";
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
        flex: 0,
        backgroundColor: `transparent !important`,
        "& .MuiTabs-flexContainer": {
            padding: theme.spacing(0, 2),
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
    tabs: Tab[];
    value?: string;
    valuesAsPaths?: boolean;
    onChange?: (value: string) => void;
}

export default function (props: Props) {
    const {
        tabs,
        value,
        valuesAsPaths,
        onChange,
    } = props;
    const classes = useStyles();
    const [ value_, setValue_ ] = useState(value ?? ``);

    useEffect(() => {
        if (!value) return;
        setValue_(value);
    }, [ value ]);

    const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        onChange?.(value);
    };

    return (
        <Tabs
            value={value_}
            TabIndicatorProps={{
                className: classes.tabIndicator,
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={classes.tabsContainer}
            onChange={handleChange}
        >
            {tabs.map((tab, i) => (
                <Tab
                    key={`tab-${i}`}
                    className={classes.tabRoot}
                    label={`${tab.text}`}
                    href={valuesAsPaths ? `#${tab.value}` : ``}
                    value={tab.value}
                />
            ))}
        </Tabs>
    );
}
