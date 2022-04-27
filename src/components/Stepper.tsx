/* eslint-disable react/no-multi-comp */
import {
    Edit as EditIcon,
    SvgIconComponent,
} from "@mui/icons-material";
import {
    Step,
    StepButton,
    StepLabel,
    Stepper as Stppr,
    Typography,
    useTheme,
} from "@mui/material";
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import clsx from "clsx";
import { clamp } from "lodash-es";
import {
    ReactNode,
    useEffect,
    useState,
} from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        "& .MuiStepLabel-label.MuiStepLabel-active": {
            fontWeight: 600,
        },
        "& .MuiStepLabel-labelContainer": {
            textAlign: `left`,
        },
        padding: `24px`,
    },
    iconContainer: {
        position: `relative`,
        width: 24,
        height: 24,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
    },
    iconLayer: {
        position: `absolute`,
    },
    stepEditIconBackground: {
        color: theme.palette.primary.main,
    },
}));

const getStepIndex = (index: number, steps: Step[]) => steps.length === 0 ? 0 : clamp(index, 0, steps.length - 1);

const showCustomStepIcon = (step: Step, editable?: boolean) => {
    if (step.error) return false;
    if (editable) return true;
    return !!step.icon;
};

const StepEditIcon = () => {
    const classes = useStyles();
    return (
        <div className={classes.iconContainer}>
            <svg
                className={clsx(`MuiSvgIcon-root MuiStepIcon-root`, classes.iconLayer, classes.stepEditIconBackground)}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="12"
                />
            </svg>
            <EditIcon
                className={classes.iconLayer}
                fontSize="small"
                htmlColor="white"
            />
        </div>
    );
};

interface IconProps {
    editable: boolean;
    icon?: SvgIconComponent;
    active: boolean;
}

const CustomStepIcon = (props: IconProps) => {
    const theme = useTheme();
    const {
        editable: showEditableIcon,
        icon: Icon,
        active,
    } = props;
    if (showEditableIcon) return <StepEditIcon />;
    if (!Icon) return null;
    return (
        <Icon
            htmlColor={active ? theme.palette.secondary.main : theme.palette.grey[500]}
        />
    );
};

interface OptionalLabelProps {
    step: Step;
    optionalLabel?: string;
}

const OptionalLabel = (props: OptionalLabelProps) => {
    const { step, optionalLabel } = props;
    if (step.optional) return (
        <Typography
            variant="caption"
            color="textSecondary"
        >
            {optionalLabel ?? `Optional`}
        </Typography>
    );
    return null;
};

export interface Step {
    label: string;
    content?: ReactNode;
    icon?: SvgIconComponent;
    optional?: boolean;
    error?: string;
}

interface Props {
    step: number;
    steps: Step[];
    editable?: boolean;
    optionalLabel?: string;
    onChange?: (step: number) => void;
    onValidate?: (valid: boolean) => void;
    onError?: (error?: string) => void;
}

export default function Stepper (props: Props) {
    const {
        step,
        steps,
        editable,
        optionalLabel,
        onChange,
        onValidate,
        onError,
    } = props;
    const classes = useStyles();
    const [ stepIndex, setStepIndex ] = useState(getStepIndex(step, steps));

    const handleClick = (index: number) => {
        setStepIndex(index);
    };

    useEffect(() => {
        setStepIndex(getStepIndex(step, steps));
    }, [ step, steps ]);

    useEffect(() => {
        const error = steps.map((step) => step.error).find((error) => error);
        onChange?.(stepIndex);
        onValidate?.(!error);
        onError?.(error);
    }, [ stepIndex ]);

    return (
        <Stppr
            activeStep={stepIndex}
            nonLinear={editable}
            className={classes.root}
        >
            {steps.map((step, index) => {
                const completed = index < stepIndex;
                const showEditableIcon = editable || completed;
                const customIconProps = showCustomStepIcon(step, showEditableIcon)
                    ? {
                        icon: (
                            <CustomStepIcon
                                icon={step.icon}
                                editable={showEditableIcon}
                                active={index <= stepIndex}
                            />
                        ),
                    }
                    : {};
                return (
                    <Step key={`step-${index}`}>
                        <StepButton
                            optional={
                                <OptionalLabel
                                    step={step}
                                    optionalLabel={optionalLabel}
                                />
                            }
                            {...customIconProps}
                        >
                            <StepLabel
                                error={!!step.error}
                            >
                                {step.label}
                            </StepLabel>
                        </StepButton>
                    </Step>
                );
            })}
        </Stppr>
    );
}
