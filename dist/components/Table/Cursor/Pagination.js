"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));
function CursorTablePagination(props) {
    const { rowsPerPageOptions, count, rowsPerPage, localization, hasNextPage, hasPreviousPage, onChangePage, onChangeRowsPerPage, } = props;
    const classes = useStyles();
    const theme = (0, core_1.useTheme)();
    const handleChangeRowsPerPage = (event) => onChangeRowsPerPage?.(parseInt(event.target.value, 10));
    const actions = () => {
        const handleFirstPageButtonClick = () => {
            onChangePage(`first`);
        };
        const handleBackButtonClick = () => {
            onChangePage(`previous`);
        };
        const handleNextButtonClick = () => {
            onChangePage(`next`);
        };
        const handleLastPageButtonClick = () => {
            onChangePage(`last`);
        };
        return (react_1.default.createElement("div", { className: classes.root },
            react_1.default.createElement(core_1.Tooltip, { title: localization?.firstPage ?? `First page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: !hasPreviousPage, "aria-label": "first page", onClick: handleFirstPageButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.LastPage, null) : react_1.default.createElement(icons_1.FirstPage, null)))),
            react_1.default.createElement(core_1.Tooltip, { title: localization?.prevPage ?? `Previous page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: !hasPreviousPage, "aria-label": "previous page", onClick: handleBackButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.KeyboardArrowRight, null) : react_1.default.createElement(icons_1.KeyboardArrowLeft, null)))),
            react_1.default.createElement(core_1.Tooltip, { title: localization?.nextPage ?? `Next page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: !hasNextPage, "aria-label": "next page", onClick: handleNextButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.KeyboardArrowLeft, null) : react_1.default.createElement(icons_1.KeyboardArrowRight, null)))),
            react_1.default.createElement(core_1.Tooltip, { title: localization?.lastPage ?? `Last page` },
                react_1.default.createElement("span", null,
                    react_1.default.createElement(core_1.IconButton, { disabled: !hasNextPage, "aria-label": "last page", onClick: handleLastPageButtonClick }, theme.direction === `rtl` ? react_1.default.createElement(icons_1.FirstPage, null) : react_1.default.createElement(icons_1.LastPage, null))))));
    };
    return (react_1.default.createElement(core_1.TablePagination, { rowsPerPageOptions: rowsPerPageOptions, labelRowsPerPage: localization?.rowsPerPage, labelDisplayedRows: localization?.total ? (({ count }) => localization?.total?.(count)) : ({ count }) => `${count} result${count !== 1 ? `s` : ``}`, component: "div", count: count, rowsPerPage: rowsPerPage, page: 0, ActionsComponent: actions, onPageChange: () => { return; }, onRowsPerPageChange: handleChangeRowsPerPage }));
}
exports.default = CursorTablePagination;
