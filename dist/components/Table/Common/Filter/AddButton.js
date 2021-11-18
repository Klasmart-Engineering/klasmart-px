"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    chip: {
        margin: theme.spacing(0.5, 0.5),
    },
    addChip: {
        marginLeft: 4,
        '& .MuiChip-icon': {
            marginRight: -20,
            marginLeft: 4,
        },
    },
    chipText: {
        whiteSpace: `break-spaces`,
    },
}));
function AddButton(props) {
    const { localization, filters, disabled, onClick, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Tooltip, { title: disabled
            ? (localization?.noAvailableFilters ?? `All columns already have a filter specified`)
            : (filters.length > 0
                ? (localization?.filterMenu?.addFilter ?? `Add Filter`)
                : ``) },
        react_1.default.createElement("span", null,
            react_1.default.createElement(core_1.Chip, { disabled: disabled, className: filters.length > 0
                    ? classes.addChip
                    : classes.chip, icon: react_1.default.createElement(icons_1.Add, { color: "action" }), label: filters.length > 0 ? `` : (localization?.filterMenu?.addFilter ?? `Add Filter`), onClick: onClick }))));
}
exports.default = AddButton;
