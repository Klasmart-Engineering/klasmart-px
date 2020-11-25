import { FabProps } from "@material-ui/core/Fab";
import {
    Fab,
    Hidden,
    withStyles,
} from "@material-ui/core";
import { Send as SendIcon } from "@styled-icons/material";
import React from "react";

interface Props extends FabProps {
    className?: string;
    extendedOnly?: boolean;
    flat?: boolean;
}

const Baseb = withStyles({
    root: {
        "&:hover": {
            "-webkit-transition": `all .4s ease`,
            background: `#1B365D`,
            "box-shadow":
                `0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)`,
            transform: `translateY(-2px)`,
            transition: `all .4s ease`,
        },
        background: `#0E78D5`,
        color: `#FFF`,
    },
})(Fab);

export default function BaseB(
    props: Props & { children?: React.ReactNode },
) {
    const {
        children,
        extendedOnly,
        flat,
        ...other
    } = props;

    let sibling: React.ReactNode;
    React.Children.map(children, (child) =>
        typeof child !== `string` ? (sibling = child) : {},
    );

    return extendedOnly ? (
        <Baseb
            variant="extended"
            style={{
                minWidth: 120,
                boxShadow: flat
                    ? `none`
                    : `0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)`,
            }}
            {...other}
        >
            {children || <SendIcon />}
        </Baseb>
    ) : (
        <>
            <Hidden smDown>
                <Baseb
                    variant="extended"
                    style={{
                        minWidth: 120,
                        boxShadow: flat
                            ? `none`
                            : `0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)`,
                    }}
                    {...other}
                >
                    {children || <SendIcon />}
                </Baseb>
            </Hidden>
            <Hidden mdUp>
                <Baseb
                    variant="round"
                    size="small"
                    {...other}>
                    {sibling || <SendIcon fontSize="small" />}
                </Baseb>
            </Hidden>
        </>
    );
}
