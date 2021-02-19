/// <reference types="react" />
export interface GroupSelectMenuItem<T> {
    label: string;
    id: keyof T;
}
export interface SubgroupTab<T> {
    text: string;
    count?: number;
}
export interface GroupTabsLocalization {
    selectLabel?: string;
    selectNone?: string;
    tabAll?: string;
}
interface Props<T> {
    allCount: number;
    groupBy?: keyof T;
    groups?: GroupSelectMenuItem<T>[];
    subgroupBy?: string;
    subgroups?: SubgroupTab<T>[];
    localization?: GroupTabsLocalization;
    onSelectGroup: (value: keyof T | undefined) => void;
    onSelectSubgroup: (value: string | undefined) => void;
}
export default function BaseTableGroupTabs<T>(props: Props<T>): JSX.Element;
export {};
