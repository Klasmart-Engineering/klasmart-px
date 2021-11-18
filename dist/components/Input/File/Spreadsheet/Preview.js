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
const ErrorField_1 = __importDefault(require("./ErrorField"));
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        backgroundColor: theme.palette.grey[100],
        width: `100%`,
        height: `100%`,
        overflow: `auto`,
    },
    table: {
        borderSpacing: 0,
        borderCollapse: `collapse`,
        borderLeft: `1px solid ${theme.palette.grey[500]}`,
        borderTop: `1px solid ${theme.palette.grey[500]}`,
    },
    error: {},
    cell: {
        boxShadow: `inset -1px -1px 0px ${theme.palette.grey[500]}`,
        padding: theme.spacing(1, 2),
        borderColor: theme.palette.grey[500],
        backgroundColor: theme.palette.common.white,
        "&$error": {
            backgroundColor: (0, core_1.lighten)(theme.palette.error.main, 0.66),
        },
        "&$header": {
            backgroundColor: theme.palette.grey[200],
            "&$error": {
                backgroundColor: (0, core_1.lighten)(theme.palette.error.main, 0.5),
            },
            "& *": {
                fontWeight: 600,
            },
        },
    },
    header: {
        position: `sticky`,
        top: -1,
        left: -1,
    },
}));
const findGeneralErrors = (errors) => {
    return errors.filter((error) => error.row === undefined && error.column === undefined);
};
const findRowErrors = (errors, row, columns) => {
    return errors.filter((error) => error.row === row && !columns?.includes(error.column ?? ``));
};
const hasRowError = (errors, row) => {
    return !!errors.find((error) => error.row === row);
};
const findColumnErrors = (errors, column) => {
    return errors.filter((error) => error.column === column && !error.row);
};
const hasColumnError = (errors, column) => {
    return !!errors.find((error) => error.column === column);
};
const findFieldErrors = (errors, row, column) => {
    return errors.filter((error) => error.row === row && error.column === column);
};
function PreviewSpreadsheet(props) {
    const { className, file, errors, onParseFile, } = props;
    const classes = useStyles();
    const [data, setData] = (0, react_1.useState)();
    const loadSpreadsheet = async () => {
        const parsedData = await onParseFile(file);
        setData((data) => [...data ? data : [], ...parsedData]);
    };
    (0, react_1.useEffect)(() => {
        loadSpreadsheet();
    }, []);
    const columns = data?.slice(0, 1)[0]?.map((c) => c.trim()) ?? [];
    const rows = data?.slice(1) ?? [];
    const buildField = (fieldText, errors) => {
        if (errors.length > 0)
            return (react_1.default.createElement(ErrorField_1.default, { fieldText: fieldText, errors: errors }));
        return react_1.default.createElement(core_1.Typography, null, fieldText);
    };
    const generalErrors = findGeneralErrors(errors);
    return (react_1.default.createElement("div", { "data-testid": "preview", className: (0, clsx_1.default)(className, classes.root) },
        react_1.default.createElement("table", { className: classes.table },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: (0, clsx_1.default)(classes.cell, classes.header, {
                            [classes.error]: generalErrors.length > 0,
                        }) }, buildField(``, generalErrors)),
                    columns.map((columnName, i) => {
                        const columnErrors = findColumnErrors(errors, columnName);
                        return (react_1.default.createElement("th", { key: `column-${i}`, className: (0, clsx_1.default)(classes.cell, classes.header, {
                                [classes.error]: hasColumnError(errors, columnName),
                            }) }, buildField(columnName, columnErrors)));
                    }))),
            react_1.default.createElement("tbody", null, rows.map((row, i) => {
                const rowErrors = findRowErrors(errors, i + 1, columns);
                return (react_1.default.createElement("tr", { key: `row-${i}` },
                    react_1.default.createElement("td", { className: (0, clsx_1.default)(classes.cell, classes.header, {
                            [classes.error]: hasRowError(errors, i + 1),
                        }) }, buildField(i + 1, rowErrors)),
                    row.map((field, j) => {
                        const fieldErrors = findFieldErrors(errors, i + 1, columns[j]);
                        return (react_1.default.createElement("td", { key: `field-${i}-${j}`, className: (0, clsx_1.default)(classes.cell, {
                                [classes.error]: (rowErrors.length > 0 && fieldErrors.length === 0) || fieldErrors.length > 0,
                            }) }, buildField(field, fieldErrors)));
                    })));
            })))));
}
exports.default = PreviewSpreadsheet;
