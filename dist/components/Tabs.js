"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    tabRoot: {
        minWidth: `inherit`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    tabIndicator: {
        height: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    tabsContainer: {
        flex: 1,
        backgroundColor: `transparent !important`,
        "& .MuiTabs-flexContainer": {
            height: `100%`,
        },
        "& .MuiTab-root": {
            backgroundColor: `transparent !important`,
        },
        "& .Mui-selected": {
            color: theme.palette.primary.contrastText,
        },
    },
}));
function Tabs(props) {
    const { className, tabs, value, valuesAsPaths, onChange, } = props;
    const classes = useStyles();
    const handleChange = (event, value) => {
        onChange?.(value !== 0 ? value : undefined);
    };
    return (react_1.default.createElement(core_1.Tabs, { value: tabs.find((tab) => tab.value === value)?.value ?? 0, TabIndicatorProps: {
            className: classes.tabIndicator,
        }, indicatorColor: "primary", variant: "scrollable", scrollButtons: "auto", className: (0, clsx_1.default)(classes.tabsContainer, className), onChange: handleChange }, tabs.map((tab, i) => (react_1.default.createElement(core_1.Tab, { key: `tab-${i}`, className: classes.tabRoot, label: `${tab.text}`, href: valuesAsPaths ? `#${tab.value}` : ``, value: tab.value })))));
}
exports.default = Tabs;
