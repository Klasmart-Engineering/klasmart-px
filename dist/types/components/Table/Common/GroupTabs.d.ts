/// <reference types="react" />
export interface GroupSelectMenuItem<T> {
    label: string;
    id: keyof T;
}
export interface SubgroupTab {
    text: string;
    value: string | number | boolean;
    count?: number | boolean;
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
    subgroups?: SubgroupTab[];
    hideAllGroupTab?: boolean;
    hideNoGroupOption?: boolean;
    localization?: GroupTabsLocalization;
    onSelectGroup: (value: Extract<keyof T, string> | undefined) => void;
    onSelectSubgroup: (value: string | undefined) => void;
}
export default function BaseTableGroupTabs<T>(props: Props<T>): JSX.Element;
export {};
