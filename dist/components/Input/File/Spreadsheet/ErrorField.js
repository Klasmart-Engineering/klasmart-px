"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    errorIcon: {
        marginLeft: theme.spacing(1),
    },
}));
const WrappedTextTooltip = (0, core_1.withStyles)({
    tooltip: {
        whiteSpace: `pre-wrap`,
    },
})(core_1.Tooltip);
function ErrorField(props) {
    const { fieldText, errors } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
        react_1.default.createElement(core_1.Typography, null, fieldText),
        react_1.default.createElement(WrappedTextTooltip, { title: errors.map((error) => error.message).join(`\n`) },
            react_1.default.createElement(icons_1.Error, { color: "error", className: classes.errorIcon }))));
}
exports.default = ErrorField;
