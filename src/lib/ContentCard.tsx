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
{ ChangeEvent } from "react";
import {
    nameToInitials,
    stringToHslColor,
} from "../utils";
import MoreMenu from "./Common/MoreMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
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
        cardActions: {
            paddingTop: 0,
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
            marginLeft: `${theme.spacing(2.5)}px !important`,
        },
        cardContent: {
            padding: theme.spacing(1, 1),
            height: 90,
        },
        assetTypeIcon: {
            marginRight: theme.spacing(3),
        },
        descripton: {
            WebkitBoxOrient: `vertical`,
            WebkitLineClamp: 2,
            display: `-webkit-box`,
            overflow: `hidden`,
        },
    }),
);

type LibraryAssetType = "lessonPlan" | "lessonMaterial";
type ThemeColor = "inherit" | "default" | "primary" | "secondary"
type IconThemeColor = Exclude<ThemeColor, "default"> & "disabled" | "action" | "error"
type FontSize = "small" | "inherit" | "default" | "large"

interface CheckboxItem {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export interface ActionItem {
    label: string;
    icon: React.ReactElement<SvgIconProps>;
    onClick?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void);
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
        const iconProps = {
            color: `primary` as IconThemeColor,
            className: classes.assetTypeIcon,
            fontSize: `small` as FontSize,
        };
        switch (type) {
        case `lessonMaterial`: return <CategoryIcon {...iconProps }/>;
        case `lessonPlan`: return <SubscriptionsIcon {... iconProps } />;
        default: return <HelpIcon {... iconProps } />;
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
                onClick={onClick}>
                <CardMedia
                    component="img"
                    alt={`${title} Image`}
                    height="150"
                    image={imageUrl}
                    title={`${title} Image`}
                    className={classes.cardMedia}
                />
            </CardActionArea>
            {checkbox && <>
                <div className={classes.checkboxBackground} />
                <Checkbox
                    checked={checkbox.checked}
                    inputProps={{
                        'aria-label': `${title} checkbox ${checkbox.checked ? `selected` : `deselected`}`,
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
                            { getAssetTypeIcon(assetType) }
                        </Tooltip>
                    </Box>
                    <Box flex="1">
                        <Typography
                            gutterBottom
                            noWrap
                            variant="body1"
                            align="left"
                        >
                            { title }
                        </Typography>
                    </Box>
                    {<MoreMenu actions={actions} />}
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
            <CardActions className={classes.cardActions}>
                <Avatar
                    style={{
                        color: `white`,
                        backgroundColor: stringToHslColor(author),
                    }}
                    className={classes.smallAvatar}
                >
                    {nameToInitials(author)}
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
            </CardActions>
        </Card>
    );
}
