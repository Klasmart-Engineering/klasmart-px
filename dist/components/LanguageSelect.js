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
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Menu_1 = __importDefault(require("@material-ui/core/Menu"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const styles_1 = require("@material-ui/core/styles");
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
const Translate_1 = __importDefault(require("@material-ui/icons/Translate"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const React = __importStar(require("react"));
const react_cookie_1 = require("react-cookie");
const useStyles = (0, styles_1.makeStyles)((theme) => (0, styles_1.createStyles)({
    expand: {
        transform: `rotate(0deg)`,
        transition: theme.transitions.create(`transform`, {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: `rotate(180deg)`,
    },
    language: {
        margin: theme.spacing(0, 1),
        display: `block`,
    },
}));
const StyledMenu = (0, styles_1.withStyles)({})((props) => (React.createElement(Menu_1.default, { elevation: 4, getContentAnchorEl: null, anchorOrigin: {
        vertical: `bottom`,
        horizontal: `center`,
    }, transformOrigin: {
        vertical: `top`,
        horizontal: `center`,
    }, ...props })));
function LanguageSelect(props) {
    const classes = useStyles();
    let { languages } = props;
    const { cookieDomain, localization, noIcon, } = props;
    if (languages.length === 0) {
        languages = [
            {
                code: `en`,
                text: `English`,
            },
        ];
    }
    const localeCodes = languages.map(l => l.code);
    function getDefaultLanguageCode() {
        const browserLanguages = navigator.languages || [
            navigator.language,
            navigator.browerLanguage,
            navigator.userLanguage,
            navigator.systemLanguage,
        ];
        for (const l of browserLanguages) {
            if (localeCodes.indexOf(l) !== -1) {
                return l;
            }
        }
        return `en`;
    }
    const url = new URL(window.location.href);
    const localeParam = url.searchParams.get(`iso`);
    const [cookies, setCookies] = (0, react_cookie_1.useCookies)([`locale`]);
    const locale = cookies.locale || localeParam || getDefaultLanguageCode();
    if (!cookies.locale) {
        setCookies(`locale`, locale, {
            path: `/`,
            domain: cookieDomain || `kidsloop.net`,
        });
    }
    const language = languages.find((l) => l.code === locale) || {
        code: `en`,
        text: `English`,
    };
    const [languageText, setLanguageText] = (0, react_1.useState)(language.text);
    const [languageMenuElement, setLanguageMenuElement] = (0, react_1.useState)(null);
    function languageSelect(language) {
        setCookies(`locale`, language.code, {
            path: `/`,
            domain: cookieDomain || `kidsloop.net`,
        });
        setLanguageText(language.text);
        setLanguageMenuElement(null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip_1.default, { title: localization?.tooltip ?? `Change Language`, enterDelay: 300 },
            React.createElement(Button_1.default, { color: "inherit", "aria-owns": languageMenuElement ? `language-menu` : undefined, "aria-haspopup": "true", size: "small", onClick: (e) => setLanguageMenuElement(e.currentTarget) },
                !noIcon && React.createElement(Translate_1.default, { fontSize: "inherit" }),
                React.createElement("span", { className: classes.language }, locale === `` ?
                    (localization?.select ?? `Select Language`) :
                    languageText),
                React.createElement(ExpandMore_1.default, { fontSize: "small", className: (0, clsx_1.default)(classes.expand, {
                        [classes.expandOpen]: languageMenuElement !== null,
                    }) }))),
        React.createElement(StyledMenu, { keepMounted: true, id: "language-menu", anchorEl: languageMenuElement, open: Boolean(languageMenuElement), onClose: () => setLanguageMenuElement(null) }, languages.map((l) => (React.createElement(MenuItem_1.default, { key: l.code, selected: locale === l.code, onClick: () => languageSelect(l) }, l.text))))));
}
exports.default = LanguageSelect;
