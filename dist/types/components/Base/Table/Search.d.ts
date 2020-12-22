import React from "react";
export interface SearchLocalization {
    placeholder?: string;
    clear?: string;
}
interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    localization?: SearchLocalization;
}
export default function BaseTableSearch(props: Props): JSX.Element;
export {};
