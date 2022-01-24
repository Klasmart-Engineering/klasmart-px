/* eslint-disable react/no-multi-comp */
import CircularProgress from '../../../Progress/CircularProgress';
import { SpreadsheetValidationError } from './types';
import {
    Check as CheckIcon,
    Error as ErrorIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
    Box,
    Chip,
} from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { lighten } from '@mui/material/styles';
import Typography,
{ TypographyProps } from '@mui/material/Typography';
import {
    ClassNameMap,
    createStyles,
    makeStyles,
    withStyles,
} from '@mui/styles';
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

type ValidationFailedCallback = (num: number) => string

export const validationStatuses = [
    `in-progress`,
    `passed`,
    `failed`,
] as const;

export type ValidationStatus = typeof validationStatuses[number];

export interface Props {
    errors: SpreadsheetValidationError[];
    status: ValidationStatus;
    allValidationsPassedMessage?: string;
    validationInProgressMessage?: string;
    numValidationsFailedMessage?: ValidationFailedCallback;
}

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

interface StatusInfoProps {
    Icon: React.ReactNode;
    message: {
        className: string;
        color: TypographyProps["color"];
        text: string;
    };
}

const StatusInfo = ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Icon, message,
}: StatusInfoProps) => {
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            {Icon}
            <Typography
                color={message.color}
                className={message.className}
            >
                {message.text}
            </Typography>
        </Box>
    );
};

interface ValidationStatusInfoOptions {
    status: ValidationStatus;
    classes: ClassNameMap;
    allValidationsPassedMessage: string;
    validationInProgressMessage: string;
    numValidationsFailedMessage: ValidationFailedCallback;
    totalErrors: number;
}

const buildValidationStatusInfo = (validationStatusInfoOptions: ValidationStatusInfoOptions) => {
    const {
        status,
        classes,
        allValidationsPassedMessage,
        validationInProgressMessage,
        numValidationsFailedMessage,
        totalErrors,
    } = validationStatusInfoOptions;
    switch (status) {
    case `in-progress`: {
        return (
            <StatusInfo
                Icon={(
                    <CircularProgress
                        disableCentered
                        className={classes.statusIcon}
                        color={`action`}
                    />
                )}
                message={{
                    text: validationInProgressMessage,
                    color: `textSecondary`,
                    className: classes.validationLabel,
                }}
            />
        );
    }
    case `passed`: {
        return (
            <StatusInfo
                Icon={(
                    <CheckIcon
                        className={clsx(classes.statusIcon, classes.successText)}
                    />
                )}
                message={{
                    text: allValidationsPassedMessage,
                    color: `textSecondary`,
                    className: classes.validationLabel,
                }}
            />
        );
    }
    case `failed`: {
        return (
            <StatusInfo
                Icon={(
                    <ErrorIcon
                        className={classes.statusIcon}
                        color="error"
                    />
                )}
                message={{
                    text: numValidationsFailedMessage(totalErrors),
                    color: `error`,
                    className: classes.validationLabel,
                }}
            />
        );
    }
    }
};

export default function ValidationDetails (props: Props) {
    const {
        errors,
        status,
        allValidationsPassedMessage = `All validations passed`,
        validationInProgressMessage = `Validation in progress`,
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
            data-testid="validation-details"
            expanded={expanded}
            onChange={(event, newExpanded) => handleChange(newExpanded)}
        >
            <AccordionSummary expandIcon={hasErrors && <ExpandMoreIcon />}>
                {buildValidationStatusInfo({
                    status,
                    classes,
                    allValidationsPassedMessage,
                    validationInProgressMessage,
                    numValidationsFailedMessage,
                    totalErrors: errors.length,
                })}
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
