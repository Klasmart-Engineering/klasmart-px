import {
    Fab,
    Hidden,
    withStyles,
} from "@material-ui/core";
import { FabProps } from "@material-ui/core/Fab";
import { Send as SendIcon } from "@styled-icons/material";
import React from "react";

interface Props extends FabProps {
    className?: string;
    extendedOnly?: boolean;
    flat?: boolean;
}

const Baseb = withStyles({})(Fab);

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
            color="primary"
            variant="extended"
            className="MuiTypography-noWrap"
            style={{
                minWidth: 120,
                boxShadow: flat
                    ? `none`
                    : undefined,
            }}
            {...other}
        >
            {children || <SendIcon />}
        </Baseb>
    ) : (
        <>
            <Hidden smDown>
                <Baseb
                    color="primary"
                    variant="extended"
                    className="MuiTypography-noWrap"
                    style={{
                        minWidth: 120,
                        boxShadow: flat
                            ? `none`
                            : undefined,
                    }}
                    {...other}
                >
                    {children || <SendIcon />}
                </Baseb>
            </Hidden>
            <Hidden mdUp>
                <Baseb
                    color="primary"
                    variant="round"
                    size="small"
                    className="MuiTypography-noWrap"
                    {...other}
                >
                    {sibling || <SendIcon fontSize="small" />}
                </Baseb>
            </Hidden>
        </>
    );
}
