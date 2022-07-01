
import Button from '../../../Button/Button';
import {
    Filter,
    FilterLocalization,
} from './Filters';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import {
    ButtonProps,
    Tooltip,
} from '@mui/material';

interface Props {
    disabled: boolean;
    localization?: FilterLocalization;
    filters: Filter[];
    onClick: ButtonProps[`onClick`];
}

export default function FilterAddButton (props: Props) {
    const {
        localization,
        filters,
        disabled,
        onClick,
    } = props;

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
                <Button
                    rounded
                    disabled={disabled}
                    variant="text"
                    color="primary"
                    icon={FilterListIcon}
                    label={localization?.filterMenu?.addFilter ?? `Add Filter`}
                    sx={{
                        marginRight: 1,
                    }}
                    onClick={onClick}
                />
            </span>
        </Tooltip>
    );

}
