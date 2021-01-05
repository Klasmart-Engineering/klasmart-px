/// <reference types="react" />
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
export default function LanguageSelect(props: Props): JSX.Element;
export {};
