"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    typeIcon: {
        marginRight: theme.spacing(1),
    },
}));
const typeToIcon = (type) => {
    switch (type) {
        case `error`: return icons_1.Error;
        case `info`: return icons_1.Info;
        case `success`: return icons_1.Check;
        case `warning`: return icons_1.Warning;
        default: return icons_1.Help;
    }
};
function DialogTitle(props) {
    const { title, variant, hideIcon, ...rest } = props;
    const classes = useStyles();
    const theme = (0, core_1.useTheme)();
    const Icon = typeToIcon(variant);
    return (react_1.default.createElement(core_1.DialogTitle, { style: {
            color: variant ? `white` : undefined,
            backgroundColor: variant ? theme.palette[variant].main : undefined,
        }, ...rest }, variant && !hideIcon && typeof title === `string`
        ? (react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center" },
            react_1.default.createElement(Icon, { className: classes.typeIcon }),
            title))
        : title));
}
exports.default = DialogTitle;
