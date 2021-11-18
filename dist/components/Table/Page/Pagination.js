"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));
function PageTablePagination(props) {
    const { rowsPerPageOptions, count, page, rowsPerPage, localization, onChangePage, onChangeRowsPerPage, } = props;
    const classes = useStyles();
    const theme = (0, core_1.useTheme)();
    const lastPage = Math.ceil(count / rowsPerPage) - 1;
    const actions = () => {
        const handleFirstPageButtonClick = () => {
            onChangePage((0, lodash_1.clamp)(0, 0, lastPage));
        };
        const handleBackButtonClick = () => {
            onChangePage((0, lodash_1.clamp)(page, 0, lastPage) - 1);
        };
        const handleNextButtonClick = () => {
            onChangePage((0, lodash_1.clamp)(page, 0, lastPage) + 1);
        };
        const handleLastPageButtonClick = () => {
            onChangePage((0, lodash_1.clamp)(lastPage, 0, lastPage));
        };
        return (react_1.default.createElement("div", { className: classes.root },
            react_1.default.createElement(core_1.Tooltip, { title: localization?.firstPage ?? `First page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: page === 0, "aria-label": "first page", onClick: handleFirstPageButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.LastPage, null) : react_1.default.createElement(icons_1.FirstPage, null)))),
            react_1.default.createElement(core_1.Tooltip, { title: localization?.prevPage ?? `Previous page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: page === 0, "aria-label": "previous page", onClick: handleBackButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.KeyboardArrowRight, null) : react_1.default.createElement(icons_1.KeyboardArrowLeft, null)))),
            react_1.default.createElement(core_1.Tooltip, { title: localization?.nextPage ?? `Next page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: page >= lastPage, "aria-label": "next page", onClick: handleNextButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.KeyboardArrowLeft, null) : react_1.default.createElement(icons_1.KeyboardArrowRight, null)))),
            react_1.default.createElement(core_1.Tooltip, { title: localization?.lastPage ?? `Last page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: page >= lastPage, "aria-label": "last page", onClick: handleLastPageButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.FirstPage, null) : react_1.default.createElement(icons_1.LastPage, null))))));
    };
    return (react_1.default.createElement(core_1.TablePagination, { rowsPerPageOptions: rowsPerPageOptions, labelRowsPerPage: localization?.rowsPerPage, labelDisplayedRows: localization?.fromToTotal ? (({ from, to, count, }) => localization?.fromToTotal?.(from, to, count)) : undefined, component: "div", count: count, rowsPerPage: rowsPerPage, page: (0, lodash_1.clamp)(page, 0, lastPage), ActionsComponent: actions, onPageChange: (event, page) => onChangePage(page), onRowsPerPageChange: (event) => onChangeRowsPerPage?.(parseInt(event.target.value, 10)) }));
}
exports.default = PageTablePagination;
