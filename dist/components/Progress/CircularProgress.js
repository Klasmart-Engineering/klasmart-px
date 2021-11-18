"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)({
    loadingContainer: {
        alignItems: `center`,
        display: `flex`,
        height: `100%`,
        justifyContent: `center`,
        left: 0,
        position: `absolute`,
        top: 0,
        width: `100%`,
    },
});
const buildStyling = (color, theme) => {
    switch (color) {
        case `action`: return {
            style: {
                color: theme.palette.action.active,
            },
        };
        case `white`: return {
            style: {
                color: theme.palette.common.white,
            },
        };
        default: return {
            color,
        };
    }
};
function CenterWrapper({ disableCentered, children }) {
    const classes = useStyles();
    if (disableCentered) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return react_1.default.createElement("span", { className: classes.loadingContainer }, children);
}
function CircularProgress(props) {
    const { className, showCancel, disableCentered, size = 24, color = `inherit`, } = props;
    const theme = (0, core_1.useTheme)();
    const styling = buildStyling(color, theme);
    return (react_1.default.createElement(CenterWrapper, { disableCentered: disableCentered },
        react_1.default.createElement(core_1.CircularProgress, { className: className, size: size, ...styling }),
        showCancel && react_1.default.createElement(icons_1.Close, { fontSize: "small" })));
}
exports.default = CircularProgress;
