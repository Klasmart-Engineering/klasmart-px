/// <reference types="react" />
export interface SearchLocalization {
    placeholder?: string;
    clear?: string;
}
interface Props {
    value: string;
    localization?: SearchLocalization;
    onChange: (value: string) => void;
}
export default function BaseTableSearch(props: Props): JSX.Element;
export {};
