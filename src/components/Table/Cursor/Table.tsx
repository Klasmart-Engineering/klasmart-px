import BaseTable,
{
    BaseProps as BaseTableProps,
    BaseTableData,
} from "../Common/BaseTable";
import { Order } from "../Common/Head";
import { ROWS_PER_PAGE } from "../Common/Pagination/shared";
import CursorTablePagination,
{ Page } from "./Pagination";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core";
import React,
{
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({}));

export interface CursorTableData<T> extends BaseTableData<T> {
    cursor?: string;
}

interface Props<T> extends BaseTableProps<T> {
    cursor?: string;
    hasNextPage: boolean | undefined;
    hasPreviousPage: boolean | undefined;
    startCursor: string | undefined;
    endCursor: string | undefined;
    onChange?: (tableData: CursorTableData<T>) => void;
    onPageChange?: (page: Page, order: Order, cursor?: string) => void;
}

export default function CursorTable<T> (props: Props<T>) {
    const {
        cursor,
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
        total,
        rowsPerPage = ROWS_PER_PAGE,
        rowsPerPageOptions = [
            10,
            25,
            50,
        ],
        localization,
        onChange,
        onPageChange,
        ...other
    } = props;
    const classes = useStyles();
    const [ cursor_, setCursor ] = useState(cursor);
    const [ rowsPerPage_, setRowsPerPage ] = useState(rowsPerPage);
    const [ prevBaseTableData, setPrevBaseTableData ] = useState<BaseTableData<T>>();
    const [ baseTableData, setBaseTableData ] = useState<BaseTableData<T>>();

    const handlePageChange = (direction: Page) => {
        const order = baseTableData?.order ?? `desc`;
        let cursor;
        switch (direction) {
        case `start`:
        case `end`:
            break;
        case `previous`:
            cursor = order === `asc` ? endCursor : startCursor;
            break;
        case `next`:
            cursor = order === `asc` ? startCursor : endCursor;
            break;
        }
        setCursor(cursor);
        onPageChange?.(direction, order, cursor);
    };

    useEffect(() => {
        setPrevBaseTableData(baseTableData);
        if (!baseTableData) return;
        if (baseTableData?.search !== prevBaseTableData?.search
            || baseTableData?.subgroupBy !== prevBaseTableData?.subgroupBy
            || baseTableData?.rowsPerPage !== prevBaseTableData?.rowsPerPage
            || baseTableData?.order !== prevBaseTableData?.order) {
            handlePageChange(`start`);
            return;
        }
        onChange?.({
            ...baseTableData,
            cursor: cursor_,
        });
    }, [ baseTableData, cursor_ ]);

    return (
        <BaseTable
            PaginationComponent={
                <CursorTablePagination
                    hasNextPage={baseTableData?.order === `asc` ? hasPreviousPage : hasNextPage}
                    hasPreviousPage={baseTableData?.order === `asc` ? hasNextPage : hasPreviousPage}
                    count={baseTableData?.total ?? 0}
                    rowsPerPage={rowsPerPage_}
                    rowsPerPageOptions={rowsPerPageOptions}
                    localization={localization?.pagination}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={setRowsPerPage}
                />
            }
            rowsPerPage={rowsPerPage_}
            total={total}
            localization={localization}
            onChange={setBaseTableData}
            {...other}
        />
    );
}
