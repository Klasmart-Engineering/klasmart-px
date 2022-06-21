import HomeScreenWidgetHeader from '../HomeScreenWidgetHeader';
import WidgetWrapper,
{ WidgetBackground } from "../WidgetWrapper";
import { Cancel as CancelIcon } from '@mui/icons-material';
import {
    Box,
    IconButton,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => createStyles({
    cardWrapper: {
        display: `flex`,
        flexFlow: `column`,
        height: `100%`,
    },
    card: {
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-between`,
        borderRadius: 10,
        boxShadow: `none`,
        padding: theme.spacing(2),
        height: `100%`,
    },
    cardNoBackground: {
        backgroundColor: `unset`,
    },
    editContainer: {
        cursor: `grab`,
    },
    editContainerIsPersistent: {
        cursor: `not-allowed`,
    },
    removeWidget: {
        color: theme.palette.error.light,
        height: `20px`,
        width: `20px`,
        position: `absolute`,
        top: `20px`,
        right: `-10px`,
        backgroundColor: theme.palette.grey[100],
        borderRadius: `50%`,
        "&:hover": {
            backgroundColor: theme.palette.grey[100],
        },
    },
    icon: {
        height: `35px`,
        width: `35px`,
    },
    pointerNone: {
        pointerEvents: `none`,
    },
}));

type LinkProps = {
    url: string;
    label: string;
}

export interface HomeScreenWidgetWrapperProps {
    children: React.ReactNode;
    label: string;
    link?: LinkProps;
    overrideLink?: React.ReactNode;
    loading: boolean;
    error: boolean;
    errorScreen: React.ReactNode;
    noData: boolean;
    background?: WidgetBackground;
    isPersistent?: boolean;
    noDataScreen: React.ReactNode;
    disablePadding?: boolean;
    editing: boolean;
    onRemove: () => void;
}

const HomeScreenWidgetWrapper: React.FC<HomeScreenWidgetWrapperProps> = (props) => {
    const classes = useStyles();
    const { isPersistent = false, editing = false } = props;

    return (
        <Box className={clsx(classes.cardWrapper, {
            [classes.editContainer]: editing && !isPersistent,
            [classes.editContainerIsPersistent]: editing && isPersistent,
        })}
        >
            <HomeScreenWidgetHeader
                label={props.label}
                link={props.link}
                isInteractive={editing}
            />
            <WidgetWrapper
                loading={props.loading}
                background={props.background}
                error={props.error}
                errorScreen={props.errorScreen}
                noData={props.noData}
                noDataScreen={props.noDataScreen}
                className={clsx({
                    [classes.pointerNone]: editing && !isPersistent,
                })}
                disablePadding={props.disablePadding}
            >
                {props.children}
            </WidgetWrapper>
            {editing && !isPersistent && (
                <Box >
                    <IconButton
                        className={classes.removeWidget}
                        onClick={() => props.onRemove()}
                    >
                        <CancelIcon className={classes.icon} />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default HomeScreenWidgetWrapper;
