"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWidth = void 0;
const core_1 = require("@material-ui/core");
function useWidth() {
    const theme = (0, core_1.useTheme)();
    const keys = [...theme.breakpoints.keys].reverse();
    return (keys.reduce((output, key) => {
        const matches = (0, core_1.useMediaQuery)(theme.breakpoints.up(key));
        return !output && matches ? key : output;
    }, null) ?? `xs`);
}
exports.useWidth = useWidth;
