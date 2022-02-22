import BaseTable,
{
    BaseProps as BaseTableProps,
    BaseTableData,
} from "../Common/BaseTable";
import { Order } from "../Common/Head";
import { DEFAULT_ROWS_PER_PAGE } from "../Common/Pagination/shared";
import PageTablePagination from "./Pagination";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core";
import {
    clamp,
    isEqual,
} from "lodash";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({}));

export interface PageTableData<T> extends BaseTableData<T> {
    page: number;
}

export interface Props<T> extends BaseTableProps<T> {
    page?: number;
    onChange?: (tableData: PageTableData<T>) => void;
}

export default function PageTable<T> (props: Props<T>) {
    const {
        page = 0,
        rowsPerPage = DEFAULT_ROWS_PER_PAGE,
        rowsPerPageOptions = [
            10,
            25,
            50,
        ],
        total,
        loading,
        localization,
        onChange,
        ...other
    } = props;

    const classes = useStyles();
    const [ page_, setPage ] = useState(page);
    const [ rowsPerPage_, setRowsPerPage ] = useState(rowsPerPage);
    const [ baseTableData, setBaseTableData ] = useState<BaseTableData<T>>({
        columns: other.columns.filter(({ hidden }) => !hidden).map(({ id }) => id),
        order: [ `asc`, `desc` ].includes(other.order ?? ``) ? other.order as Order : `desc`,
        rows: other.rows,
        rowsPerPage: rowsPerPage,
        search: other.search ?? ``,
        selectedRows: other.selectedRows ?? [],
        total: total ?? 0,
        groupBy: other.columns.find((column) => column.id === other.groupBy)?.id,
        orderBy: other.columns.find((column) => column.id === other.orderBy)?.id ?? other.idField,
        subgroupBy: other.subgroupBy,
    });

    const lastPage = Math.ceil((total ?? baseTableData.total) / rowsPerPage) - 1;
    const localPageStartSlice = total === undefined ? clamp(page_, 0, lastPage) * rowsPerPage_ : undefined;
    const localPageEndSlice = total === undefined ? clamp(page_, 0, lastPage) * rowsPerPage_ + rowsPerPage_ : undefined;

    const handlePageChange = (page: number) => {
        const newPage = clamp(page, 0, lastPage);
        setPage(newPage);
        onChange?.({
            ...baseTableData,
            page: newPage,
            rowsPerPage: rowsPerPage_,
        });
    };

    const handleRowsPerPageChange = (rowsPerPage: number) => {
        const newPage = 0;
        setRowsPerPage(rowsPerPage);
        setPage(newPage);
        onChange?.({
            ...baseTableData,
            page: newPage,
            rowsPerPage,
        });
    };

    const handleTableChange = (tableData: BaseTableData<T>) => {
        if (isEqual(tableData, baseTableData)) return;
        const searchWatchingFields: Extract<keyof BaseTableData<T>, string>[] = [
            `order`,
            `orderBy`,
            `rowsPerPage`,
            `search`,
            `subgroupBy`,
        ];
        const resetPage = searchWatchingFields.some((field) => !isEqual(tableData[field], baseTableData[field]));
        if (resetPage && page_ !== 0) setPage(0);
        setBaseTableData(tableData);
        onChange?.({
            ...tableData,
            page: resetPage ? 0 : page_,
            rowsPerPage: rowsPerPage_,
        });
    };

    return (
        <BaseTable
            PaginationComponent={
                <PageTablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={total ?? baseTableData?.total ?? 0}
                    rowsPerPage={rowsPerPage_}
                    page={page_}
                    localization={localization?.pagination}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                />
            }
            loading={loading}
            localization={localization}
            rowsPerPage={rowsPerPage_}
            localPageStartSlice={localPageStartSlice}
            localPageEndSlice={localPageEndSlice}
            total={total}
            onChange={handleTableChange}
            {...other}
        />
    );
}
