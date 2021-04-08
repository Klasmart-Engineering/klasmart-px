/// <reference types="react" />
interface Props {
    name: string;
    src?: string;
    maxInitialsLength?: number;
    size?: `small` | `medium` | `large`;
    className?: string;
}
export default function OrganizationAvatar(props: Props): JSX.Element;
export {};
