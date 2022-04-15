import AdapterDayJs from "@mui/lab/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, {
    useEffect,
    useState,
} from "react";

export type LocaleCode = "en"|"es"|"id"|"ko"|"th"|"vi"|"zh-cn";

export interface Props {
    locale?: LocaleCode;
    children?: React.ReactNode;
}

const defaultLocaleCode = `en`;

/**
 * Provider to handle localization for datepickers.
 * @param props
 */
export default function BaseLocalizationProvider (props: Props) {
    const {
        locale,
        children,
    } = props;

    const [ dictionary, setDictionary ] = useState();

    const loadPickerLanguage = async (locale?: string) => {
        const pickerCode = locale ?? defaultLocaleCode;
        const translations = (await import(`dayjs/locale/${pickerCode}.js`)).default;
        setDictionary(locale !== `en` ? translations : undefined);
    };

    useEffect(() => {
        loadPickerLanguage(locale);
    }, [ locale ]);

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayJs}
            locale={dictionary}
        >
            {children}
        </LocalizationProvider>
    );
}
