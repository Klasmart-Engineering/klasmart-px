import {
    Theme,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

/**
* Be careful using this hook. It only works because the number of
* breakpoints in theme is static. It will break once you change the number of
* breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
*/
export function useWidth () {
    const theme: Theme = useTheme();
    const keys: Breakpoint[] = [ ...theme.breakpoints.keys ].reverse();
    return (
        keys.reduce((output: Breakpoint | null, key: Breakpoint) => {
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) ?? `xs`
    );
}
