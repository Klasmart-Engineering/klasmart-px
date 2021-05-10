import { SpreadsheetValidtionError } from './Base';
import {
    Box,
    Chip,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import {
    lighten,
    withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Check as CheckIcon,
    Error as ErrorIcon,
    ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import clsx from "clsx";
import React,
{ useState } from 'react';

const useStyles = makeStyles((theme) => createStyles({
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
        backgroundColor: lighten(theme.palette.error.main, 0.5),
        fontWeight: 600,
        borderRadius: 4,
        margin: 2,
    },
    errorMessage: {
        marginLeft: theme.spacing(1),
    },
}));

const Accordion = withStyles({
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
})(MuiAccordion);

const AccordionSummary = withStyles({
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
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 2, 2),
    },
}))(MuiAccordionDetails);

interface Props {
    errors: SpreadsheetValidtionError[];
    allValidationsPassedMessage?: string;
    numValidationsFailedMessage?: (num: number) => string;
}

export default function ValidationDetails (props: Props) {
    const {
        errors,
        allValidationsPassedMessage = `All validations passed`,
        numValidationsFailedMessage = (count: number) => `${count} validations failed`,
    } = props;
    const classes = useStyles();
    const [ expanded, setExpanded ] = useState(false);

    const hasErrors = !!errors.length;

    const handleChange = (newExpanded: boolean) => {
        setExpanded(hasErrors ? newExpanded : false);
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={(event, newExpanded) => handleChange(newExpanded)}
        >
            <AccordionSummary expandIcon={hasErrors && <ExpandMoreIcon />}>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                >
                    {!hasErrors
                        ? <CheckIcon className={clsx(classes.statusIcon, classes.successText)} />
                        : (
                            <ErrorIcon
                                className={classes.statusIcon}
                                color="error"
                            />
                        )
                    }
                    <Typography
                        color={hasErrors ? `error` : `textSecondary`}
                        className={classes.validationLabel}
                    >
                        {errors.length ? numValidationsFailedMessage(errors.length) : allValidationsPassedMessage}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    display="flex"
                    flexDirection="column"
                >
                    {errors.map((error, i) => (
                        <Box
                            key={`error-${i}`}
                            className={classes.errorRow}
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            {error.row && (
                                <Chip
                                    className={classes.errorChip}
                                    size="small"
                                    label={`Row #${error.row}`}
                                />
                            )}
                            {error.column && (
                                <Chip
                                    className={classes.errorChip}
                                    size="small"
                                    label={error.column}
                                />
                            )}
                            <Typography className={classes.errorMessage}>{error.message}</Typography>
                        </Box>
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
