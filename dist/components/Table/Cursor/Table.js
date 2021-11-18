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
function CursorTable(props) {
    const { cursor, hasNextPage, hasPreviousPage, startCursor, endCursor, total, rowsPerPage = shared_1.DEFAULT_ROWS_PER_PAGE, rowsPerPageOptions = [
        10,
        25,
        50,
    ], localization, order, onChange, onPageChange, ...other } = props;
    const classes = useStyles();
    const [cursor_, setCursor] = (0, react_1.useState)(cursor);
    const [rowsPerPage_, setRowsPerPage] = (0, react_1.useState)(rowsPerPage);
    const [baseTableData, setBaseTableData] = (0, react_1.useState)();
    const searchWatchingFields = [
        `order`,
        `orderBy`,
        `rowsPerPage`,
        `search`,
        `subgroupBy`,
    ];
    const handleTableChange = (tableData) => {
        if ((0, lodash_1.isEqual)(tableData, baseTableData))
            return;
        const resetPage = searchWatchingFields.some((field) => !(0, lodash_1.isEqual)(tableData[field], baseTableData?.[field]));
        setBaseTableData(tableData);
        const newCursor = resetPage ? undefined : cursor_;
        setCursor(newCursor);
        onChange?.({
            ...tableData,
            cursor: newCursor,
            rowsPerPage: rowsPerPage_,
        });
    };
    const handlePageChange = (pageChange) => {
        const order = baseTableData?.order ?? shared_1.DEFAULT_SORT_ORDER;
        const rowsPerPage = baseTableData?.rowsPerPage ?? shared_1.DEFAULT_ROWS_PER_PAGE;
        let cursor;
        switch (pageChange) {
            case `first`:
            case `last`:
                break;
            case `previous`:
                cursor = startCursor;
                break;
            case `next`:
                cursor = endCursor;
                break;
        }
        setCursor(cursor);
        onPageChange?.(pageChange, order, cursor, rowsPerPage);
    };
    const handleRowsPerPageChange = (rowsPerPage) => {
        if (!baseTableData)
            return;
        setRowsPerPage(rowsPerPage);
        onChange?.({
            ...baseTableData,
            cursor: cursor_,
            rowsPerPage,
        });
    };
    return (react_1.default.createElement(BaseTable_1.default, { PaginationComponent: react_1.default.createElement(Pagination_1.default, { hasNextPage: hasNextPage, hasPreviousPage: hasPreviousPage, count: baseTableData?.total ?? 0, rowsPerPage: rowsPerPage_, rowsPerPageOptions: rowsPerPageOptions, localization: localization?.pagination, onChangePage: handlePageChange, onChangeRowsPerPage: handleRowsPerPageChange }), rowsPerPage: rowsPerPage_, total: total, localization: localization, order: order, onChange: handleTableChange, ...other }));
}
exports.default = CursorTable;
