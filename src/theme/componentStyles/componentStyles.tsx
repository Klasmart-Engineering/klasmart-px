
import { config } from "../color";
import {
    colors,
    Components,
    Theme,
} from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const buildComponentStyles = (): Components<Theme> => {
    return {
        MuiYearPicker: {
            styleOverrides: {
                root: {
                    "& .PrivatePickersYear-root .Mui-selected": {
                        color: colors.common.white,
                    },
                },
            },
        },
        MuiMonthPicker: {
            styleOverrides: {
                root: {
                    "& .PrivatePickersMonth-root.Mui-selected": {
                        color: colors.common.white,
                    },
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: colors.common.white,
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontWeight: 600,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: `none`,
                    borderBottom: `1px solid #E4E4E4`,
                    height: 50,
                },
                colorPrimary: {
                    color: colors.common.black,
                    backgroundColor: colors.common.white,
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: `#fff`,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                stickyHeader: {
                    backgroundColor: `#fafafa`,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: `#FFF`,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: `#fafafa`,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: `#1B365D`,
                    backgroundColor: `#FFF`,
                    "&:hover": {
                        "-webkit-transition": `all .4s ease`,
                        color: `#FFF`,
                        backgroundColor: `#1B365D`,
                        "box-shadow": `0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)`,
                        transition: `all .4s ease`,
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    color: `#E4E4E4`,
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderTopLeftRadius: `inherit`,
                    borderTopRightRadius: `inherit`,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                outlined: {
                    borderRadius: 10,
                    boxShadow: `none`,
                    borderColor: `#E4E4E4`,
                },
                root: {
                    boxShadow: `0px 2px 6px rgba(0, 0, 0, 0.1)`,
                },
            },
            defaultProps: {
                variant: `outlined`,
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    boxShadow: `none`,
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    boxShadow: `0px 2px 6px rgba(0, 0, 0, 0.1)`,
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    paddingLeft: 12,
                    paddingRight: 12,
                    minHeight: 50,
                    height: 50,
                    '@media (min-width: 0px)': {
                        paddingLeft: 12,
                        paddingRight: 12,
                        minHeight: 50,
                    },
                    '@media (min-width: 600px)': {
                        paddingLeft: 12,
                        paddingRight: 12,
                        minHeight: 50,
                    },
                },
            },
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    lineHeight: 3,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: `#E4E4E4`,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: config.PRIMARY,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                sizeMedium: {
                    height: `auto`,
                    minHeight: 32,
                },
                // colorSecondary: `#eef2fd`,
                // clickableColorSecondary: `#eef2fd`,
            },
        },
        // MuiCheckbox: {
        //     defaultProps: {
        //         checkedIcon: <Close />,
        //         indeterminateIcon: <Remove />,
        //         icon: <Add />,
        //     },
        // },
    };
};
