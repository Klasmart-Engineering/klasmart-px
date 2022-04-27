import React from "react";
export declare type LocaleCode = "en" | "es" | "id" | "ko" | "th" | "vi" | "zh-cn";
export interface Props {
    locale?: LocaleCode;
    children?: React.ReactNode;
}
export default function BaseLocalizationProvider(props: Props): JSX.Element;
