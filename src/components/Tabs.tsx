import {
    Tab as MUITab,
    Tabs as MUITabs,
} from "@mui/material";
import React from "react";

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

    const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
        onChange?.(value !== 0 ? value : undefined);
    };

    return (
        <MUITabs
            value={tabs.find((tab) => tab.value === value)?.value ?? 0}
            TabIndicatorProps={{
                sx: {
                    height: `100%`,
                    borderRadius: 18,
                    zIndex: -1,
                },
            }}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={className}
            sx={{
                minHeight: 36,
                height: 36,
                flex: 1,
                backgroundColor: `transparent !important`,
                "& .MuiTabs-flexContainer": {
                    height: `100%`,
                },
                "& .MuiTab-root": {
                    backgroundColor: `transparent !important`,
                },
            }}
            onChange={handleChange}
        >
            {tabs.map((tab) => (
                <MUITab
                    key={tab.value}
                    label={`${tab.text}`}
                    href={valuesAsPaths ? `#${tab.value}` : ``}
                    value={tab.value}
                    sx={{
                        minHeight: 36,
                        borderRadius: 4,
                        minWidth: `inherit`,
                        paddingLeft: 2,
                        paddingRight: 2,
                        color: `primary.main`,
                        transition: `color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
                        "&.Mui-selected": {
                            color: `primary.contrastText`,
                        },
                    }}
                />
            ))}
        </MUITabs>
    );
}
