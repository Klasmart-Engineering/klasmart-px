/// <reference types="react" />
interface Props {
    colors: string[];
    selectedColor?: string;
    className?: string;
    onClick: (color: string) => void;
}
export default function ColorSwatches(props: Props): JSX.Element;
export {};
