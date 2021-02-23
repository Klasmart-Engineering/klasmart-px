import { PaginationLocalization } from "../Common/Pagination/shared";
import {
    createStyles,
    IconButton,
    makeStyles,
    TablePagination,
    Theme,
    Tooltip,
    useTheme,
} from "@material-ui/core";
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    LastPage as LastPageIcon,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

export type Page = `start` | `previous` | `next` | `end`

interface Props {
    rowsPerPageOptions: Array<number | { value: number; label: string }>;
    count: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    onChangePage: (page: Page) => void;
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
    const classes = useStyles();
    const theme = useTheme();

    const actions = () => {
        const handleFirstPageButtonClick = () => {
            onChangePage(`start`);
        };

        const handleBackButtonClick = () => {
            onChangePage(`previous`);
        };

        const handleNextButtonClick = () => {
            onChangePage(`next`);
        };

        const handleLastPageButtonClick = () => {
            onChangePage(`end`);
        };
        return (
            <div className={classes.root}>
                <Tooltip title={localization?.firstPage ?? `First page`}>
                    <span>
                        <IconButton
                            disabled={!hasPreviousPage}
                            aria-label="first page"
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
                            aria-label="previous page"
                            onClick={handleBackButtonClick}>
                            {theme.direction === `rtl` ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={localization?.nextPage ?? `Next page`}>
                    <span>
                        <IconButton
                            disabled={!hasNextPage}
                            aria-label="next page"
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
                            aria-label="last page"
                            onClick={handleLastPageButtonClick}
                        >
                            {theme.direction === `rtl` ? <FirstPageIcon /> : <LastPageIcon />}
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
        );
    };

    return (
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage={localization?.rowsPerPage}
            labelDisplayedRows={localization?.total ? (({ count }) => localization?.total?.(count)) : ({ count }) => `${count} result${count !== 1 ? `s` : ``}`}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={0}
            ActionsComponent={actions}
            onChangePage={() => {return;}}
            onChangeRowsPerPage={(event) => onChangeRowsPerPage?.(parseInt(event.target.value, 10))}
        />
    );
}