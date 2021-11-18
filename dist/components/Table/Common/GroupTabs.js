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
const Tabs_1 = __importDefault(require("../../Tabs"));
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        height: 53,
        "& .MuiInput-underline:before": {
            display: `none`,
        },
        "& .MuiInput-underline:after": {
            display: `none`,
        },
    },
    select: {
        minWidth: 150,
        "& .MuiSelect-root": {
            padding: theme.spacing(2 + 1 / 8, 6, 2 + 1 / 8, 2),
        },
        "& .MuiSelect-icon": {
            marginRight: theme.spacing(2),
        },
    },
    selectPlaceholderText: {
        color: theme.palette.grey[500],
        lineHeight: `inherit`,
    },
}));
function BaseTableGroupTabs(props) {
    const { allCount, groupBy, groups = [], subgroupBy, subgroups = [], hideAllGroupTab, hideNoGroupOption, localization, onSelectGroup, onSelectSubgroup, } = props;
    const classes = useStyles();
    const [groupBy_, setGroupBy] = (0, react_1.useState)(groupBy && groups.find((group) => group.id === groupBy) ? groupBy : ``);
    const [subgroupBy_, setSubgroupBy] = (0, react_1.useState)(subgroupBy);
    const handleSubgroupChange = (value) => {
        setSubgroupBy(value);
        onSelectSubgroup(value);
    };
    const handleGroupChange = (e, child) => {
        const value = e.target.value;
        setGroupBy(value);
        const newGroup = value === `` ? undefined : value;
        onSelectGroup(newGroup);
        if (subgroupBy_)
            handleSubgroupChange(undefined);
    };
    (0, react_1.useEffect)(() => {
        if (subgroupBy === subgroupBy_)
            return;
        setSubgroupBy(subgroupBy);
    }, [subgroupBy]);
    const hasSubGroupCountValues = subgroups.every((subgroup) => typeof subgroup.count === `number`);
    const tabs = [
        ...!hideAllGroupTab ? [
            {
                text: `${localization?.tabAll ?? `All`}${hasSubGroupCountValues ? ` (${allCount})` : ``}`,
                value: undefined,
            },
        ] : [],
        ...subgroups.map((subgroup) => ({
            text: `${subgroup.text}${typeof subgroup.count === `number` ? ` (${subgroup.count})` : ``}`,
            value: `${subgroup.value}`,
        })),
    ];
    const hasValidSubgroupValue = (0, react_1.useMemo)(() => {
        return tabs.find((tab) => tab.value === subgroupBy_);
    }, [
        tabs,
        subgroupBy_,
        hideAllGroupTab,
    ]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", className: classes.root },
            hasValidSubgroupValue
                ? (react_1.default.createElement(Tabs_1.default, { value: subgroupBy_, tabs: tabs, onChange: handleSubgroupChange })) : (react_1.default.createElement(core_1.Box, { display: "flex", flex: "1" })),
            groups.length > 1 && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.Divider, { orientation: "vertical" }),
                react_1.default.createElement(core_1.Select, { displayEmpty: true, value: groupBy_, className: classes.select, renderValue: groupBy_ !== `` ? undefined : () => (react_1.default.createElement(core_1.Typography, { variant: "body1", className: classes.selectPlaceholderText }, localization?.selectLabel ?? `Group by`)), onChange: handleGroupChange },
                    !hideNoGroupOption && react_1.default.createElement(core_1.MenuItem, { value: "" }, localization?.selectNone ?? `None`),
                    groups?.map((group, i) => (react_1.default.createElement(core_1.MenuItem, { key: `group-${i}`, value: group.id }, group.label)))))))));
}
exports.default = BaseTableGroupTabs;
