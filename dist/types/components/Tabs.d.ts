/// <reference types="react" />
export interface Tab {
    text: string;
    value: string | undefined;
}
interface Props {
    tabs: Tab[];
    value?: string;
    valuesAsPaths?: boolean;
    onChange?: (value: string) => void;
}
export default function (props: Props): JSX.Element;
export {};
