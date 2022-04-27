/// <reference types="react" />
interface Props {
    color: string;
    isSelected?: boolean;
    className?: string;
    onClick?: (color: string) => void;
}
export default function ColorClick(props: Props): JSX.Element;
export {};
