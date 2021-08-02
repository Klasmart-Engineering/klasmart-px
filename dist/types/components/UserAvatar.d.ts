/// <reference types="react" />
export interface Props {
    name: string;
    src?: string;
    maxInitialsLength?: number;
    size?: `small` | `medium` | `large`;
    className?: string;
    color?: string;
}
export default function UserAvatar(props: Props): JSX.Element;
