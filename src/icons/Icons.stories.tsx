import TextField from "../components/Input/TextField";
import * as IconComponents from "./";
import { Search as SearchIcon } from "@mui/icons-material";
import {
    Box,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import {
    useMemo,
    useState,
} from "react";

export default {
    title: `Icons`,
};

export const Icons = () => {
    const [ search, setSearch ] = useState(``);
    const searchRegExp = useMemo(() => new RegExp(search, `i`), [ search ]);

    const iconsStyle: SxProps<Theme> = {
        width: 48,
        height: 48,
    };

    const iconContainerStyle: SxProps<Theme> = {
        width: 124,
        height: 124,
    };

    const icons = Object.entries(IconComponents);

    return (
        <>
            <TextField
                fullWidth
                variant="outlined"
                value={search}
                label="Search icon"
                appendInner={(
                    <SearchIcon
                        color="action"
                        style={{
                            pointerEvents: `none`,
                        }}
                    />
                )}
                onChange={setSearch}
            />
            <Box
                sx={{
                    display: `grid`,
                    gridTemplateColumns: `repeat(auto-fill,${iconContainerStyle.width}px)`,
                    justifyContent: `space-between`,
                }}
            >
                {icons
                    .filter(([ iconName ]) => searchRegExp.test(iconName))
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    .map(([ iconName, Icon ]) => (
                        <Box
                            key={iconName}
                            sx={iconContainerStyle}
                        >
                            <Box
                                sx={{
                                    display: `flex`,
                                    alignItems: `center`,
                                    flexDirection: `column`,
                                    padding: 2,
                                    gap: 1,
                                }}
                            >
                                <Icon sx={iconsStyle} />
                                <Typography
                                    variant="caption"
                                    color="gray"
                                >
                                    {iconName}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </>
    );
};
