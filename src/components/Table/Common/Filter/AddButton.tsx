
import {
    Filter,
    FilterLocalization,
} from './Filters';
import { Add as AddIcon } from '@mui/icons-material';
import {
    Chip,
    Theme,
    Tooltip,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    chip: {
        margin: theme.spacing(0.5, 0.5),
    },
    addChip: {
        marginLeft: 4,
        '& .MuiChip-icon': {
            marginRight: -20,
            marginLeft: 4,
        },
    },
    chipText: {
        whiteSpace: `break-spaces`,
    },
}));

interface Props {
    disabled: boolean;
    localization?: FilterLocalization;
    filters: Filter[];
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function AddButton (props: Props) {
    const {
        localization,
        filters,
        disabled,
        onClick,
    } = props;
    const classes = useStyles();

    return (
        <Tooltip
            title={
                disabled
                    ? (localization?.noAvailableFilters ?? `All columns already have a filter specified`)
                    : (filters.length > 0
                        ? (localization?.filterMenu?.addFilter ?? `Add Filter`)
                        : ``
                    )
            }
        >
            <span>
                <Chip
                    disabled={disabled}
                    className={
                        filters.length > 0
                            ? classes.addChip
                            : classes.chip
                    }
                    icon={<AddIcon color="action" />}
                    label={
                        filters.length > 0 ? `` : (localization?.filterMenu?.addFilter ?? `Add Filter`)
                    }
                    onClick={onClick}
                />
            </span>
        </Tooltip>
    );

}
