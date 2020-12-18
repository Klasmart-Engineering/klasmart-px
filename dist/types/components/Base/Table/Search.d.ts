import React from "react";
interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}
export default function BaseTableSearch(props: Props): JSX.Element;
export {};
