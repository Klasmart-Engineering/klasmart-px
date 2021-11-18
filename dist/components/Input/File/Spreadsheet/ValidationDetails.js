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
exports.validationStatuses = void 0;
const CircularProgress_1 = __importDefault(require("../../../Progress/CircularProgress"));
const core_1 = require("@material-ui/core");
const Accordion_1 = __importDefault(require("@material-ui/core/Accordion"));
const AccordionDetails_1 = __importDefault(require("@material-ui/core/AccordionDetails"));
const AccordionSummary_1 = __importDefault(require("@material-ui/core/AccordionSummary"));
const styles_1 = require("@material-ui/core/styles");
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const icons_1 = require("@material-ui/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const useStyles = (0, core_1.makeStyles)((theme) => (0, core_1.createStyles)({
    validationLabel: {
        marginLeft: theme.spacing(1.5),
    },
    statusIcon: {
        margin: theme.spacing(1),
    },
    successText: {
        color: theme.palette.success.main,
    },
    errorRow: {
        margin: theme.spacing(0.5, 0),
    },
    errorChip: {
        backgroundColor: (0, styles_1.lighten)(theme.palette.error.main, 0.5),
        fontWeight: 600,
        borderRadius: 4,
        margin: 2,
    },
    errorMessage: {
        marginLeft: theme.spacing(1),
    },
}));
exports.validationStatuses = [
    `in-progress`,
    `passed`,
    `failed`,
];
const Accordion = (0, styles_1.withStyles)({
    root: {
        boxShadow: `none`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: `none`,
        },
        '&$expanded': {
            margin: `auto`,
        },
    },
    expanded: {},
})(Accordion_1.default);
const AccordionSummary = (0, styles_1.withStyles)({
    root: {
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        margin: 0,
        '&$expanded': {
            margin: 0,
        },
    },
    expanded: {},
})(AccordionSummary_1.default);
const AccordionDetails = (0, styles_1.withStyles)((theme) => ({
    root: {
        padding: theme.spacing(0, 2, 2),
    },
}))(AccordionDetails_1.default);
const StatusInfo = ({ Icon, message, }) => {
    return (react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "row", alignItems: "center" },
        Icon,
        react_1.default.createElement(Typography_1.default, { color: message.color, className: message.className }, message.text)));
};
const buildValidationStatusInfo = (validationStatusInfoOptions) => {
    const { status, classes, allValidationsPassedMessage, validationInProgressMessage, numValidationsFailedMessage, totalErrors, } = validationStatusInfoOptions;
    switch (status) {
        case `in-progress`: {
            return (react_1.default.createElement(StatusInfo, { Icon: (react_1.default.createElement(CircularProgress_1.default, { disableCentered: true, className: classes.statusIcon, color: `action` })), message: {
                    text: validationInProgressMessage,
                    color: `textSecondary`,
                    className: classes.validationLabel,
                } }));
        }
        case `passed`: {
            return (react_1.default.createElement(StatusInfo, { Icon: (react_1.default.createElement(icons_1.Check, { className: (0, clsx_1.default)(classes.statusIcon, classes.successText) })), message: {
                    text: allValidationsPassedMessage,
                    color: `textSecondary`,
                    className: classes.validationLabel,
                } }));
        }
        case `failed`: {
            return (react_1.default.createElement(StatusInfo, { Icon: (react_1.default.createElement(icons_1.Error, { className: classes.statusIcon, color: "error" })), message: {
                    text: numValidationsFailedMessage(totalErrors),
                    color: `error`,
                    className: classes.validationLabel,
                } }));
        }
    }
};
function ValidationDetails(props) {
    const { errors, status, allValidationsPassedMessage = `All validations passed`, validationInProgressMessage = `Validation in progress`, numValidationsFailedMessage = (count) => `${count} validations failed`, } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const hasErrors = !!errors.length;
    const handleChange = (newExpanded) => {
        setExpanded(hasErrors ? newExpanded : false);
    };
    return (react_1.default.createElement(Accordion, { "data-testid": "validation-details", expanded: expanded, onChange: (event, newExpanded) => handleChange(newExpanded) },
        react_1.default.createElement(AccordionSummary, { expandIcon: hasErrors && react_1.default.createElement(icons_1.ExpandMore, null) }, buildValidationStatusInfo({
            status,
            classes,
            allValidationsPassedMessage,
            validationInProgressMessage,
            numValidationsFailedMessage,
            totalErrors: errors.length,
        })),
        react_1.default.createElement(AccordionDetails, null,
            react_1.default.createElement(core_1.Box, { display: "flex", flexDirection: "column" }, errors.map((error, i) => (react_1.default.createElement(core_1.Box, { key: `error-${i}`, className: classes.errorRow, display: "flex", flexDirection: "row", alignItems: "center" },
                error.row && (react_1.default.createElement(core_1.Chip, { className: classes.errorChip, size: "small", label: `Row #${error.row}` })),
                error.column && (react_1.default.createElement(core_1.Chip, { className: classes.errorChip, size: "small", label: error.column })),
                react_1.default.createElement(Typography_1.default, { className: classes.errorMessage }, error.message))))))));
}
exports.default = ValidationDetails;
