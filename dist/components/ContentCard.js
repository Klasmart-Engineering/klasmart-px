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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    card: {
        position: `relative`,
    },
    cardActionArea: {
        '&::before': {
            backgroundColor: `#FFF`,
            borderRadius: `inherit`,
            bottom: 0,
            content: `""`,
            left: 0,
            opacity: .0,
            position: `absolute`,
            pointerEvents: `none`,
            right: 0,
            top: 0,
            transition: `opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        },
        '&.selected::before': {
            opacity: .66,
        },
    },
    cardMedia: {},
    checkbox: {
        position: `absolute`,
        top: 0,
        margin: theme.spacing(1),
    },
    checkboxBackground: {
        position: `absolute`,
        margin: theme.spacing(1),
        backgroundColor: `#fff`,
        width: 16,
        height: 16,
        top: 13,
        left: 13,
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: 10,
    },
    authorName: {
        marginLeft: `${theme.spacing(1.5)}px !important`,
    },
    cardContent: {
        padding: theme.spacing(1, 1),
        height: 82,
    },
    assetTypeIcon: {
        marginRight: theme.spacing(2),
    },
    descripton: {
        WebkitBoxOrient: `vertical`,
        WebkitLineClamp: 2,
        display: `-webkit-box`,
        overflow: `hidden`,
    },
    actionButton: {
        marginLeft: `${theme.spacing(0.5)}px !important`,
    },
}));
function ContentCard(props) {
    const classes = useStyles();
    const { actions, author, assetType, checkbox, description, imageUrl, title, onClick, className, ...other } = props;
    function getAssetTypeIcon(type) {
        switch (type) {
            case `lessonMaterial`: return react_1.default.createElement(icons_1.Category, null);
            case `lessonPlan`: return react_1.default.createElement(icons_1.Subscriptions, null);
            default: return react_1.default.createElement(icons_1.Help, null);
        }
    }
    function getAssetTypeLabel(type) {
        switch (type) {
            case `lessonMaterial`: return `Material`;
            case `lessonPlan`: return `Plan`;
            default: return `Unknown`;
        }
    }
    return (react_1.default.createElement(core_1.Card, { className: [className, classes.card].join(` `), ...other },
        react_1.default.createElement(core_1.CardActionArea, { className: `${classes.cardActionArea} ${checkbox?.checked ? `selected` : ``}`, "data-testid": "card-action-area", onClick: onClick },
            react_1.default.createElement(core_1.CardMedia, { component: "img", alt: `${title} Image`, height: "150", image: imageUrl, title: `${title} Image`, className: classes.cardMedia, "data-testid": "card-media" })),
        checkbox && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: classes.checkboxBackground }),
            react_1.default.createElement(core_1.Checkbox, { checked: checkbox.checked, inputProps: {
                    'aria-label': `checkbox ${checkbox.checked ? `selected` : `deselected`} ${title}`,
                    role: `checkbox`,
                }, className: classes.checkbox, onChange: checkbox.onChange }))),
        react_1.default.createElement(core_1.CardContent, { className: classes.cardContent },
            react_1.default.createElement(core_1.Box, { justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row" },
                react_1.default.createElement(core_1.Box, null,
                    react_1.default.createElement(core_1.Tooltip, { title: getAssetTypeLabel(assetType) }, (0, react_1.cloneElement)(getAssetTypeIcon(assetType), {
                        color: `primary`,
                        className: classes.assetTypeIcon,
                        fontSize: `small`,
                    }))),
                react_1.default.createElement(core_1.Box, { flex: "1", minWidth: "0" },
                    react_1.default.createElement(core_1.Typography, { gutterBottom: true, noWrap: true, variant: "body1", align: "left" }, title))),
            react_1.default.createElement(core_1.Typography, { variant: "caption", color: "textSecondary", component: "p", className: classes.descripton }, description)),
        react_1.default.createElement(core_1.CardActions, null,
            react_1.default.createElement(core_1.Avatar, { style: {
                    color: `white`,
                    backgroundColor: (0, utils_1.stringToColor)(author),
                }, className: classes.smallAvatar }, (0, utils_1.nameToInitials)(author, 3)),
            react_1.default.createElement(core_1.Typography, { noWrap: true, variant: "caption", color: "textSecondary", component: "p", className: classes.authorName }, author),
            react_1.default.createElement(core_1.Box, { flex: "1" }),
            actions?.length && actions.map((action, i) => (react_1.default.createElement(core_1.Tooltip, { key: `action-button-${i}`, title: action.label },
                react_1.default.createElement(core_1.IconButton, { "aria-label": action.label, size: "small", className: classes.actionButton, "data-testid": `${i}-action-button`, onClick: action.onClick }, (0, react_1.cloneElement)(action.icon, {
                    color: action.color ?? `primary`,
                    fontSize: `small`,
                }))))))));
}
exports.default = ContentCard;
