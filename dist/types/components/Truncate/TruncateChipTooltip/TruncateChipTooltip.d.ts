/// <reference types="react" />
export interface Props {
    items: string[];
    maxItemsInTooltip?: number;
    label?: (count: number) => string;
    moreLabel?: (count: number) => string;
}
export default function TruncateChipTooltip(props: Props): JSX.Element;
