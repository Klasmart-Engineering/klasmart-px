/// <reference types="react" />
export interface Props {
    items: string[];
    maxPreview?: number;
    moreLabel?: (count: number) => string;
    closeLabel?: string;
}
export default function TruncateChipGroup(props: Props): JSX.Element;
