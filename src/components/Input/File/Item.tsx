import { sleep } from "../../../utils";
import IconButton from "../../Button/IconButton";
import {
    Box,
    createStyles,
    makeStyles,
    Paper,
    Typography,
    useTheme,
} from "@material-ui/core";
import {
    AttachFile as AttachFileIcon,
    Close as CloseIcon,
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    root: {
        padding: theme.spacing(1, 2),
    },
    fileIcon: {
        marginRight: theme.spacing(2),
    },
}));

export interface Props {
}

export default function (props: Props) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper
            className={classes.root}
            color={theme.palette.success.main}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
            >
                <AttachFileIcon
                    color="action"
                    fontSize="small"
                    className={classes.fileIcon}
                />
                <Box
                    display="flex"
                    flexDirection="column"
                >
                    <Typography>Hello</Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        Hello
                    </Typography>
                </Box>
                <Box flex={1} />
                <Box
                    display="flex"
                    flexDirection="row"
                >
                    <IconButton icon={DeleteIcon} />
                    <IconButton
                        icon={CloudUploadIcon}
                        onClickCancel={() => {
                            console.log(`cancel`);

                        }}
                        onClick={async () => {
                            console.log(`start`);
                            await sleep(2000);
                            console.log(`finish`);
                        }}
                    />
                </Box>
            </Box>
        </Paper>
    );
}
