import IconButton from "./Button/IconButton";
import {
    Box,
    createStyles,
    Divider,
    Drawer as Drwr,
    makeStyles,
    Toolbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import clsx from "clsx";
import React,
{ ReactNode } from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        "& .MuiDrawer-paper": {
            width: 320,
        },
    },
    toolbar: {
        padding: theme.spacing(0, 2),
    },
    closeButton: {
        marginRight: theme.direction === `rtl` ? undefined: theme.spacing(-1),
        marginLeft: theme.direction === `rtl` ? theme.spacing(-1) : undefined,
    },
    sectionHeader: {
        minHeight: 32,
    },
}));

export interface DrawerSection {
    header?: string;
    content: ReactNode;
}

function DrawerSection (props: DrawerSection) {
    const { header, content } = props;
    const classes = useStyles();
    return (
        <Box py={1}>
            {header && <Toolbar className={clsx(classes.toolbar, classes.sectionHeader)}>
                <Typography variant="subtitle2">{header}</Typography>
            </Toolbar>}
            {content}
        </Box>
    );
}

interface Props {
    open: boolean;
    title?: string;
    sections: DrawerSection[];
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function Drawer (props: Props) {
    const {
        open,
        title,
        sections,
        onClose,
    } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drwr
            className={classes.root}
            anchor="right"
            open={open}
            onClose={onClose}
        >
            {title && <>
                <Toolbar className={classes.toolbar}>
                    <Box
                        display="flex"
                        flexDirection={theme.direction === `rtl` ? `row-reverse` : `row`}
                        alignItems="center"
                        flex={1}
                    >
                        <Typography variant="h6">{title}</Typography>
                        <Box flex="1" />
                        <IconButton
                            className={classes.closeButton}
                            icon={CloseIcon}
                            onClick={() => onClose({}, `escapeKeyDown`)}
                        />
                    </Box>
                </Toolbar>
                <Divider />
            </>}
            {sections.map((section, i) => (
                <React.Fragment key={`section-${i}`}>
                    <DrawerSection
                        header={section.header}
                        content={section.content}
                    />
                    {i !== sections.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </Drwr>
    );
}