import BaseTable,
{
    BaseProps as BaseTableProps,
    BaseTableData,
} from "../Common/BaseTable";
import PageTablePagination from "./Pagination";
import {
    createStyles,
    makeStyles,
} from "@material-ui/core";
import { clamp } from "lodash";
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

export interface PageTableData<T> extends BaseTableData<T> {
    page: number;
}

interface Props<T> extends BaseTableProps<T> {
    page: number;
    onChange?: (tableData: PageTableData<T>) => void;
}

export default function CursorTable<T> (props: Props<T>) {
    const {
        loading,
        localization,
        page = 0,
        rowsPerPage = 10,
        total,
        rowsPerPageOptions = [
            10,
            25,
            50,
        ],
        onChange,
        ...other
    } = props;

    const classes = useStyles();
    const [ page_, setPage ] = useState(page);
    const [ rowsPerPage_, setRowsPerPage ] = useState(rowsPerPage);
    const [ prevBaseTableData, setPrevBaseTableData ] = useState<BaseTableData<T>>(defaultBaseTableData);
    const [ baseTableData, setBaseTableData ] = useState<BaseTableData<T>>(defaultBaseTableData);

    const lastPage = Math.ceil(baseTableData.total / rowsPerPage_) - 1;

    useEffect(() => {
        // set start page when loading finishes
        if (loading) return;
        const newPage = clamp(page ?? page_, 0, lastPage);
        if (newPage === page_) return;
        setPage(clamp(page ?? page_, 0, lastPage));
    }, [ baseTableData.total ]);

    useEffect(() => {
        // clamp page
        const newPage = clamp(page_, 0, lastPage);
        if (newPage === page_) return;
        setPage(clamp(page_, 0, lastPage));
    }, [ page_ ]);

    useEffect(() => {
        setPrevBaseTableData(baseTableData);
        if (baseTableData.search !== prevBaseTableData.search
            || baseTableData.subgroupBy !== prevBaseTableData.subgroupBy
            || baseTableData.rowsPerPage !== prevBaseTableData.rowsPerPage) {
            setPage(0);
            return;
        }
        onChange?.({
            ...baseTableData,
            page: page_,
        });
    }, [ baseTableData, page_ ]);

    return (
        <BaseTable
            PaginationComponent={
                <PageTablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={baseTableData.total}
                    rowsPerPage={rowsPerPage_}
                    page={page_}
                    localization={localization?.pagination}
                    onChangePage={setPage}
                    onChangeRowsPerPage={setRowsPerPage}
                />
            }
            loading={loading}
            localization={localization}
            rowsPerPage={rowsPerPage_}
            localStartSlice={page_ * rowsPerPage_}
            localEndSlice={page_ * rowsPerPage_ + rowsPerPage_}
            total={total}
            onChange={setBaseTableData}
            {...other}
        />
    );
}
