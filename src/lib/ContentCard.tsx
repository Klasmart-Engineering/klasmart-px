import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    createStyles,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import {
    AddShoppingCartTwoTone as AddShoppingCartTwoToneIcon,
    ArchiveTwoTone as ArchiveTwoToneIcon,
    EditTwoTone as EditTwoToneIcon,
    ExpandMore as ExpandMoreIcon,
    ShareTwoTone as ShareTwoToneIcon,
} from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
        cardActions: {
            display: `flex`
        },
        cardContent: {
            padding: theme.spacing(1, 1)
        },
        iconExpand: {
            marginLeft: `auto`
        },
        paragraphClamp: {
            WebkitBoxOrient: `vertical`,
            WebkitLineClamp: 2,
            display: `-webkit-box`,
            overflow: `hidden`,
            [theme.breakpoints.down(`sm`)]: {
                WebkitLineClamp: 4
            },
        },
        rotateIcon: {
            transform: `rotate(180deg)`
        },
    }),
);

interface ContentItem {
    published: boolean;
    contentId: string;
    description: string;
    link: string;
    image: string;
    title: string;
    type?: "lesson-plan" | "lesson-material" | undefined;
}

type LibraryContentType = "OwnedContent" | "Marketplace";

interface Props {
    content: ContentItem;
    type: LibraryContentType;
}

export default function StyledCard(props: Props) {
    const classes = useStyles();
    const { content, type } = props;
    const [ moreInfo, toggleMoreInfo ] = useState(false);

    return (
        <Card>
            <CardActionArea onClick={() => window.open(content.link)}>
                <CardMedia
                    component="img"
                    alt={`${content.title} Image`}
                    height="140"
                    image={content.image}
                    title={`${content.title} Image`}
                />
            </CardActionArea>
            <CardContent className={classes.cardContent}>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            gutterBottom
                            variant="body1"
                            align="left">
                            { content.title }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label={moreInfo ? `hide content info` : `show content info`}
                            onClick={() => toggleMoreInfo(!moreInfo)}
                            size="small"
                        >
                            <ExpandMoreIcon
                                fontSize="inherit"
                                className={moreInfo ? classes.rotateIcon : ``} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Collapse
                    in={moreInfo}
                >
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                        align="left"
                        className={classes.paragraphClamp}
                    >
                        { content.description }
                    </Typography>
                </Collapse>
            </CardContent>
            { type === `OwnedContent` ?
                <CardActions className={classes.cardActions}>
                    <IconButton
                        size="small"
                        color="primary"
                        className={classes.iconExpand}>
                        <ShareTwoToneIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary">
                        <EditTwoToneIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="primary">
                        <ArchiveTwoToneIcon />
                    </IconButton>
                </CardActions> :
                <CardActions className={classes.cardActions}>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center">
                        <Grid item>
                            <Typography variant="caption">
                                ₩29,000
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                                size="small"
                                color="primary">
                                <AddShoppingCartTwoToneIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            }
        </Card>
    );
}
