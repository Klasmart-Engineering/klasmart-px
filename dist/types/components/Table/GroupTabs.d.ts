/// <reference types="react" />
export interface GroupSelectMenuItem<T> {
    label: string;
    id: keyof T;
}
export interface SubgroupTab<T> {
    id: T[keyof T];
    count: number;
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
    subgroupBy?: T[keyof T];
    subgroups?: SubgroupTab<T>[];
    localization?: GroupTabsLocalization;
    onSelectGroup: (value: keyof T | undefined) => void;
    onSelectSubgroup: (value: T[keyof T] | undefined) => void;
}
export default function BaseTableGroupTabs<T>(props: Props<T>): JSX.Element;
export {};
