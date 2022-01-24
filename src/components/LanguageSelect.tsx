import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Translate";
import Button from "@mui/material/Button";
import Menu,
{ MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import {
    createStyles,
    makeStyles,
    withStyles,
} from '@mui/styles';
import clsx from "clsx";
import { useState } from "react";
import * as React from "react";
import { useCookies } from "react-cookie";

export interface LanguageSelectLocalization {
    select?: string;
    tooltip?: string;
}

export interface Language {
    code: string;
    text: string;
}

interface Props {
    cookieDomain?: string;
    languages: Language[];
    localization?: LanguageSelectLocalization;
    noIcon?: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    expand: {
        transform: `rotate(0deg)`,
        transition: theme.transitions.create(`transform`, {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: `rotate(180deg)`,
    },
    language: {
        margin: theme.spacing(0, 1),
        display: `block`,
    },
}));

const StyledMenu = withStyles({})((props: MenuProps) => (
    <Menu
        elevation={4}
        anchorOrigin={{
            vertical: `bottom`,
            horizontal: `center`,
        }}
        transformOrigin={{
            vertical: `top`,
            horizontal: `center`,
        }}
        {...props}
    />
));

export default function LanguageSelect (props: Props) {
    const classes = useStyles();
    let { languages } = props;
    const {
        cookieDomain,
        localization,
        noIcon,
    } = props;

    if (languages.length === 0) {
        languages = [
            {
                code: `en`,
                text: `English`,
            },
        ];
    }
    const localeCodes = languages.map(l => l.code);

    function getDefaultLanguageCode () {
        const browserLanguages = navigator.languages || [
            (navigator as any).language,
            (navigator as any).browerLanguage,
            (navigator as any).userLanguage,
            (navigator as any).systemLanguage,
        ];

        for (const l of browserLanguages) {
            if (localeCodes.indexOf(l) !== -1) {
                return l;
            }
        }
        return `en`;
    }

    const url = new URL(window.location.href);
    const localeParam = url.searchParams.get(`iso`);
    const [ cookies, setCookies ] = useCookies([ `locale` ]);

    const locale = cookies.locale || localeParam || getDefaultLanguageCode();

    if (!cookies.locale) {
        setCookies(`locale`, locale, {
            path: `/`,
            domain: cookieDomain || `kidsloop.net`,
        });
    }

    const language = languages.find((l) => l.code === locale) || {
        code: `en`,
        text: `English`,
    };
    const [ languageText, setLanguageText ] = useState<string>(language.text);
    const [ languageMenuElement, setLanguageMenuElement ] = useState<null | HTMLElement>(null);

    function languageSelect (language: Language) {
        setCookies(`locale`, language.code, {
            path: `/`,
            domain: cookieDomain || `kidsloop.net`,
        });
        setLanguageText(language.text);
        setLanguageMenuElement(null);
    }

    return(
        <React.Fragment>
            <Tooltip
                title={localization?.tooltip ?? `Change Language`}
                enterDelay={300}
            >
                <Button
                    color="inherit"
                    aria-owns={languageMenuElement ? `language-menu` : undefined}
                    aria-haspopup="true"
                    size="small"
                    onClick={(e) => setLanguageMenuElement(e.currentTarget)}
                >
                    { !noIcon && <LanguageIcon fontSize="inherit" />}
                    <span className={classes.language}>
                        { locale === `` ?
                            (localization?.select ?? `Select Language`) :
                            languageText
                        }
                    </span>
                    <ExpandMoreIcon
                        fontSize="small"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: languageMenuElement !== null,
                        })}
                    />
                </Button>
            </Tooltip>
            <StyledMenu
                keepMounted
                id="language-menu"
                anchorEl={languageMenuElement}
                open={Boolean(languageMenuElement)}
                onClose={() => setLanguageMenuElement(null)}
            >
                {
                    languages.map((l) => (
                        <MenuItem
                            key={l.code}
                            selected={locale === l.code}
                            onClick={() => languageSelect(l)}
                        >
                            {l.text}
                        </MenuItem>
                    ))
                }
            </StyledMenu>
        </React.Fragment>
    );
}
