"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    loadingContainer: {
        "& th": {
            position: `relative`,
            padding: 0,
        },
    },
    loading: {
        position: `absolute`,
        width: `100%`,
    },
}));
function BaseTableLoading(props) {
    const { loading, columnCount, } = props;
    const classes = useStyles();
    return (react_1.default.createElement("thead", { className: classes.loadingContainer },
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { colSpan: columnCount }, loading && react_1.default.createElement(core_1.LinearProgress, { className: classes.loading })))));
}
exports.default = BaseTableLoading;
