import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CardProps,
    Checkbox,
    createStyles,
    IconButton,
    makeStyles,
    SvgIconProps,
    Theme,
    Tooltip,
    Typography,
} from "@material-ui/core";
import {
    Category as CategoryIcon,
    Help as HelpIcon,
    Subscriptions as SubscriptionsIcon,
} from "@material-ui/icons";
import React,
{
    ChangeEvent,
    cloneElement,
} from "react";
import {
    nameToInitials,
    stringToHslColor,
} from "../utils";
// import MoreMenu from './Common/MoreMenu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            position: `relative`,
        },
        cardActionArea: {
            '&::before': {
                backgroundColor: `#FFF`,
                borderRadius: `inherit`,
                bottom: 0,
                content: `""`,
                left: 0,
                opacity: .0,
                position: `absolute`,
                pointerEvents: `none`,
                right: 0,
                top: 0,
                transition: `opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
            },
            '&.selected::before': {
                opacity: .66,
            },
        },
        cardMedia: {},
        checkbox: {
            position: `absolute`,
            top: 0,
            margin: theme.spacing(1),
        },
        checkboxBackground: {
            position: `absolute`,
            margin: theme.spacing(1),
            backgroundColor: `#fff`,
            width: 16,
            height: 16,
            top: 13,
            left: 13,
        },
        smallAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            fontSize: 10,
        },
        authorName: {
            marginLeft: `${theme.spacing(1.5)}px !important`,
        },
        cardContent: {
            padding: theme.spacing(1, 1),
            height: 82,
        },
        assetTypeIcon: {
            marginRight: theme.spacing(2),
        },
        descripton: {
            WebkitBoxOrient: `vertical`,
            WebkitLineClamp: 2,
            display: `-webkit-box`,
            overflow: `hidden`,
        },
        actionButton: {
            marginLeft: `${theme.spacing(0.5)}px !important`,
        },
    }),
);

type LibraryAssetType = "lessonPlan" | "lessonMaterial";

interface CheckboxItem {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface ActionItem {
    label: string;
    color?: `inherit` | `disabled` | `primary` | `secondary` | `action` | `error`;
    icon: React.ReactElement<SvgIconProps>;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface Props extends Omit<CardProps, "onClick"> {
    actions?: ActionItem[];
    checkbox?: CheckboxItem;
    author: string;
    title: string;
    description: string;
    imageUrl: string;
    assetType?: LibraryAssetType;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

export default function ContentCard(props: Props) {
    const classes = useStyles();
    const {
        actions,
        author,
        assetType,
        checkbox,
        description,
        imageUrl,
        title,
        onClick,
        className,
        ...other
    } = props;

    function getAssetTypeIcon (type?: LibraryAssetType): React.ReactElement<SvgIconProps> {
        switch (type) {
        case `lessonMaterial`: return <CategoryIcon />;
        case `lessonPlan`: return <SubscriptionsIcon />;
        default: return <HelpIcon />;
        }
    }

    function getAssetTypeLabel (type?: LibraryAssetType): string {
        switch (type) {
        case `lessonMaterial`: return `Material`;
        case `lessonPlan`: return `Plan`;
        default: return `Unknown`;
        }
    }

    return (
        <Card
            className={[ className, classes.card ].join(` `)}
            {...other}
        >
            <CardActionArea
                className={`${classes.cardActionArea} ${checkbox?.checked ? `selected` : ``}`}
                data-testid="card-action-area"
                onClick={onClick}
            >
                <CardMedia
                    component="img"
                    alt={`${title} Image`}
                    height="150"
                    image={imageUrl}
                    title={`${title} Image`}
                    className={classes.cardMedia}
                    data-testid="card-media"
                />
            </CardActionArea>
            {checkbox && <>
                <div className={classes.checkboxBackground} />
                <Checkbox
                    checked={checkbox.checked}
                    inputProps={{
                        'aria-label': `checkbox ${checkbox.checked ? `selected` : `deselected`} ${title}`,
                        role: `checkbox`,
                    }}
                    className={classes.checkbox}
                    onChange={checkbox.onChange}
                />
            </>}
            <CardContent className={classes.cardContent}>
                <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                >
                    <Box>
                        <Tooltip title={getAssetTypeLabel(assetType)}>
                            {cloneElement(
                                getAssetTypeIcon(assetType),
                                {
                                    color: `primary`,
                                    className: classes.assetTypeIcon,
                                    fontSize: `small`,
                                },
                            )}
                        </Tooltip>
                    </Box>
                    <Box
                        flex="1"
                        minWidth="0"
                    >
                        <Typography
                            gutterBottom
                            noWrap
                            variant="body1"
                            align="left"
                        >
                            { title }
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                    className={classes.descripton}
                >
                    { description }
                </Typography>
            </CardContent>
            <CardActions>
                <Avatar
                    style={{
                        color: `white`,
                        backgroundColor: stringToHslColor(author),
                    }}
                    className={classes.smallAvatar}
                >
                    {nameToInitials(author, 3)}
                </Avatar>
                <Typography
                    noWrap
                    variant="caption"
                    color="textSecondary"
                    component="p"
                    className={classes.authorName}
                >
                    { author }
                </Typography>
                <Box flex="1" />
                {actions?.length && actions.map((action, i) =>
                    <Tooltip
                        key={`action-button-${i}`}
                        title={action.label}
                    >
                        <IconButton
                            aria-label={action.label}
                            size="small"
                            className={classes.actionButton}
                            data-testid={`${i}-action-button`}
                            onClick={action.onClick}
                        >
                            {cloneElement(
                                action.icon,
                                {
                                    color: action.color ?? `primary`,
                                    fontSize: `small`,
                                },
                            )}
                        </IconButton>
                    </Tooltip>,
                )}
            </CardActions>
        </Card>
    );
}
