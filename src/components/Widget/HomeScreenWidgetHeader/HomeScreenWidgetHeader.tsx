/* eslint-disable react/prop-types */
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import {
    Box,
    Link,
    Typography,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => createStyles({
    titleContainer: {
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        padding: theme.spacing(1),

    },
    title: {
        fontSize: 14,
        fontWeight: `bold`,
        color: theme.palette.grey[600],
    },
    titleEditing: {
        fontSize: 14,
        fontWeight: `bold`,
        color: theme.palette.grey[100],
    },
    titleLink: {
        display: `flex`,
        alignItems: `center`,
        fontSize: 12,
        color: theme.palette.grey[500],
    },
}));

export interface LinkProps {
    url: string;
    label: string;
}

export interface HomeScreenWidgetHeaderProps {
    label: string;
    isInteractive: boolean;
    link?: LinkProps;
}

const HomeScreenWidgetHeader: React.VFC<HomeScreenWidgetHeaderProps> = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.titleContainer}>
            <Typography
                className={clsx(classes.title, {
                    [classes.titleEditing]: props.isInteractive,
                })}
            >
                {props.label}
            </Typography>
            {!props.isInteractive && props.link && (
                <Link
                    className={classes.titleLink}
                    href={props.link.url}
                    color="primary"
                >
                    {props.link.label} <PlayArrowIcon />
                </Link>
            )}
        </Box>
    );
};

export default HomeScreenWidgetHeader;
