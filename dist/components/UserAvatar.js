"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    avatar: {
        color: `white`,
    },
    avatarSmall: {
        width: 24,
        height: 24,
        fontSize: 10,
    },
    avatarMedium: {
        width: 40,
        height: 40,
        fontSize: 16,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        fontSize: 24,
    },
}));
const MAX_INITIALS_LENGTH = 3;
function UserAvatar(props) {
    const { name, maxInitialsLength = MAX_INITIALS_LENGTH, src, size = `medium`, className, color, } = props;
    const classes = useStyles();
    return (react_1.default.createElement(core_1.Tooltip, { title: name },
        react_1.default.createElement("span", null,
            react_1.default.createElement(core_1.Avatar, { variant: "circular", src: src, className: (0, clsx_1.default)(classes.avatar, className, {
                    [classes.avatarSmall]: size === `small`,
                    [classes.avatarMedium]: size === `medium`,
                    [classes.avatarLarge]: size === `large`,
                }), style: {
                    backgroundColor: color ?? (0, utils_1.stringToColor)(name || ``),
                } }, name
                ? (0, utils_1.nameToInitials)(name, maxInitialsLength)
                : react_1.default.createElement(icons_1.Person, { fontSize: size })))));
}
exports.default = UserAvatar;
