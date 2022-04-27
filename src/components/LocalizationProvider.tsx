import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    useEffect,
    useState,
} from "react";

export interface Props {
    locale?: string;
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
            dateAdapter={AdapterDayjs}
            locale={dictionary}
        >
            {children}
        </LocalizationProvider>
    );
}
