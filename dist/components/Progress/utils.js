"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useButtonLoadingStyles = void 0;
const core_1 = require("@material-ui/core");
exports.useButtonLoadingStyles = (0, core_1.makeStyles)({
    buttonLoading: {
        pointerEvents: `none`,
    },
    buttonLoadingContent: {
        opacity: 0,
    },
});
