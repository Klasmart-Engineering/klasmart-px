import BaseTable,
{
    BaseProps as BaseTableProps,
    BaseTableData,
} from "../Common/BaseTable";
import { Order } from "../Common/Head";
import {
    PageChange,
    ROWS_PER_PAGE,
} from "../Common/Pagination/shared";
import CursorTablePagination from "./Pagination";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core";
import { isEqual } from "lodash";
import React,
{ useState } from "react";

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
    onPageChange?: (page: PageChange, order: Order, cursor: string | undefined, rowsPerPage: number) => void;
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
    const [ baseTableData, setBaseTableData ] = useState<BaseTableData<T>>();

    const searchWatchingFields: Extract<keyof BaseTableData<T>, string>[] = [
        `order`,
        `orderBy`,
        `rowsPerPage`,
        `search`,
        `subgroupBy`,
    ];

    const handleTableChange = (tableData: BaseTableData<T>) => {
        if (isEqual(tableData, baseTableData)) return;
        const resetPage = searchWatchingFields.some((field) => !isEqual(tableData[field], baseTableData?.[field]));
        setBaseTableData(tableData);
        const newCursor = resetPage ? undefined : cursor_;
        setCursor(newCursor);
        onChange?.({
            ...tableData,
            cursor: newCursor,
            rowsPerPage: rowsPerPage_,
        });
    };

    const handlePageChange = (pageChange: PageChange) => {
        const order = baseTableData?.order ?? `desc`;
        const rowsPerPage = baseTableData?.rowsPerPage ?? ROWS_PER_PAGE;
        let cursor;
        switch (pageChange) {
        case `first`:
        case `last`:
            break;
        case `previous`:
            cursor = order === `asc` ? endCursor : startCursor;
            break;
        case `next`:
            cursor = order === `asc` ? startCursor : endCursor;
            break;
        }
        setCursor(cursor);
        onPageChange?.(pageChange, order, cursor, rowsPerPage);
    };

    const handleRowsPerPageChange = (rowsPerPage: number) => {
        if (!baseTableData) return;
        setRowsPerPage(rowsPerPage);
        onChange?.({
            ...baseTableData,
            cursor: cursor_,
            rowsPerPage,
        });
    };

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
                    onChangeRowsPerPage={handleRowsPerPageChange}
                />
            }
            rowsPerPage={rowsPerPage_}
            total={total}
            localization={localization}
            onChange={handleTableChange}
            {...other}
        />
    );
}
