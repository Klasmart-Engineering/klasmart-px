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
const IconButton_1 = __importDefault(require("../../../Button/IconButton"));
const AddButton_1 = __importDefault(require("./AddButton"));
const Chips_1 = __importDefault(require("./Chips"));
const Menu_1 = __importDefault(require("./Menu"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        minHeight: 52,
        position: `relative`,
        padding: theme.spacing(0, 0.5),
    },
    iconRowContainer: {
        height: `inherit`,
        left: 0,
        top: 0,
        display: `flex`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        width: `100%`,
        pointerEvents: `none`,
    },
    iconContainer: {
        margin: theme.spacing(1.75, 1.5),
        color: theme.palette.grey[600],
    },
    chipsContainer: {
        margin: theme.spacing(1, 0),
        pointerEvents: `auto`,
        marginRight: `auto`,
    },
    clearIcon: {
        marginTop: 4,
        pointerEvents: `auto`,
    },
}));
function BaseTableFilter(props) {
    const { localization, onChange, filters: tableFilters, } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = (0, react_1.useState)(false);
    const [filters, setFilters] = (0, react_1.useState)([]);
    const [editingFilter, setEditingFilter] = (0, react_1.useState)();
    const availableTableFilters = tableFilters.filter((tableFilter) => !filters.find((filter) => filter.columnId === tableFilter.id) || tableFilter.id === editingFilter?.columnId);
    const isCreateFilter = !editingFilter;
    const handleOpenFilterMenu = (event, filter) => {
        setEditingFilter(filter);
        setAnchorEl(event.currentTarget);
        setIsFilterMenuOpen(true);
    };
    const handleDeleteFilter = (selectedFilter) => {
        setFilters((filters) => filters.filter((filter) => filter.columnId !== selectedFilter.columnId));
    };
    const handleClearFilters = () => {
        setFilters([]);
    };
    const handleClose = (updatedFilter) => {
        setFilters((filters) => {
            if (!updatedFilter)
                return filters;
            const updatedFilters = filters.map((filter) => filter.columnId === editingFilter?.columnId ? updatedFilter : filter);
            return [...updatedFilters, ...isCreateFilter ? [updatedFilter] : []];
        });
        setIsFilterMenuOpen(false);
    };
    (0, react_1.useEffect)(() => {
        onChange(filters);
    }, [filters]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classes.root },
            react_1.default.createElement(core_1.Box, { className: classes.iconRowContainer },
                react_1.default.createElement("div", { className: classes.iconContainer },
                    react_1.default.createElement(icons_1.FilterList, { color: "action" })),
                react_1.default.createElement("div", { className: classes.chipsContainer },
                    react_1.default.createElement(Chips_1.default, { localization: localization, tableFilters: tableFilters, filters: filters, onClick: handleOpenFilterMenu, onDelete: handleDeleteFilter }),
                    react_1.default.createElement(AddButton_1.default, { localization: localization, filters: filters, disabled: filters.length === tableFilters.length, onClick: handleOpenFilterMenu })),
                filters.length > 0 && (react_1.default.createElement(IconButton_1.default, { className: classes.clearIcon, icon: icons_1.Clear, tooltip: localization?.clearAll ?? `Clear filters`, "data-testid": "clearFilters", onClick: handleClearFilters })))),
        react_1.default.createElement(Menu_1.default, { anchorEl: anchorEl, isOpen: isFilterMenuOpen, editingFilter: editingFilter, tableFilters: availableTableFilters, localization: localization?.filterMenu, onClose: handleClose })));
}
exports.default = BaseTableFilter;
