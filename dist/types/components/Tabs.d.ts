/// <reference types="react" />
export interface Tab {
    text: string;
    value: string | undefined;
}
interface Props {
    className?: string;
    tabs: Tab[];
    value?: string;
    valuesAsPaths?: boolean;
    onChange?: (value: string) => void;
}
export default function Tabs(props: Props): JSX.Element;
export {};
