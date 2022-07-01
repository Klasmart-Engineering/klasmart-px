
import Select from "../../Input/Select";
import { PaginationLocalization } from "../Common/Pagination/shared";
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
import { clamp } from "lodash";

interface Props {
    rowsPerPageOptions: Array<number | { value: number; label: string }>;
    count: number;
    page: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    onChangePage: (page: number) => void;
    onChangeRowsPerPage?: (rowsPerPage: number) => void;
}

export default function PageTablePagination (props: Props) {
    const {
        rowsPerPageOptions,
        count,
        page,
        rowsPerPage,
        localization,
        onChangePage,
        onChangeRowsPerPage,
    } = props;
    const theme = useTheme();

    const lastPage = Math.ceil(count / rowsPerPage) - 1;

    const handleFirstPageButtonClick = () => {
        onChangePage(clamp(0, 0, lastPage));
    };

    const handleBackButtonClick = () => {
        onChangePage(clamp(page, 0, lastPage) - 1);
    };

    const handleNextButtonClick = () => {
        onChangePage(clamp(page, 0, lastPage) + 1);
    };

    const handleLastPageButtonClick = () => {
        onChangePage(clamp(lastPage, 0, lastPage));
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
                >
                    <Tooltip title={localization?.firstPage ?? `First page`}>
                        <span>
                            <IconButton
                                disabled={page === 0}
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
                                disabled={page === 0}
                                aria-label={localization?.prevPage ?? `Previous page`}
                                size="medium"
                                onClick={handleBackButtonClick}
                            >
                                {theme.direction === `rtl` ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography>{`${(page + 1)} of ${(lastPage + 1)}`}</Typography>
                    <Tooltip title={localization?.nextPage ?? `Next page`}>
                        <span>
                            <IconButton
                                disabled={page >= lastPage}
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
                                disabled={page >= lastPage}
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
                >
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
                </Box>
            </Stack>
        </Toolbar>
    );
}
