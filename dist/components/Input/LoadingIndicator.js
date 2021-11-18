"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    loading: {
        position: `absolute`,
        width: `100%`,
        bottom: `1px`,
        left: 0,
        height: 2,
    },
    loadingOutlined: {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
}));
function InputLoadingIndicator(props) {
    const { loading, variant } = props;
    const classes = useStyles();
    return (react_1.default.createElement(react_1.default.Fragment, null, loading && (react_1.default.createElement(core_1.LinearProgress, { className: (0, clsx_1.default)(classes.loading, {
            [classes.loadingOutlined]: variant === `outlined`,
        }) }))));
}
exports.default = InputLoadingIndicator;
