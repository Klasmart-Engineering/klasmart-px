"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IconButton_1 = __importDefault(require("./Button/IconButton"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        "& .MuiDrawer-paper": {
            width: 320,
        },
    },
    toolbar: {
        padding: theme.spacing(0, 2),
    },
    closeButton: {
        marginRight: theme.direction === `rtl` ? undefined : theme.spacing(-1),
        marginLeft: theme.direction === `rtl` ? theme.spacing(-1) : undefined,
    },
    sectionHeaderContainer: {
        minHeight: 32,
    },
    sectionHeader: {
        lineHeight: `36px`,
        fontSize: `0.8em`,
        fontWeight: 600,
        textTransform: `uppercase`,
    },
}));
function DrawerSection(props) {
    const { header, content } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Box, { py: 1 },
        header && (react_1.default.createElement(core_1.Toolbar, { className: (0, clsx_1.default)(classes.toolbar, classes.sectionHeaderContainer) },
            react_1.default.createElement(core_1.Typography, { variant: "caption", color: "textSecondary", className: classes.sectionHeader }, header))),
        content));
}
function Drawer(props) {
    const { open, title, sections, onClose, } = props;
    const classes = useStyles();
    const theme = (0, core_1.useTheme)();
    return (react_1.default.createElement(core_1.Drawer, { className: classes.root, anchor: "right", open: open, onClose: onClose },
        title && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(core_1.Toolbar, { className: classes.toolbar },
                react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: theme.direction === `rtl` ? `row-reverse` : `row`, alignItems: "center", flex: 1 },
                    react_1.default.createElement(core_1.Typography, { variant: "h6" }, title),
                    react_1.default.createElement(core_1.Box, { flex: "1" }),
                    react_1.default.createElement(IconButton_1.default, { className: classes.closeButton, icon: icons_1.Close, onClick: () => onClose({}, `escapeKeyDown`) }))),
            react_1.default.createElement(core_1.Divider, null))),
        sections.map((section, i) => (react_1.default.createElement(react_1.default.Fragment, { key: `section-${i}` },
            react_1.default.createElement(DrawerSection, { header: section.header, content: section.content }),
            i !== sections.length - 1 && react_1.default.createElement(core_1.Divider, null))))));
}
exports.default = Drawer;
