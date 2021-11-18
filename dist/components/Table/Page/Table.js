"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseTable_1 = __importDefault(require("../Common/BaseTable"));
const shared_1 = require("../Common/Pagination/shared");
const Pagination_1 = __importDefault(require("./Pagination"));
const core_1 = require("@material-ui/core");
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({}));
function PageTable(props) {
    const { page = 0, rowsPerPage = shared_1.DEFAULT_ROWS_PER_PAGE, rowsPerPageOptions = [
        10,
        25,
        50,
    ], total, loading, localization, onChange, ...other } = props;
    const classes = useStyles();
    const [page_, setPage] = (0, react_1.useState)(page);
    const [rowsPerPage_, setRowsPerPage] = (0, react_1.useState)(rowsPerPage);
    const [baseTableData, setBaseTableData] = (0, react_1.useState)({
        columns: other.columns.filter(({ hidden }) => !hidden).map(({ id }) => id),
        order: [`asc`, `desc`].includes(other.order ?? ``) ? other.order : `desc`,
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
    const localPageStartSlice = total === undefined ? (0, lodash_1.clamp)(page_, 0, lastPage) * rowsPerPage_ : undefined;
    const localPageEndSlice = total === undefined ? (0, lodash_1.clamp)(page_, 0, lastPage) * rowsPerPage_ + rowsPerPage_ : undefined;
    const handlePageChange = (page) => {
        const newPage = (0, lodash_1.clamp)(page, 0, lastPage);
        setPage(newPage);
        onChange?.({
            ...baseTableData,
            page: newPage,
            rowsPerPage: rowsPerPage_,
        });
    };
    const handleRowsPerPageChange = (rowsPerPage) => {
        const newPage = 0;
        setRowsPerPage(rowsPerPage);
        setPage(newPage);
        onChange?.({
            ...baseTableData,
            page: newPage,
            rowsPerPage,
        });
    };
    const handleTableChange = (tableData) => {
        if ((0, lodash_1.isEqual)(tableData, baseTableData))
            return;
        const searchWatchingFields = [
            `order`,
            `orderBy`,
            `rowsPerPage`,
            `search`,
            `subgroupBy`,
        ];
        const resetPage = searchWatchingFields.some((field) => !(0, lodash_1.isEqual)(tableData[field], baseTableData[field]));
        if (resetPage && page_ !== 0)
            setPage(0);
        setBaseTableData(tableData);
        onChange?.({
            ...tableData,
            page: resetPage ? 0 : page_,
            rowsPerPage: rowsPerPage_,
        });
    };
    return (react_1.default.createElement(BaseTable_1.default, { PaginationComponent: react_1.default.createElement(Pagination_1.default, { rowsPerPageOptions: rowsPerPageOptions, count: total ?? baseTableData?.total ?? 0, rowsPerPage: rowsPerPage_, page: page_, localization: localization?.pagination, onChangePage: handlePageChange, onChangeRowsPerPage: handleRowsPerPageChange }), loading: loading, localization: localization, rowsPerPage: rowsPerPage_, localPageStartSlice: localPageStartSlice, localPageEndSlice: localPageEndSlice, total: total, onChange: handleTableChange, ...other }));
}
exports.default = PageTable;
