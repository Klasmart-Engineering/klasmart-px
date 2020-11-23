import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CardProps,
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
import React from "react";
import {
    nameToInitials,
    stringToHslColor,
} from "../utils";
import MoreMenu from "./Common/MoreMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
        cardActions: {
            paddingTop: 0,
        },
        smallAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            fontSize: 10,
        },
        avatar: {
            marginRight: theme.spacing(1),
        },
        cardContent: {
            padding: theme.spacing(1, 1),
            height: 90,
        },
        assetTypeIcon: {
            marginRight: theme.spacing(1),
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
    onClick: React.Dispatch<React.SetStateAction<boolean>>;
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
        title,
        description,
        imageUrl,
        assetType,
        onClick,
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

    const assetTypeIcon = getAssetTypeIcon(assetType);

    return (
        <Card {...other}>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    alt={`${title} Image`}
                    height="150"
                    image={imageUrl}
                    title={`${title} Image`}
                />
            </CardActionArea>
            <CardContent className={classes.cardContent}>
                <Box
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                >
                    <Box>
                        <Tooltip title={getAssetTypeLabel(assetType)}>
                            { assetTypeIcon }
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
                >
                    { author }
                </Typography>
            </CardActions>
        </Card>
    );
}
