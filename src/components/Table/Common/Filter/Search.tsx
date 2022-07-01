import TextField from '../../../Input/TextField';
import {
    Close as CloseIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import {
    useEffect,
    useState,
} from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_DELAY = 300;

export interface SearchLocalization {
    placeholder?: string;
    clear?: string;
}

interface Props {
    value?: string;
    localization?: SearchLocalization;
    onChange: (value: string) => void;
}

export default function TableFilterSearch (props: Props) {
    const {
        value,
        localization,
        onChange,
    } = props;
    const [ value_, setValue ] = useState(value ?? ``);
    const [ debouncedValue ] = useDebounce(value_, DEBOUNCE_DELAY);

    useEffect(() => {
        onChange(debouncedValue);
    }, [ debouncedValue ]);

    const handleOnChange = (value: string) => {
        setValue(value);
    };

    return (
        <TextField
            hideHelperText
            variant="outlined"
            placeholder={localization?.placeholder ?? `Search`}
            value={value_}
            appendInner={
                value_
                    ? (
                        <CloseIcon
                            color="action"
                            sx={{
                                cursor: `pointer`,
                            }}
                            onClick={() => setValue(``)}
                        />
                    )
                    : (
                        <SearchIcon
                            color="primary"
                            sx={{
                                pointerEvents: `none`,
                            }}
                        />
                    )
            }
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: 6,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `primary.main`,
                    },
                },
                "& .MuiOutlinedInput-input": {
                    paddingY: 1,
                    paddingX: 2,
                },
            }}
            onChange={(value) => handleOnChange(value)}
        />
    );
}
