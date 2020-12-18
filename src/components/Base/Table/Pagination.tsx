import React from "react";
import {
    createStyles,
    IconButton,
    makeStyles,
    TablePagination,
    Theme,
    useTheme,
} from "@material-ui/core";
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    LastPage as LastPageIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

interface Props {
    rowsPerPageOptions: Array<number | { value: number; label: string }>;
    count: number;
    page: number;
    rowsPerPage: number;
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
                <IconButton
                    disabled={page === 0}
                    aria-label="first page"
                    onClick={handleFirstPageButtonClick}
                >
                    {theme.direction === `rtl` ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    disabled={page === 0}
                    aria-label="previous page"
                    onClick={handleBackButtonClick}>
                    {theme.direction === `rtl` ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                </IconButton>
                <IconButton
                    disabled={page >= lastPage}
                    aria-label="next page"
                    onClick={handleNextButtonClick}
                >
                    {theme.direction === `rtl` ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
                <IconButton
                    disabled={page >= lastPage}
                    aria-label="last page"
                    onClick={handleLastPageButtonClick}
                >
                    {theme.direction === `rtl` ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    };

    return (
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={Math.min(page, lastPage)}
            ActionsComponent={actions}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
        />
    );
}