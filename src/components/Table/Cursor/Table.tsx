import BaseTable,
{
    BaseProps as BaseTableProps,
    BaseTableData,
} from "../Common/BaseTable";
import CursorTablePagination,
{ TableDirection } from "./Pagination";
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

const defaultBaseTableData = {
    columns: [],
    rows: [],
    selectedRows: [],
    rowsPerPage: 0,
    search: ``,
    total: 0,
    subgroupBy: ``,
};

export interface CursorTableData<T> extends BaseTableData<T> {
    cursor?: string;
}

interface Props<T> extends BaseTableProps<T> {
    cursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | undefined;
    endCursor: string | undefined;
    onChange?: (tableData: CursorTableData<T>) => void;
}

export default function CursorTable<T> (props: Props<T>) {
    const {
        cursor,
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
        total = 0,
        rowsPerPage = 10,
        rowsPerPageOptions = [
            10,
            25,
            50,
        ],
        localization,
        onChange,
        ...other
    } = props;
    const classes = useStyles();
    const [ cursor_, setCursor ] = useState(cursor);
    const [ rowsPerPage_, setRowsPerPage ] = useState(rowsPerPage);
    const [ prevBaseTableData, setPrevBaseTableData ] = useState<BaseTableData<T>>(defaultBaseTableData);
    const [ baseTableData, setBaseTableData ] = useState<BaseTableData<T>>(defaultBaseTableData);

    const handlePageChange = (direction: TableDirection) => {
        const { order } = baseTableData;
        switch (direction) {
        case `start`:
        case `end`:
            setCursor(undefined);
            return;
        case `previous`:
            setCursor(order === `asc` ? endCursor : startCursor);
            return;
        case `next`:
            setCursor(order === `asc` ? startCursor : endCursor);
            return;
        }
    };

    useEffect(() => {
        setPrevBaseTableData(baseTableData);
        if (baseTableData.search !== prevBaseTableData.search
            || baseTableData.subgroupBy !== prevBaseTableData.subgroupBy
            || baseTableData.rowsPerPage !== prevBaseTableData.rowsPerPage) {
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
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    count={baseTableData.total}
                    rowsPerPage={rowsPerPage_}
                    rowsPerPageOptions={rowsPerPageOptions}
                    localization={localization?.pagination}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={setRowsPerPage}
                />
            }
            rowsPerPage={rowsPerPage_}
            total={total}
            onChange={setBaseTableData}
            {...other}
        />
    );
}
