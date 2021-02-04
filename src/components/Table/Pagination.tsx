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
import { clamp } from "lodash";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

export interface PaginationLocalization {
    rowsPerPage?: string;
    fromToMax?: (from: number, to: number, max: number) => string;
    prevPage?: string;
    nextPage?: string;
    firstPage?: string;
    lastPage?: string;
}

interface Props {
    rowsPerPageOptions: Array<number | { value: number; label: string }>;
    count: number;
    page: number;
    rowsPerPage: number;
    localization?: PaginationLocalization;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export default function BaseTablePagination (props: Props) {
    const classes = useStyles();
    const theme = useTheme();
    const {
        rowsPerPageOptions,
        count,
        page,
        rowsPerPage,
        localization,
        onChangePage,
        onChangeRowsPerPage,
    } = props;

    const lastPage = Math.ceil(count / rowsPerPage) - 1;

    const actions = () => {
        const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangePage(event, Math.max(0, lastPage));
        };
        return (
            <div className={classes.root}>
                <Tooltip title={localization?.firstPage ?? `First page`}>
                    <span>
                        <IconButton
                            disabled={page === 0}
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
                            disabled={page === 0}
                            aria-label="previous page"
                            onClick={handleBackButtonClick}>
                            {theme.direction === `rtl` ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={localization?.nextPage ?? `Next page`}>
                    <span>
                        <IconButton
                            disabled={page >= lastPage}
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
                            disabled={page >= lastPage}
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
            labelDisplayedRows={localization?.fromToMax ? (({
                from, to, count,
            }) => localization?.fromToMax?.(from, to, count)) : undefined}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={clamp(page, 0, lastPage)}
            ActionsComponent={actions}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
        />
    );
}
