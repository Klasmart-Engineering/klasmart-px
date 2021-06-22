/// <reference types="react" />
export interface Props {
    color: string;
    label?: string;
    className?: string;
    onClick: () => void;
}
export default function ResetColorButton(props: Props): JSX.Element;
