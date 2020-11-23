import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CardProps,
    Collapse,
    createStyles,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import {
    AddShoppingCartTwoTone as AddShoppingCartTwoToneIcon,
    ArchiveTwoTone as ArchiveTwoToneIcon,
    EditTwoTone as EditTwoToneIcon,
    ExpandMore as ExpandMoreIcon,
    ShareTwoTone as ShareTwoToneIcon,
} from "@material-ui/icons";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
        cardActions: {
            display: `flex`,
        },
        cardContent: {
            padding: theme.spacing(1, 1),
        },
        iconExpand: {
            marginLeft: `auto`,
        },
        paragraphClamp: {
            WebkitBoxOrient: `vertical`,
            WebkitLineClamp: 2,
            display: `-webkit-box`,
            overflow: `hidden`,
            [theme.breakpoints.down(`sm`)]: {
                WebkitLineClamp: 4,
            },
        },
        rotateIcon: {
            transform: `rotate(180deg)`,
        },
    }),
);

type LibraryAssetType = "lessonPlan" | "lessonMaterial";

interface CheckboxItem {
    checked: boolean;
    onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ActionItem {
    color: string;
    icon: string;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

interface Props extends Omit<CardProps, "onClick"> {
    actions: ActionItem[];
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
    const [ moreInfo, toggleMoreInfo ] = useState(false);

    return (
        <Card {...other}>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    alt={`${title} Image`}
                    height="140"
                    image={imageUrl}
                    title={`${title} Image`}
                />
            </CardActionArea>
            <CardContent className={classes.cardContent}>
                <Box
                    justifyContent="space-between"
                    alignItems="flex-start"
                    display="flex"
                    flexDirection="row"
                >
                    <Grid item>
                        <Typography
                            gutterBottom
                            variant="body1"
                            align="left">
                            { title }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label={moreInfo ? `hide content info` : `show content info`}
                            size="small"
                            onClick={() => toggleMoreInfo(!moreInfo)}
                        >
                            <ExpandMoreIcon
                                fontSize="inherit"
                                className={moreInfo ? classes.rotateIcon : ``} />
                        </IconButton>
                    </Grid>
                </Box>
                <Collapse in={moreInfo}>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                        align="left"
                        className={classes.paragraphClamp}
                    >
                        { description }
                    </Typography>
                </Collapse>
            </CardContent>
            { actions &&
                <CardActions className={classes.cardActions}>
                    { actions.map((action) => {
                        <IconButton
                            color="primary"
                            size="small"
                            className={classes.iconExpand}
                            onClick={() => action.onClick }
                        >
                            action.icon
                        </IconButton>
                    })}
                </CardActions>
            }
        </Card>
    );
}
