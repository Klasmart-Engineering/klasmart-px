
import {
    Chip,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";

export interface Props {
    items: string[];
    maxItemsInTooltip?: number;
    label?: (count: number) => string;
    moreLabel?: (count: number) => string;
}

export default function TruncateChipTooltip (props: Props) {
    const {
        items,
        maxItemsInTooltip,
        label = (count) => `${count} items`,
        moreLabel = (count) => `+${count} more`,
    } = props;

    const truncateItems = maxItemsInTooltip && items.length > maxItemsInTooltip;
    const listItems = truncateItems ? items.filter((item, index) => index < maxItemsInTooltip) : items;

    if(items.length === 1) {
        return <b>{ items[0] }</b>;
    }

    return (
        <Tooltip title={
            <div role="list">
                {
                    listItems.map((item) => (
                        <Typography
                            key={`list-item-${item}`}
                            role="listitem"
                            fontSize={14}
                        >
                            {item}
                        </Typography>
                    ))
                }
                {
                    truncateItems &&
                        <Typography
                            role="listitem"
                            fontSize={14}
                        >
                            { moreLabel(items.length - maxItemsInTooltip) }
                        </Typography>
                }
            </div>
        }
        >
            <Chip
                label={label(items.length)}
            />
        </Tooltip>
    );
}
