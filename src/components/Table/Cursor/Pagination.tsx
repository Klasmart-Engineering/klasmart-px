
import Select from "../../Input/Select";
import {
    PageChange,
    PaginationLocalization,
} from "../Common/Pagination/shared";
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    LastPage as LastPageIcon,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";

interface Props {
    rowsPerPageOptions: Array<number | { value: number; label: string }>;
    count: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onChangePage: (pageChange: PageChange) => void;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
}

export default function CursorTablePagination (props: Props) {
    const {
        rowsPerPageOptions,
        count,
        rowsPerPage,
        localization,
        hasNextPage,
        hasPreviousPage,
        onChangePage,
        onChangeRowsPerPage,
    } = props;
    const theme = useTheme();

    const handleFirstPageButtonClick = () => {
        onChangePage(`first`);
    };

    const handleBackButtonClick = () => {
        onChangePage(`previous`);
    };

    const handleNextButtonClick = () => {
        onChangePage(`next`);
    };

    const handleLastPageButtonClick = () => {
        onChangePage(`last`);
    };

    return (
        <Toolbar
            style={{
                minHeight: 40,
                height: `inherit`,
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="baseline"
                flexWrap="wrap"
            >
                <Box
                    display="flex"
                    alignItems="baseline"
                    justifyContent="start"
                >
                    <Typography>{localization?.total?.(count) ?? `Total ${count} result${count !== 1 ? `s` : ``}`}</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="baseline"
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    <Tooltip title={localization?.firstPage ?? `First page`}>
                        <span>
                            <IconButton
                                disabled={!hasPreviousPage}
                                aria-label={localization?.firstPage ?? `First page`}
                                size="medium"
                                onClick={handleFirstPageButtonClick}
                            >
                                {theme.direction === `rtl` ? <LastPageIcon /> : <FirstPageIcon />}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={localization?.prevPage ?? `Previous page`}>
                        <span>
                            <IconButton
                                disabled={!hasPreviousPage}
                                aria-label={localization?.prevPage ?? `Previous page`}
                                size="medium"
                                onClick={handleBackButtonClick}
                            >
                                {theme.direction === `rtl` ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={localization?.nextPage ?? `Next page`}>
                        <span>
                            <IconButton
                                disabled={!hasNextPage}
                                aria-label={localization?.nextPage ?? `Next page`}
                                size="medium"
                                onClick={handleNextButtonClick}
                            >
                                {theme.direction === `rtl` ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={localization?.lastPage ?? `Last page`}>
                        <span>
                            <IconButton
                                disabled={!hasNextPage}
                                aria-label={localization?.lastPage ?? `Last page`}
                                size="medium"
                                onClick={handleLastPageButtonClick}
                            >
                                {theme.direction === `rtl` ? <FirstPageIcon /> : <LastPageIcon />}
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>
                <Box
                    display="flex"
                    alignItems="baseline"
                    justifyContent="end"
                    flexWrap="wrap"
                >
                    {rowsPerPageOptions.length > 0
                        ? (
                            <>
                                <Typography>{localization?.rowsPerPage ?? `Rows per page`}</Typography>
                                <Select
                                    hideHelperText
                                    size="small"
                                    value={`${rowsPerPage}`}
                                    items={rowsPerPageOptions.map((option) => {
                                        if (typeof option === `number`) return `${option}`;
                                        return {
                                            ...option,
                                            value: `${option.value}`,
                                        };
                                    })}
                                    sx={{
                                        marginLeft: 1,
                                        "& .MuiSelect-select": {
                                            py: 3/8,
                                            pl: 11.5/8,
                                            paddingRight: 2,
                                        },
                                    }}
                                    onChange={onChangeRowsPerPage}
                                />
                            </>
                        )
                        : <Box flex="1" />
                    }
                </Box>
            </Stack>
        </Toolbar>
    );
}
